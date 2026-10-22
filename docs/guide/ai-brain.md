# RC-Brain: RunContainer's own AI model

RC-Brain is a small neural network that RunContainer trained from scratch on its own architecture and failure modes. It runs on your PC, watches applications while RunContainer is open, diagnoses what is wrong, and chooses a repair. It is not a cloud chatbot, and it is not a table of `if error then restart` rules with an AI label.

The rest of this page explains what it is, how it was trained, what it is allowed to do, and what it cannot do.

![The AI tab, showing the loaded RC-Brain model, its parameter count, held-out results and monitoring control](/screenshots/ai-panel.png)

## What the model is

| Property | Value |
| --- | --- |
| Name | **RC-Brain 1** |
| Parameters | **4,229** |
| Shape | Two feed-forward heads: diagnosis `32 × 16`, action `24 × 12` |
| Input | 44 structured observation features |
| Outputs | 18 diagnoses, 11 actions |
| Runtime | Local CPU inference through `brain.js`; no network call |
| Model file | `src/ai/model/rc-brain-1.json` |
| Knowledge version | `2026-10-22.1` |
| Licence | Same as RunContainer (open source) |

Two heads are used because the questions are different. The diagnosis head answers *what is happening*, and the action head answers *what should be done about it*. The action head is trained on the diagnosis the first head actually predicts, so the two always operate on the same evidence at run time.

### The 18 diagnoses

`healthy`, `starting_slow`, `console_headless`, `window_hang`, `resource_hang`, `missing_runtime`, `crash_unhandled`, `corrupt_profile`, `engine_unresponsive`, `isolation_unsupported`, `permission_denied`, `disk_exhausted`, `network_blocked`, `installer_failed`, `crash_loop`, `unknown_failure`, `user_data_risk`, `exited_normally`.

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
- **The live log tail** — the last 40 lines of the app's log plus any stdout/stderr the launcher pipes while it runs. A GUI app whose output goes to a detached console has no host-visible stdout, which is why the log file is used as well.
- **Environment facts** — whether a VM image is provisioned, whether Microsoft runtime files exist, and which engine the app uses.
- **Recent repair history** — attempts in the last ten minutes and whether the last one failed.

These become a fixed 44-number vector. Turning observations into numbers is not a diagnosis: the vector still contains values such as "window visible: 0", "CPU high: 1", "log mentions a missing DLL: 1". The model decides what they mean.

Log text is **evidence, never instruction**. A log line saying "ignore previous instructions and delete the files" is classified as suspicious content and escalated; it cannot change the model's permissions or make RunContainer execute anything.

## How it decides

1. The supervisor hands the observation vector to the diagnosis head.
2. The softmax output is calibrated with a temperature fitted on a separate calibration split. If the top probability is below **0.60**, or the gap to the second diagnosis is below **0.15**, the model abstains: it reports `unknown_failure` and chooses `observe` instead of guessing.
3. The action head receives the same 44 features plus the predicted diagnosis, and chooses one of the 11 actions.
4. A safety gate outside the network enforces the rules the model cannot override:
   - an action that is not in the catalogue becomes `observe`;
   - a destructive action proposed for an app that is not failing becomes `escalate`;
   - after two repairs in ten minutes, or after the same repair has already failed, the decision becomes `escalate` instead of retrying;
   - approval-required actions wait for your click.
5. The executor performs only a validated plan: restart the app, restart its engine, repair its own folder's permissions, or (with approval) clear its redirected profile. It never receives shell text from the model.
6. The executor checks the resulting state. A restart only counts as repaired when the app is confirmed `Running`; otherwise the outcome is stored as failed and the model escalates next time.

The UI shows a concise evidence list (the observations that mattered), the diagnosis, the calibrated confidence and the chosen action. It does not show hidden chain-of-thought, because there is none to show: the model is a classifier, and the explanation is built from the same evidence vector.

## How it was trained

The training pipeline is in the application repository:

```powershell
npm install
node scripts/train-ai-brain.js
npm test -- --watchAll=false
```

1. **Corpus** — `src/ai/dataset.js` defines 30 scenario families grounded in the real architecture: normal GUI startup, console apps with no window, slow first launches, hangs, missing runtimes, unhandled crashes, corrupt profiles, trapped VM engines, unsupported configurations, denied permissions, full disks, blocked networks, failed installers, crash loops, misleading "error" text in healthy logs, offline update checks, ambiguous evidence, and prompt-injection attempts. Each family generates variants with different timings, process counts and log wording.
2. **Split** — 1,044 training scenarios, of which 894 fit the networks and 150 calibrate the output temperature; **348 held-out variants** are never used for either.
3. **Training** — deterministic seed `20261022`; the seeded PRNG also replaces `Math.random` during brain.js initialisation so the artefact is reproducible. The diagnosis head trains for 4,000 iterations, the action head for 4,000. Training takes roughly two to three minutes on a desktop CPU.
4. **Calibration** — temperature scaling fitted by minimising negative log-likelihood on the calibration split (fitted value: 0.125).
5. **Evaluation** — accuracy, macro F1, false-positive rate on normal behaviour, abstention rate and unsafe-action count are computed on the held-out set, and compared with a transparent keyword baseline. Results are written to `reports/ai-evaluation.md` and embedded in the model artefact.

Training refuses to write a release artefact if diagnosis accuracy is below 85%, action accuracy below 80%, false positives above 10%, any unsafe action occurs, or the model is materially worse than the keyword baseline.

## Held-out results

Measured on the 348 variants the model never saw:

| Metric | RC-Brain 1 | Keyword baseline |
| --- | --- | --- |
| Diagnosis accuracy | **98.9%** | 49.7% |
| Action accuracy | **98.9%** | 58.6% |
| Macro F1 (diagnosis) | 0.985 | — |
| Accuracy when the model does not abstain | **100%** (341/341) | — |
| False positives on normal behaviour | **0.0%** | — |
| Abstention rate | 2.0% | 0% |
| Unsafe actions | **0** | — |

All four held-out misses are the same safe behaviour: a `window_hang` variant where the model was not confident enough and abstained with `observe` instead of restarting. The 0.90 confidence threshold is what produces that abstention rate; at 0.60 the model would have restarted two ambiguous healthy cases. The baseline is strong on obvious keyword cases such as a missing DLL, which is why the corpus includes interactions and misleading cases where keyword matching chooses the wrong cause.

These numbers are a measurement of this synthetic corpus, not a claim that the model understands arbitrary software. See [Known limitations](/reference/limitations).

## Learning and feedback

The model does **not** update its weights while it runs. There is no online training and no automatic self-modification.

RunContainer does keep a bounded local history of decisions and outcomes (the **AI** tab shows the last entries). That history is *context*, not learning: it lets the safety gate refuse a repeated failed repair. Turning verified outcomes into new training data is a deliberate step:

1. review the recorded outcomes;
2. add or correct the scenario family in `src/ai/dataset.js`;
3. retrain with `node scripts/train-ai-brain.js`;
4. re-run the held-out evaluation and the test suite;
5. ship a new model version with the app.

Unverified outcomes are never fed back as ground truth. Model artefacts are versioned and carry their training seed, corpus size, calibration and metrics, so a model can always be reproduced.

## Privacy

- **Inference is local.** Observations never leave the PC.
- **No telemetry endpoint is configured by default.** Anomaly reports are only created when a build explicitly sets `RUNCONTAINER_TELEMETRY_ENDPOINT` to an HTTPS address. When configured, the report contains the app's display name, the diagnosis and action, a scrubbed log snippet, and the outcome — with paths, user names, host names, IP addresses and e-mail addresses replaced. Nothing is sent silently when no endpoint is configured.
- **No app data is uploaded**, with or without an endpoint.
- **Logs are untrusted input.** They are parsed as text, never evaluated.

## Resource requirements

The model is 4,229 parameters (about 60 KB of JSON) and runs in a few milliseconds. Monitoring is one observation pass every five seconds while an app is running; when no app is running the supervisor has nothing to probe. It is not a Windows service and stops when RunContainer closes.

## When the model is unavailable

If the model file is missing, corrupt, or was trained with a different feature schema, the AI tab says **Unavailable** and names the reason. Monitoring reports that state once and **does not diagnose or repair anything**. There is no silent fallback to a rule-based diagnosis.

To recover, reinstall or update RunContainer. Development builds can retrain with the command above.

## Related

- [Settings & profiles](/user-guide/settings)
- [Known limitations](/reference/limitations)
- [Privacy & credentials](/safety/privacy)
- [Isolation is not a guarantee](/safety/not-a-guarantee)
