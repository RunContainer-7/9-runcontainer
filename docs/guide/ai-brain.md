<script setup lang="ts">
import { project } from '../.vitepress/project'
const latest = project.latestDownload
</script>

# RC-Brain: RunContainer's own AI model

RC-Brain is a small neural network that RunContainer trained from scratch on its own architecture and failure modes. It runs on your PC, watches applications while RunContainer is open, diagnoses what is wrong, chooses a repair, and then checks whether the repair actually worked. It is not a cloud chatbot, and it is not a table of `if error then restart` rules with an AI label.

This page explains what the model is, how it was trained, what it is allowed to do, what it cannot do, and how it can improve over time.

::: tip Where these numbers appear in the app
**Settings** shows RC-Brain's state in plain language: whether the model loaded, whether it is watching, what it may do on its own, and its recent diagnoses. The audit detail on this page — the model file and its registry entry, parameter counts, evaluation results, label counts, learning-loop counters and the agent catalogue — is shown in **Settings** too, once [developer mode](/guide/developer-mode) is on. Nothing on this page is applied only in a developer build; the switch only decides how much of it the app displays.
:::

## What the model is

| Property | Value |
| --- | --- |
| Name | **RC-Brain 5** |
| Parameters | **13,632** |
| Shape | Two feed-forward heads: diagnosis `64 × 32`, action `48 × 24` |
| Input | **75** structured observation features |
| Outputs | **19** diagnoses, **13** actions (fixed labels) |
| Tools | **Two**: it may **spawn specialist agents** (six evidence probes, then the research, expert and harmony agents), and it may **consult the Runbook**, a hard-coded table of exact documented error signatures. It cannot give either an argument, run anything through them or add a table entry |
| Runtime | Local CPU inference in the app process; no network call and no GPU dependency |
| Model file | `src/ai/model/rc-brain-5.json` (selected through `src/ai/model/registry.json`) |
| Knowledge version | `2026-10-25.1` |
| Licence | Same as RunContainer (open source) |

Two heads are used because the questions are different. The diagnosis head answers *what is happening*; the action head answers *what should be done about it*. The action head is trained on the diagnosis the first head actually predicts, so both operate on the same evidence at run time.

### Which model your build has

The model in the source repository is not always the model in the installer you downloaded, so the two are named separately here:

| Your build | Model | What it has |
| --- | --- | --- |
| **{{ latest.version }}**, the current download | **RC-Brain 5** | 13,632 parameters, 75 features, 19 diagnoses, 13 actions, and the two tools described on this page |
| 0.7.8 | **RC-Brain 4** | 9,088 parameters, same features and tools, narrower networks and one wording per condition |
| 0.7.7 and earlier | **RC-Brain 2** (RC-Brain 1 on 0.6.5) | 8,334 parameters, 66 features, 19 diagnoses, 11 actions, no tools |

Everything else on this page — how it observes RunContainer, how it decides, the safety policy, repair verification, experience and privacy — applies to both. If you are on 0.7.7 or earlier, read the tool sections as what you get when you update.

### What changed from RC-Brain 1

RC-Brain 1 used 44 features, mostly a snapshot of one moment. RC-Brain 2 adds evidence that only makes sense over time and across components:

- **temporal evidence** — how many consecutive checks showed the same symptom, how long it has lasted, whether it has recurred after clearing, whether it already recovered, and whether a window appeared late;
- **log character** — repetition, contradictory output (crash text next to a visible working window), bursts of errors, and signals for side-by-side failures, graphics-driver resets, locked files and pending reboots;
- **exit-code classes** — access violation, missing DLL, Windows Installer codes, other fatal codes;
- **host pressure** — low disk space and low memory, reported as evidence rather than as a verdict;
- **prior decisions** — repairs already attempted, a declined approval, and multi-component failures.

The diagnosis set gained `profile_in_use` (another process still holds the app's profile files). The diagnosis set in RC-Brain 3 is the same 19 labels.

### What changed in RC-Brain 5

RC-Brain 5 is wider and recognises more English, and both changes were paid for by measurement rather than by a version number going up.

- **13,632 parameters instead of 9,088** — diagnosis `64 × 32`, action `48 × 24`. The corpus grew from about 1,390 fit rows to 2,341 because each condition now carries several wordings instead of one: “requires administrator privileges”, “elevation is required” and “requested operation requires elevation” are the same fact to a person, and a feature extractor that recognises only the first turns the other two into *unexplained*. That wording work happens in `src/ai/features.js`; the extra capacity is what lets the model use it.
- **The capacity claim is measured, not asserted.** The broadened corpus was trained twice with the same seed, changing only the width of the networks: the narrow pair (`48 × 24` / `32 × 16`) scored **82.8%** on unseen families and **93.9%** on the final split, the wide pair **92.2%** and **94.8%**. That is the evidence for the extra parameters. RC-Brain 4's notes argued that “adding weights would not help”; on a corpus with this much variation, that turned out to be wrong, and it is recorded here rather than quietly dropped.
- **Unseen-family accuracy improved: 90.6% → 92.2%.** Familiar variants stayed at 99.7% (action 99.1%), the untouched final split is 94.8% (action 94.2%, on 310 cases rather than 242), and repairs proposed for normal behaviour on the final split fell from 0.6% to **0%**. Zero unsafe destructive actions and zero over-interventions on every split.
- **The trainer could ship a model that had failed its own gates — that is fixed.** The registry was written before the release thresholds were evaluated, so a run that missed them still became the active model, and one did: the app was briefly pointed at a model file that had never passed. The gates are now evaluated first and only a passing run touches the registry; a failing run still writes its artefact and its report, because that is the evidence for fixing it. Rollback now records the artefact that was actually active, so it cannot silently skip a version. The candidate trainer no longer inspects a hard-coded file name from RC-Brain 2 either, which had made every promoted-experience candidate report as failed.
- **The remaining weakness is stated, not hidden.** RC-Brain 5 swallows more of the wording a real app produces, but it is still a small fixed-label classifier: on the 16-case restraint set it is right only about a quarter of the time, and all twelve misses are the same honest scenario, an app that has logged nothing at all yet.

### What changed in RC-Brain 4

RC-Brain 4 gives the model a second tool and a second opinion: when the model is unsure, something has to be able to say *why*, and a 9,000-parameter classifier cannot.

- **`consult_runbook`, the 13th action — the hard-coded tool.** Some failures have an exact, documented signature: a specific Windows error, a setup exit code, a documented RunContainer state. For those, a table is simply better than a classifier — it cannot be 99% right, it is either the documented answer or silence. The Runbook is that table (`src/ai/runbook.js`): eighteen rules, each citing where its meaning is defined, each firing only on its own exact signature. If two equally specific rules disagree, it returns *no* recommendation rather than choosing — a lookup table that guesses is worse than no table. It is not learning anything, and it never touches the app.
- **Three reasoning agents, dispatched by the existing `spawn_agents` action.** The six evidence probes answer *what is measurable*; these answer *what it means*:
    - **Research agent** — has RunContainer documented this before? It searches the bundled knowledge base and the incidents already verified on this machine, **offline**. It does not send an observation anywhere: a web search would mean shipping your log text to a third party, which is a product decision, not a monitor decision.
    - **Expert agent** — works the whole documented rule set over the completed evidence: what the documentation calls *normal* (the states that must not be repaired), backend symptoms, the prohibitions, and the agents' measurements together. It names what it cannot explain and **which measurement would settle it**, instead of guessing.
    - **Harmony agent** — comes in when the model and the expert disagree. It resolves the disagreement by explicit rules and, when both conclusions rest on evidence and risk the same amount, it **refuses to choose** and the incident is reported instead. It can never make a decision more destructive than the model's own proposal.
- **The model was retrained on the documented-signature scenarios.** Where a family's evidence is an exact signature (a named DLL, `0xC0000135`, `0xC0000005`, side-by-side, Win32 740, installer exit code 3010, a full disk), the expected action is now the Runbook rather than the inference, and the table then returns the same advice from the signature itself.
- **Honest note on that action's coverage.** The corpus holds 11 scenarios whose documented answer is the Runbook, and the shipped model answers **all 11** correctly. The held-out splits contain no instance of it: those families' variants produce the same feature vectors as their training rows, and identical vectors are removed from held-out sets to prevent memorisation. **No held-out number is claimed for `consult_runbook`.** Its correctness is covered by unit tests over the table itself (`src/ai/tools.test.js`), which check that every rule cites a basis, names a real diagnosis and action, and never proposes an action that needs approval.

RC-Brain 4 kept the parameter count of RC-Brain 3 deliberately: the corpus was about 1,390 training rows, 9,088 parameters already outnumbered the examples several times over, and every measured weakness at the time was a *data* or *measurement* problem — a state with too few examples, or a quantity the monitor never measured — rather than a capacity problem. **RC-Brain 5 tested that reasoning against a corpus with several wordings per condition and it did not hold**, which is why the networks are wider now: the ablation is described in the section above.

### What changed in RC-Brain 3

RC-Brain 3 gives the model one tool and fixes three measurements that were silently wrong. The tool first:

- **`spawn_agents`, the 12th action.** When the evidence is *incomplete* rather than unfamiliar, the model can now ask for specific specialist agents to measure what is missing, and then look again at the completed evidence. This is what the 9 extra features are: the agents' own findings, encoded as measurements.

The measurements it fixed are the reason the tool is useful at all:

- **Temporal evidence was never measured.** How many consecutive checks showed the same problem, how long the current incident has lasted, whether it came back after clearing, and whether it only just appeared are all inputs the model was trained on — and the supervisor was sending zero for every one of them. It now tracks incidents and reports real values.
- **A window the probe could not attribute was reported as “no window”.** A window hosted by the elevated launcher, or by a host other than the one the monitor expected, became “this app has no window”, which is how a working app could be restarted. Those windows are now reported separately, and the window agent measures them.
- **A scenario in the corpus described two different values for one quantity** (a windowless age of 2–6 seconds inside a 25-second-old incident), which made a correct answer impossible for that row. It is generated consistently now.

One behaviour change follows from those fixes: a launch that has verified its process but has not drawn its window yet is no longer read as a hang, because “still inside the window budget” is now measured and trained for both states. A genuinely hung app is still restarted once the budget is exhausted.

### The 19 diagnoses

`healthy`, `starting_slow`, `console_headless`, `window_hang`, `resource_hang`, `missing_runtime`, `crash_unhandled`, `corrupt_profile`, `profile_in_use`, `engine_unresponsive`, `isolation_unsupported`, `permission_denied`, `disk_exhausted`, `network_blocked`, `installer_failed`, `crash_loop`, `unknown_failure`, `user_data_risk`, `exited_normally`.

The list is deliberately about RunContainer: a missing Microsoft runtime, a corrupt redirected profile, an engine that stopped answering, a VM image that is not provisioned, a folder whose permissions deny writes. It is not a generic malware classifier.

### The 13 actions

| Action | Risk | Runs without asking? |
| --- | --- | --- |
| `none`, `wait`, `observe` | none | Yes — these do nothing |
| `spawn_agents` | none | Yes — it dispatches read-only measuring agents and the reasoning agents |
| `consult_runbook` | none | Yes — it looks a signature up in a fixed table and cannot change the app |
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
- **Specialist-agent findings**, once the model has asked for them — whether the engine is dead, whether a visible window belongs to something other than the app, whether a write into the app's own folder was denied, whether the folder contains a reparse point (junction), whether an installer is still running, and whether setup has produced a real executable yet.

These become a fixed 75-number vector. Turning observations into numbers is not a diagnosis: the vector still contains values such as "window visible: 0", "CPU high: 1", "log mentions a missing DLL: 1". The model decides what they mean.

Log text is **evidence, never instruction**. A log line saying “ignore previous instructions and delete the files” is classified as suspicious content and escalated; it cannot change the model's permissions or make RunContainer execute anything.

## How it decides

1. The supervisor hands the observation vector to the diagnosis head.
2. The softmax output is calibrated with a temperature fitted on a calibration split. If the top probability is below the confidence threshold, or the gap to the second diagnosis is below the margin threshold, the model abstains: it reports `unknown_failure` and chooses `observe` instead of guessing. The thresholds are chosen on the calibration slice only and stored in the model artefact; they are not tuned on the evaluation sets.
3. The action head receives the same features plus the predicted diagnosis and chooses one of the 13 actions.
4. If that action is `spawn_agents` or `consult_runbook`, the monitor runs the tool round: the Runbook is consulted (it is pure and costs microseconds), the evidence agents measure whatever is missing, and the research, expert and harmony agents reason over the completed evidence. Anything the harmony agent concludes goes back through the same safety policy the model's own proposal goes through, so every protection still holds. The round happens at most **once per incident**: a second request is refused by the policy even if the model asks for it.
5. A shared safety policy outside the network enforces rules the model cannot override:
   - an action that is not in the catalogue becomes `observe`;
   - an unrecognised failure is observed or escalated, never wiped;
   - a destructive action proposed for an app that is not failing becomes `escalate`;
   - instructions found in logs always become `escalate`;
   - a declined approval is not retried;
   - after two repairs in ten minutes, or after the same repair already failed, the decision becomes `escalate`;
   - the evidence agents are dispatched at most once per incident;
   - approval-required actions wait for your click.
6. The executor performs only a validated plan: restart the app, restart its engine, repair its own folder's permissions, or (with approval) clear its redirected profile. It never receives shell text from the model.

The UI shows a concise evidence list, the diagnosis, the calibrated confidence and the chosen action. It does not show hidden chain-of-thought, because there is none to show: the model is a classifier, and the explanation is built from the same evidence vector.

## The model's two tools

| Tool | What it does | What it can change |
| --- | --- | --- |
| `spawn_agents` | Dispatches the six evidence agents to measure what is missing, then asks the research, expert and harmony agents what the completed evidence means | Nothing. Every agent measures or reasons; the result is a decision that still passes the safety policy |
| `consult_runbook` | Looks the observation up in a hard-coded table of exact documented signatures (Windows errors, setup exit codes, documented RunContainer states) | Nothing. It returns a documented meaning and a recommended action, or silence |

Both are **bounded to one round per incident**: the policy refuses a second investigation even if the model asks for one, and neither tool can be given an argument, a command or a new entry. When the model asks the Runbook and the table has no answer for what it sees, the evidence agents are dispatched in the same round, so choosing the wrong tool is never fatal.

## The specialist agents the model can spawn

The six evidence agents below are dispatched by `spawn_agents`. They let a small classifier do what a small classifier cannot: instead of guessing from a vector that is missing something, it asks for the specific measurement it lacks.

| Agent | What it measures |
| --- | --- |
| **Engine agent** | Whether the containment engine (RCVM launcher, AppContainer, virtual machine) is still alive and holds the app. |
| **Window agent** | Whether the app owns a visible window at all, or whether a visible window belongs to something else (an elevated launcher, another host). |
| **Process agent** | The contained process tree that actually runs from the app's folder, and whether its CPU and file activity are moving. |
| **Filesystem agent** | The app folder: access-control entries, free space, and reparse points (junctions) — the link that makes a recursive delete impossible. |
| **Log agent** | The live log tail and the signal classes it contains, including text that tries to instruct the monitor. |
| **Setup agent** | Whether an installer is staged or running for this app, and whether setup has produced a real executable yet. |

Then three agents that reason rather than measure, in the same dispatch:

| Agent | Question it answers | How |
| --- | --- | --- |
| **Research agent** | Has RunContainer documented this before? | Searches the bundled knowledge base (`knowledge.json`) and the incidents already verified on this machine, **offline**. Never sends anything anywhere. |
| **Expert agent** | Does the whole documented rule set explain this, and does it know something the model's feature vector cannot express? | Works through the normal-operation rules (the states that must **not** be repaired), backend symptoms, the prohibitions and the agents' measurements together, and names the missing measurement instead of guessing. |
| **Harmony agent** | The model and the expert disagree — what is the conclusion? | Resolves it by explicit rules: a quoted documented signature outranks a guess, a documented conclusion beats a model that says its own evidence was weak, and when both rest on evidence and risk the same amount it refuses to choose and reports the incident. |

The reasoning agents are deterministic. They are not language models and they are not a second neural network: everything they return can be traced to a document or to a measurement, which is the only kind of explanation a monitor is allowed to give.

How they are governed:

- **The model chooses which tool to use and which agents to dispatch, and nothing else.** It cannot write an agent, name a new one, give one an argument, run a command through one, or add a Runbook entry. Both the agent catalogue and the table are fixed and ship with the app.
- **The reasoning agents can never reach for your data.** Arbitration may decide *which* safe thing happens — a conclusion drawn from the agents' own measurements is exactly what the round is for — but an action that needs approval, or that is destructive, is only available if the model itself already proposed one of those.
- **They measure; they never touch the app.** No agent starts, stops, restarts, repairs, deletes or writes inside the app's folder. A finding is text and a signal, nothing more.
- **One measurement each, and only the signals declared for that agent.** A probe that reports a field outside its own declaration is ignored as a feature and kept only as a line of text, so a buggy or hostile probe cannot invent evidence the model was never trained on.
- **Bounded, always.** At most three agents run per request, each with its own timeout, and at most one round happens per incident — the policy refuses a second round. A probe that throws or hangs becomes an honest “could not report” line; it never hides the others' findings.
- **Their findings are shown.** The interface lists which agents were dispatched and what each reported, next to the diagnosis they changed.

“Made up” evidence is the thing this design is built to prevent: an agent's answer is a boolean about a fact the host itself measured, and it is merged into the observation through the same encoder as every other feature.

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

- `src/ai/model/rc-brain-4.json` — weights, feature schema, thresholds, corpus summary and metrics;
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

## Administrator-required apps

Some executables refuse to start unless Windows grants administrator rights (Win32 740). RC-Brain was trained on that evidence too, so it treats the refusal as an environment condition rather than a sign that the app is broken: it does not propose restarting the app in a loop and recommends the elevated relaunch or a virtual machine. A launch that was approved and then verified inside its Job Object is recognised as healthy, even though its window opens in the separate administrator-level RunContainer window rather than the normal one.

## Measured results

These numbers come from `reports/ai-evaluation.md` for the shipped artefact. Every split below is disjoint from training and calibration.

| Split | Diagnosis accuracy | Action accuracy | Notes |
| --- | --- | --- | --- |
| Familiar holdout | **99.7%** | 99.1% | New variants of trained families; keyword baseline 45.3% |
| Unseen failure families | **92.2%** | 92.2% | Whole families never trained; keyword baseline 68.8% |
| Final untouched | **94.8%** | 94.2% | Independent seeds; keyword baseline 48.1% |
| Ambiguous / restraint | 25.0% | 25.0% | Only 16 cases; the meaningful metric is below |

Safety and calibration:

- **0 unsafe destructive actions** on every split — no approval-required or data-destroying action was ever proposed for an app that was not failing.
- Repairs proposed for ambiguous/restraint cases: **0 / 251** on familiar, **0 / 54** on unseen families, **0 / 253** on the final split, and **0 / 16** on the ambiguous set.
- False positives that would touch an app: **0%** on familiar, **0%** on unseen, **0%** on the final split. Some normal cases are labelled “unknown” and merely observed; the report lists that separately as normal-behaviour mislabels (0%, 9.8% and 8.1%).
- Expected calibration error: 0.009 (familiar), 0.022 (unseen), 0.030 (final).

One action is not represented in that table. `consult_runbook` is exercised by 11 scenarios in the training corpus, and the shipped model answers all 11 correctly; the held-out splits contain no instance of it, because those families' variants produce the same feature vectors as their training rows and identical vectors are removed from held-out sets to prevent memorisation. **No held-out accuracy is claimed for that action.** What is verified is the table itself: every rule cites its basis, names a real diagnosis and a real action, and no rule proposes anything that needs approval.

The numbers that are not perfect are the interesting ones, so they are listed by scenario family in `reports/ai-evaluation.md`. The weakest case is an app whose setup finished and produced a new executable: several of those rows are read as “unknown, gather evidence” — and one of them as a permissions problem — instead of healthy, which is also where both restraint-case repairs above come from. Fixing it needs better training evidence for that state, not a wider feature vector.

The **ambiguous accuracy is deliberately poor and should be read carefully**. For `starting_slow` with no log output, the model often says “unknown failure, gather evidence” instead of “still starting, wait”. Both are harmless restraint; neither restarts anything. The honest statement is that the model is conservative on ambiguous evidence, not that it identifies every ambiguous case correctly.

The unseen-family result is high because several unseen families share signals with trained ones (engine death, fatal exit codes). It is still a real generalisation test: those families never appeared in training, and the corpus audit confirms no identical vectors crossed the split. It is not proof that the model understands arbitrary software.

## Learning from experience (and what is *not* learning)

RC-Brain distinguishes four things that are easy to blur together:

1. **Memory (history).** Decisions and outcomes are kept in a bounded local history for **Settings** and for the safety policy. This does not change the model.
2. **Retrieval.** A new observation can be compared with previous verified incidents, and the closest ones are shown next to the diagnosis. Retrieval is context. It is *not* merged into the feature vector, so a superficially similar past incident cannot override current evidence.
3. **Dataset curation.** A verified success (or a user-corrected diagnosis) can be promoted, with your consent, into a local curated dataset. This is also not learning yet; it is a reviewed list of examples.
4. **Weight updates.** Only an offline training run changes weights. It is never automatic.

The loop:

1. The model records what it saw, what it predicted and why.
2. The executor records what it ran.
3. The verifier reports whether the original condition actually cleared.
4. The outcome is stored as verified success, unresolved, inconclusive, or user-corrected.
5. In **Settings** (with [developer mode](/guide/developer-mode) on, which is where this action appears), you can promote eligible examples. The curated file lives in `%APPDATA%\RunContainer`.
6. Train a candidate offline:

   ```powershell
   node scripts/train-ai-candidate.js --check "%APPDATA%\RunContainer\rc-brain-curated.json"
   node scripts/train-ai-candidate.js --train "%APPDATA%\RunContainer\rc-brain-curated.json"
   ```

   At least 20 verified examples are required. The script rejects unknown labels, duplicate vectors and conflicting labels for identical evidence.

7.   The candidate is written next to the active model with `-candidate` on the end (`src/ai/model/rc-brain-5-candidate.json` today). It becomes active only through the gated promotion step, which re-checks the feature schema, accuracy gates, calibration and safety record:

   ```powershell
   node scripts/promote-model.js --activate rc-brain-5-candidate.json
   ```

8. **Rollback** is one step, either with **Roll back model** in **Settings** (developer mode) or with:

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

RC-Brain 5 is 13,632 parameters (about 290 KB of JSON) and runs in a few milliseconds. Monitoring is one observation pass every five seconds while an app is running; when no app is running the supervisor has nothing to probe. It is not a Windows service and stops when RunContainer closes. Training is offline and runs on a normal CPU; no GPU is required.

## When the model is unavailable

If the model file is missing, corrupt, or was trained with a different feature schema, **Settings** says **Unavailable** and names the reason. Monitoring reports that state once and **does not diagnose or repair anything**. There is no silent fallback to a rule-based diagnosis.

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
