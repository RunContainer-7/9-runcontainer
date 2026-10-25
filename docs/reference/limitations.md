# Known limitations

These are the known limits on what it does and doesn't do.

## Availability

- **Unsigned installer.** The installer isn't code-signed, so Windows may show a warning before it runs. See [Downloads](/downloads).
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

- **It is a small fixed-label classifier, not a language model.** RC-Brain 2 has 8,334 parameters and chooses among 19 diagnoses and 11 actions from a 66-number evidence vector. It cannot read arbitrary log text semantically, invent a new diagnosis, or explain itself beyond that evidence. Unknown evidence becomes `unknown_failure` plus “gather more evidence”.
- **The evaluation corpus is synthetic.** Familiar-holdout diagnosis accuracy is 99.6%, unseen families 96.8% and the untouched final split 96.3%. Unseen families are still generated from RunContainer's architecture, so this measures generalisation across scenario families, not real-world software diversity. The keyword baseline scores 51.5%, 93.5% and 56.2% respectively.
- **Ambiguous cases are handled conservatively, not perfectly.** On 16 ambiguous/restraint cases the model often reported “unknown, gather evidence” instead of “still starting, wait”. Both are harmless; no repairs were proposed. Read the ambiguous accuracy (25.0%) as conservative behaviour, not understanding.
- **False positives are reported two ways.** A repair proposed for normal behaviour: 0% on every split. Normal behaviour labelled abnormal but only observed: 6.7% on the final split.
- **No online learning.** The model's weights never change while the app runs. History and retrieval are context; curated examples are data; only an offline, gated training run changes weights, and the previous model stays available for rollback.
- **Monitoring is not a service.** It runs only while RunContainer is open. Nothing is monitored after you close the app.
- **It sees the host, not inside a VM.** Window, CPU/IO and engine-liveness checks observe the host side of a virtual machine. A guest application that hangs without changing host-visible signals may not be diagnosed.
- **A detached GUI app's own stdout is not available.** RC-Brain reads the app's log file and the launcher's piped output; an app that writes to a console RunContainer does not own produces no live stdout.
- **No automatic system repair.** It cannot install runtimes, drivers or services, delete app data without approval, or weaken isolation. For missing Microsoft runtimes it recommends the official installer and stops there.
- **Model availability is reported, never faked.** If the model cannot load, Settings says so and there is no fallback to rule-based diagnosis.
- **Some installers refuse process containment.** A few bootstrappers (for example the MSYS2 Qt Installer Framework setup) exit with code 1 as soon as they are placed in a Job Object, before they draw anything. RunContainer reports that exit code, keeps nothing running, and does not fall back to an uncontained launch. Use a virtual machine environment for those installers.
- **JIT cannot be switched on for native code.** A native `.exe` is already machine code. Only managed runtimes (.NET, Java, V8) compile at run time, and they already do so; [Performance and JIT](/guide/performance) covers what RunContainer can and cannot change.

## Data

- **Delete is permanent; Reset is not.** Reset stops and restarts the app while keeping its environment, files and settings. Delete removes them, and RunContainer keeps no backup. → [Reset & remove](/user-guide/reset-remove)
- **Each environment has its own copy** of the applications installed in it, which uses extra disk space.

## Documentation

This documentation describes the intended user experience. Screen layouts and labels may differ from the application while it's in development.
