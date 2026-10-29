# Known limitations

These are the known limits on what it does and doesn't do.

## Availability

- **Signing does not silence Windows.** Release installers are not code-signed at the moment, so Windows shows “Unknown publisher” and may show a warning before the installer runs. Signing would not be a promise of silence either: a very new version can still be treated as an unrecognised file once it is in place. See [Code signing](/downloads#code-signing).
- **System requirements aren't confirmed yet.** See [Prerequisites](/getting-started/prerequisites).
- **Some features may not be in every build.** Pages note where a feature's availability isn't yet confirmed.

## Compatibility

- **Not every Windows application works.** Applications that install drivers or system services, use anti-cheat or copy protection, or need deep system access are likely to have problems. → [Unsupported applications](/troubleshooting/unsupported-apps)
- **Behaviour can vary between application versions.** An application that works today may behave differently after it updates itself.
- **Microsoft Store packages can't be redirected into an app folder.** Windows installs a Store app system-wide into `WindowsApps` with a package identity, and its window is a UWP frame that cannot be hosted. A small download that only asks the Store to install something is therefore refused before it starts, with the alternatives: the vendor's desktop build, or a virtual machine where the install happens inside the guest. → [Installing applications](/user-guide/applications)

## How apps are kept apart

- **It is a launcher, not a virtual machine.** Apps run in their own space on the same Windows as everything else. That keeps their files and data together and limits their memory and CPU, but it is not a full security boundary.
- **A virtual machine is used only when one is already available.** RunContainer never downloads or bundles Windows. When a prepared image exists on the PC, apps use it automatically for a stronger boundary; the Settings tab says whether that is happening.
- **An administrator app opens in a second, administrator-level RunContainer window.** Windows refuses to let a normal process host a window owned by an elevated process, so RunContainer's elevated launcher creates its own RunContainer window and hosts the app (or the installer wizard) inside it. The app is still contained (Job Object caps and its own data folder), but that window is a plain Windows window with a RunContainer title rather than the normal in-app surface. Apps that cannot be elevated without breaking themselves, and console tools that never open a window, are labelled rather than pretended to be hosted.
- **Shared Windows places are outside the app's folder.** A program that writes to the registry or a system-wide install directory can still leave traces there.
- **`locked` cannot always block the network.** It works when the app runs in a virtual machine or a restricted container; on a standard environment, Windows gives ordinary apps network access, and the app says so instead of implying otherwise.

## Security

- **Isolation isn't absolute.** Applications still interact with your screen, input, files you give them and the network. → [Isolation is not a guarantee](/safety/not-a-guarantee)
- **Not malware protection.** RunContainer doesn't scan or judge software.

## RC-Brain (AI monitoring)

The [RC-Brain page](/guide/ai-brain#which-model-your-build-has) lists which model each build has: the current download and later releases run RC-Brain 5 with both tools and the reasoning agents described below, 0.7.8 ran RC-Brain 4 with the same tools on narrower networks, and 0.7.7 and earlier run RC-Brain 2, which has no tools.

- **It is a small fixed-label classifier, not a language model.** RC-Brain 5 has 13,632 parameters and chooses among 19 diagnoses and 13 actions from a 75-number evidence vector. It cannot read arbitrary log text semantically, invent a new diagnosis, or explain itself beyond that evidence. Unknown evidence becomes `unknown_failure` plus “gather more evidence”.
- **It has exactly two tools, and neither is a language model.** One dispatches up to three of six fixed, read-only evidence agents (`engine`, `window`, `process`, `filesystem`, `logs`, `setup`) once per incident to measure what its evidence vector is missing, and then asks three deterministic reasoning agents (research, expert, harmony) what the completed evidence means. The other consults the Runbook, a hard-coded table of exact documented signatures. It cannot author an agent, give one arguments, run a command through one, or add a table entry. See [RC-Brain](/guide/ai-brain#the-models-two-tools).
- **The reasoning agents explain, they do not guess.** Everything they return is traceable to a document in RunContainer's knowledge base or to a measurement the probes just took. The harmony agent reports a disagreement it cannot settle rather than picking a side, and it can never propose anything more destructive than the model's own proposal.
- **The Runbook is a table, and that is the point.** For an exact Windows error or setup exit code it is simply right; for anything it does not recognise it says so, and when two of its rules of equal specificity disagree it returns no recommendation at all. It never invents a signature, and `consult_runbook` has no held-out accuracy figure: the corpus holds 11 such scenarios (the model answers all 11) and the held-out splits contain none of them, so none is claimed.
- **The agents close evidence gaps, not knowledge gaps.** They can tell the model whether the engine is dead, whether a visible window belongs to something other than the app, whether a write was denied or a junction is in the folder, whether an installer is still running, and whether setup produced an executable. They cannot make an unfamiliar failure familiar.
- **The evaluation corpus is synthetic.** Familiar-holdout diagnosis accuracy is 99.7%, unseen families 92.2% and the untouched final split 94.8%. Unseen families are still generated from RunContainer's architecture, so this measures generalisation across scenario families, not real-world software diversity. The keyword baseline scores 45.3%, 68.8% and 48.1% respectively.
- **Ambiguous cases are handled conservatively, not perfectly.** On 16 ambiguous/restraint cases the model usually reported “unknown, gather evidence” (87.5%) instead of “still starting, wait”. Both are harmless, and no repair was proposed for any of them (0 / 16). Read the ambiguous accuracy (25.0%) as conservative behaviour, not understanding.
- **False positives are reported two ways.** A repair proposed for normal behaviour: 0% on familiar variants, 0% on unseen families and 0% on the final split. Normal behaviour labelled abnormal but only observed: 8.1% on the final split. Repairs proposed for restraint cases: 0 of 54 and 0 of 253 on those same splits. The state the model still reads worst is an app that has logged nothing at all yet, which it labels “unknown, gather evidence” instead of “still starting, wait” — harmless, but wrong.
- **Measurement is not advice.** The agents report facts; the model still chooses from 13 fixed actions, and the safety policy outside the network can override it — including anything the harmony agent concludes.
- **No online learning.** The model's weights never change while the app runs. History and retrieval are context; curated examples are data; only an offline, gated training run changes weights, and the previous model stays available for rollback.
- **Monitoring is not a service.** It runs only while RunContainer is open. Nothing is monitored after you close the app.
- **It sees the host, not inside a VM.** Window, CPU/IO and engine-liveness checks observe the host side of a virtual machine. A guest application that hangs without changing host-visible signals may not be diagnosed.
- **A detached GUI app's own stdout is not available.** RC-Brain reads the app's log file and the launcher's piped output; an app that writes to a console RunContainer does not own produces no live stdout.
- **No automatic system repair.** It cannot install runtimes, drivers or services, delete app data without approval, or weaken isolation. For missing Microsoft runtimes it recommends the official installer and stops there.
- **Model availability is reported, never faked.** If the model cannot load, Settings says so and there is no fallback to rule-based diagnosis.
- **Some installers refuse process containment.** A few bootstrappers (for example the MSYS2 Qt Installer Framework setup) exit with code 1 as soon as they are placed in a Job Object, before they draw anything. RunContainer reports that exit code, keeps nothing running, and does not fall back to an uncontained launch. Use a virtual machine environment for those installers.
- **JIT cannot be switched on for native code.** A native `.exe` is already machine code. Only managed runtimes (.NET, Java, V8) compile at run time, and they already do so; [Performance and JIT](/guide/performance) covers what RunContainer can and cannot change.

## Developer mode and virtual machines (Nightly)

These limits apply to **RunContainer Nightly**. Stable from 0.9.1 onward does not include developer mode, so it has no Virtualise tab; virtual machines created in an older Stable build stay on disk.

- **Virtualise is experimental, and the panel says so.** The [Virtualise tab](/guide/developer-mode) runs a real machine on QEMU, but its console is a working screen rather than a tuned display protocol: frames are uncompressed over loopback, so a busy desktop can look delayed. Without hardware acceleration (WHPX) it falls back to software emulation and a graphical guest will feel it.
- **RunContainer ships no guest operating system.** You supply installation media you own; nothing is downloaded, and no Windows licence is included.
- **A Windows guest needs a storage driver to see its own disk.** The disk is attached the efficient way, so Windows setup will report no drive unless the virtio storage driver is supplied during setup (or the media already includes it). Linux guests have that support built in.
- **The console is screen and keyboard only.** The guest gets your typing and your clicks, and there is no clipboard sharing, no drag and drop and no shared folders.
- **Stop is an immediate power-off.** It is not a graceful shutdown request, and there are no snapshots or saved states. Shut the guest down from inside for a clean exit.
- **Deleting a machine deletes the system installed in it.** Its virtual disk is removed; if Windows refuses to remove the file, RunContainer reports that instead of claiming the machine is gone. Your installation media is never copied or modified.
- **A machine is stopped when RunContainer closes.** A VM owns a virtual disk and a console port and there is no window left to show it in once the app is gone, so closing RunContainer stops what it started, and a machine left running by a crash is stopped the next time the app starts. Pressing Start while a machine's disk is still in use is refused with the reason, because a second machine on one disk can corrupt the guest's filesystem.
- **Turning developer mode off never deletes a machine.** The tab closes and the detail hides; the disks stay where they are.
- **The RC-Brain audit detail is the same data, just shown.** With developer mode off, the same model and the same supervision run; only the panel's level of detail changes.

## Data

- **Delete is permanent; Reset is not.** Reset stops and restarts the app while keeping its environment, files and settings. Delete removes them, and RunContainer keeps no backup. → [Reset & remove](/user-guide/reset-remove)
- **Each environment has its own copy** of the applications installed in it, which uses extra disk space.

## Documentation

This documentation describes the intended user experience. Screen layouts and labels may differ from the application while it's in development.
