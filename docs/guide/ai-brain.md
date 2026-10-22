# RC-Brain: RunContainer's own AI model

RC-Brain is a small neural network that RunContainer trained from scratch on its own architecture and failure modes. It runs on your PC, watches applications while RunContainer is open, diagnoses what is wrong, chooses a repair, and then checks whether the repair actually worked. It is not a cloud chatbot, and it is not a table of `if error then restart` rules with an AI label.

This page explains what the model is, how it was trained, what it is allowed to do, what it cannot do, and how it can improve over time.

## What the model is

| Property | Value |
| --- | --- |
| Name | **RC-Brain 2** |
| Parameters | **8,334** |
| Shape | Two feed-forward heads: diagnosis `48 × 24`, action `32 × 16` |
| Input | **66** structured observation features |
| Outputs | **19** diagnoses, **11** actions (fixed labels) |
| Runtime | Local CPU inference in the app process; no network call and no GPU dependency |
| Model file | `src/ai/model/rc-brain-2.json` (selected through `src/ai/model/registry.json`) |
| Knowledge version | `2026-10-22.2` |
| Licence | Same as RunContainer (open source) |

Two heads are used because the questions are different. The diagnosis head answers *what is happening*; the action head answers *what should be done about it*. The action head is trained on the diagnosis the first head actually predicts, so both operate on the same evidence at run time.

### What changed from RC-Brain 1

RC-Brain 1 used 44 features, mostly a snapshot of one moment. RC-Brain 2 adds evidence that only makes sense over time and across components:

- **temporal evidence** — how many consecutive checks showed the same symptom, how long it has lasted, whether it has recurred after clearing, whether it already recovered, and whether a window appeared late;
- **log character** — repetition, contradictory output (crash text next to a visible working window), bursts of errors, and signals for side-by-side failures, graphics-driver resets, locked files and pending reboots;
- **exit-code classes** — access violation, missing DLL, Windows Installer codes, other fatal codes;
- **host pressure** — low disk space and low memory, reported as evidence rather than as a verdict;
- **prior decisions** — repairs already attempted, a declined approval, and multi-component failures.

The diagnosis set gained `profile_in_use` (another process still holds the app's profile files). The action set is unchanged.

### The 19 diagnoses

`healthy`, `starting_slow`, `console_headless`, `window_hang`, `resource_hang`, `missing_runtime`, `crash_unhandled`, `corrupt_profile`, `profile_in_use`, `engine_unresponsive`, `isolation_unsupported`, `permission_denied`, `disk_exhausted`, `network_blocked`, `installer_failed`, `crash_loop`, `unknown_failure`, `user_data_risk`, `exited_normally`.

The list is deliberately about RunContainer: a missing Microsoft runtime, a corrupt redirected profile, an engine that stopped answering, a VM image that is not provisioned, a folder whose permissions deny writes. It is not a generic malware classifier.

### The 11 actions

| Action | Risk | Runs without asking? |
| --- | --- | --- |
| `none`, `wait`, `observe` | none | Yes — these do nothing |
| `restart_same_profile` | low | Yes |
| `restart_engine` | low | Yes |
| `repair_permissions` | low | Yes — only the app's own folder |
| `restart_clean_profile` | medium | **No — approval required** |
| `advise_runtime_install` | none | Recommendation only |
| `advise_configuration` | none | Recommendation only |
| `reset_requires_approval` | high | **Never automatic** |
| `escalate` | none | Asks you to look at it |

## How it observes RunContainer

While the RunContainer window is open, a supervisor checks every running application approximately every five seconds (one PowerShell probe per app, skipped if a probe is still running). It collects:

- **Window state** — whether the process owns a visible top-level window, how long it has been since launch, and whether Windows reports the window as not responding.
- **Resource movement** — CPU time and cumulative file/network bytes per process tree. A busy app that is still writing is not a hang; sustained CPU with no IO movement is.
- **Engine liveness** — whether the VM or containment launcher that owns the app is still alive.
- **The live log tail** — the last 40 lines of the app's log plus any stdout/stderr the launcher pipes while it runs.
- **Environment facts** — whether a VM image is provisioned, whether Microsoft runtime files exist, disk and memory pressure, and which engine the app uses.
- **History** — symptom persistence, recurrences, previous repairs, whether the last repair failed, and whether an approval was declined.

These become a fixed 66-number vector. Turning observations into numbers is not a diagnosis: the vector still contains values such as "window visible: 0", "CPU high: 1", "log mentions a missing DLL: 1". The model decides what they mean.

Log text is **evidence, never instruction**. A log line saying “ignore previous instructions and delete the files” is classified as suspicious content and escalated; it cannot change the model's permissions or make RunContainer execute anything.

## How it decides

1. The supervisor hands the observation vector to the diagnosis head.
2. The softmax output is calibrated with a temperature fitted on a calibration split. If the top probability is below the confidence threshold, or the gap to the second diagnosis is below the margin threshold, the model abstains: it reports `unknown_failure` and chooses `observe` instead of guessing. The thresholds are chosen on the calibration slice only and stored in the model artefact; they are not tuned on the evaluation sets.
3. The action head receives the same features plus the predicted diagnosis and chooses one of the 11 actions.
4. A shared safety policy outside the network enforces rules the model cannot override:
   - an action that is not in the catalogue becomes `observe`;
   - an unrecognised failure is observed or escalated, never wiped;
   - a destructive action proposed for an app that is not failing becomes `escalate`;
   - instructions found in logs always become `escalate`;
   - a declined approval is not retried;
   - after two repairs in ten minutes, or after the same repair already failed, the decision becomes `escalate`;
   - approval-required actions wait for your click.
5. The executor performs only a validated plan: restart the app, restart its engine, repair its own folder's permissions, or (with approval) clear its redirected profile. It never receives shell text from the model.

The UI shows a concise evidence list, the diagnosis, the calibrated confidence and the chosen action. It does not show hidden chain-of-thought, because there is none to show: the model is a classifier, and the explanation is built from the same evidence vector.

## Repair verification

A repair is **not** considered successful because a command returned exit code 0 or because the process restarted.

After a repair, RC-Brain waits for at least **three consecutive observations** (up to 45 seconds) and re-checks the original condition:

- `window_hang` needs a visible window;
- `resource_hang` needs the window responding and CPU or file activity moving again;
- `engine_unresponsive` needs the engine to answer again;
- `permission_denied` needs new log output without access-denied errors;
- `corrupt_profile` / `profile_in_use` need the app to start again;
- `crash_unhandled` needs a start without another crash.

The result is recorded as **verified**, **unresolved**, **inconclusive**, or **not applicable** (for advice and escalation). A single lucky observation cannot produce "verified", and an unresolved problem is reported as such instead of being hidden.

## Training the model

The training pipeline is in the application repository:

```powershell
npm install
node scripts/train-ai-brain.js
npm test -- --watchAll=false
```

Outputs:

- `src/ai/model/rc-brain-2.json` — weights, feature schema, thresholds, corpus summary and metrics;
- `src/ai/model/registry.json` — which artefact the app loads, and the previous model for rollback;
- `reports/ai-evaluation.md` — the human-readable report, including every error on unseen and ambiguous splits.

Training is deterministic: the corpus generator is seeded (`20261022`), and the same seeded generator replaces `Math.random` while brain.js initialises its weights. On a desktop CPU the run takes roughly 6–8 minutes for both heads.

### Corpus and provenance

`src/ai/dataset.js` defines the scenario families. Every family records a `basis` field naming the part of RunContainer's source, tests or documentation it is grounded in — for example the window timeout in `behavioralMonitor.js`, the QMP timeouts in the QEMU runtime, or the ACL repair plan in `isolatedLaunch.js`.

All rows are **synthetic**. They are generated from RunContainer's architecture; no real user machine, log file or telemetry record is used. The corpus includes:

- normal GUI and console behaviour, late windows, transient states that resolve;
- misleading healthy logs (error words, repeated lines, old crash text) and busy apps that look hung;
- the known failures: hangs, missing runtimes, crashes, corrupt profiles, trapped engines, unsupported isolation, denied permissions, full disks, blocked networks, failed installers, crash loops;
- interacting failures and contradictory evidence;
- malicious log content and declined approvals.

Duplicates are removed across splits (training first, then the held-out sets), so a held-out row can never be a memorised training row. The trainer also audits the corpus: identical feature vectors, label conflicts on identical evidence and train/holdout leakage all fail the build.

### Splits

| Split | Purpose |
| --- | --- |
| Fit | Scenarios the networks train on |
| Calibration | Fits the temperature and chooses the abstention thresholds; never trained on |
| Familiar holdout | New variants of trained families |
| Unseen families | Whole failure families absent from training and calibration |
| Ambiguous / restraint | Cases where the right answer is wait, observe or escalate |
| Final untouched | Fresh realisation generated with independent seeds, run once for the published report |

## Measured results

These numbers come from `reports/ai-evaluation.md` for the shipped artefact. Every split below is disjoint from training and calibration.

| Split | Diagnosis accuracy | Action accuracy | Notes |
| --- | --- | --- | --- |
| Familiar holdout | **99.6%** | 98.4% | New variants of trained families; keyword baseline 48.6% |
| Unseen failure families | **96.8%** | 96.8% | Whole families never trained; keyword baseline 93.5% |
| Final untouched | **96.5%** | 95.2% | Independent seeds; keyword baseline 53.7% |
| Ambiguous / restraint | 26.7% | 26.7% | Only 15 cases; the meaningful metric is below |

Safety and calibration:

- **0 unsafe destructive actions** on every split.
- **0 repairs proposed** for ambiguous/restraint cases (`0 / 15`), so the low diagnosis accuracy there did not cause intervention.
- False positives that would touch an app: **0%** on familiar, **0%** on unseen, **0%** on the final split. Some normal cases are labelled “unknown” and merely observed; the report lists that separately as normal-behaviour mislabels (6.5% on the final split).
- Expected calibration error: 0.004 (familiar), 0.032 (unseen), 0.035 (final).

The **ambiguous accuracy is deliberately poor and should be read carefully**. For `starting_slow` with no log output, the model often says “unknown failure, gather evidence” instead of “still starting, wait”. Both are harmless restraint; neither restarts anything. The honest statement is that the model is conservative on ambiguous evidence, not that it identifies every ambiguous case correctly.

The unseen-family result is high because several unseen families share signals with trained ones (engine death, fatal exit codes). It is still a real generalisation test: those families never appeared in training, and the corpus audit confirms no identical vectors crossed the split. It is not proof that the model understands arbitrary software.

## Learning from experience (and what is *not* learning)

RC-Brain distinguishes four things that are easy to blur together:

1. **Memory (history).** Decisions and outcomes are kept in a bounded local history for the AI tab and for the safety policy. This does not change the model.
2. **Retrieval.** A new observation can be compared with previous verified incidents, and the closest ones are shown next to the diagnosis. Retrieval is context. It is *not* merged into the feature vector, so a superficially similar past incident cannot override current evidence.
3. **Dataset curation.** A verified success (or a user-corrected diagnosis) can be promoted, with your consent, into a local curated dataset. This is also not learning yet; it is a reviewed list of examples.
4. **Weight updates.** Only an offline training run changes weights. It is never automatic.

The loop:

1. The model records what it saw, what it predicted and why.
2. The executor records what it ran.
3. The verifier reports whether the original condition actually cleared.
4. The outcome is stored as verified success, unresolved, inconclusive, or user-corrected.
5. In the **AI** tab, you can promote eligible examples. The curated file lives in `%APPDATA%\RunContainer`.
6. Train a candidate offline:

   ```powershell
   node scripts/train-ai-candidate.js --check "%APPDATA%\RunContainer\rc-brain-curated.json"
   node scripts/train-ai-candidate.js --train "%APPDATA%\RunContainer\rc-brain-curated.json"
   ```

   At least 20 verified examples are required. The script rejects unknown labels, duplicate vectors and conflicting labels for identical evidence.

7. The candidate is written to `src/ai/model/rc-brain-2-candidate.json`. It becomes active only through the gated promotion step, which re-checks the feature schema, accuracy gates, calibration and safety record:

   ```powershell
   node scripts/promote-model.js --activate rc-brain-2-candidate.json
   ```

8. **Rollback** is one step, either in the AI tab or with:

   ```powershell
   node scripts/promote-model.js --rollback
   ```

   The previous file is never deleted.

A verified *failure* is not treated as a trustworthy label by itself: “the model was wrong” does not say what the right answer was. Only verified successes and explicit user corrections become examples. Monitoring never trains on its own, and unverified diagnoses never become ground truth.

## Privacy

- **Inference is local.** Observations never leave the PC.
- **Experience history is local and redacted.** Before a record is written, Windows paths, user names, machine names, e-mail addresses, IP addresses and URLs are replaced with placeholders; only a short log snippet is kept.
- **No telemetry endpoint is configured by default.** Anomaly reports are only created when a build explicitly sets `RUNCONTAINER_TELEMETRY_ENDPOINT` to an HTTPS address. When configured, the report contains the app's display name, the diagnosis and action, a scrubbed log snippet, and the outcome.
- **No app data is uploaded**, with or without an endpoint.
- **Logs are untrusted input.** They are parsed as text, never evaluated.

## Resource requirements

RC-Brain 2 is 8,334 parameters (about 180 KB of JSON) and runs in a few milliseconds. Monitoring is one observation pass every five seconds while an app is running; when no app is running the supervisor has nothing to probe. It is not a Windows service and stops when RunContainer closes. Training is offline and runs on a normal CPU; no GPU is required.

## When the model is unavailable

If the model file is missing, corrupt, or was trained with a different feature schema, the AI tab says **Unavailable** and names the reason. Monitoring reports that state once and **does not diagnose or repair anything**. There is no silent fallback to a rule-based diagnosis.

## Reproducing and reviewing

```powershell
node scripts/train-ai-brain.js            # retrain the shipped model and rewrite the report
node scripts/promote-model.js --status    # inspect the active model and its gates
node scripts/promote-model.js --verify    # fail if the active model does not pass its gates
npm test -- --watchAll=false              # corpus audit, parity, policy, verification and UI tests
```

The corpus audit, inference parity against brain.js, safety-policy tests, repair-verification tests and experience-store tests all run in the normal suite.

## Related

- [Known limitations](/reference/limitations)
- [Privacy & credentials](/safety/privacy)
- [Isolation is not a guarantee](/safety/not-a-guarantee)
- [Policies](/policies)
