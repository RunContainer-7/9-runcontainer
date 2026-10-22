# Known limitations

These are the known limits on what it does and doesn't do.

## Availability

- **Unsigned installer.** The installer isn't code-signed, so Windows may show a warning before it runs. See [Downloads](/downloads).
- **System requirements aren't confirmed yet.** See [Prerequisites](/getting-started/prerequisites).
- **Some features may not be in every build.** Pages note where a feature's availability isn't yet confirmed.

## Compatibility

- **Not every Windows application works.** Applications that install drivers or system services, use anti-cheat or copy protection, or need deep system access are likely to have problems. → [Unsupported applications](/troubleshooting/unsupported-apps)
- **Behaviour can vary between application versions.** An application that works today may behave differently after it updates itself.

## How apps are kept apart

- **It is a launcher, not a virtual machine.** Apps run in their own space on the same Windows as everything else. That keeps their files and data together and limits their memory and CPU, but it is not a full security boundary.
- **A virtual machine is used only when one is already available.** RunContainer never downloads or bundles Windows. When a prepared image exists on the PC, apps use it automatically for a stronger boundary; the Settings tab says whether that is happening.
- **Shared Windows places are outside the app's folder.** A program that writes to the registry or a system-wide install directory can still leave traces there.
- **`locked` cannot always block the network.** It works when the app runs in a virtual machine or a restricted container; on a standard environment, Windows gives ordinary apps network access, and the app says so instead of implying otherwise.

## Security

- **Isolation isn't absolute.** Applications still interact with your screen, input, files you give them and the network. → [Isolation is not a guarantee](/safety/not-a-guarantee)
- **Not malware protection.** RunContainer doesn't scan or judge software.

## RC-Brain (AI monitoring)

- **It is a small model, not a language model.** RC-Brain 1 has 4,229 parameters and recognises patterns represented in its synthetic RunContainer corpus. It cannot reason about arbitrary novel software, read source code, or explain itself beyond the evidence vector it was given.
- **The evaluation corpus is synthetic.** 98.9% diagnosis and action accuracy, no false positives on normal behaviour and no unsafe actions were measured on held-out variants generated from the same scenario families. That measures generalisation within those families, not real-world software diversity.
- **It abstains rather than guessing.** About 2% of held-out variants fall below the 0.90 confidence threshold. When that happens the app only continues observing; it does not restart or repair anything.
- **No online learning.** The model's weights never change while the app runs. Repair outcomes are kept as local history and used to stop repeated repairs; improving the model requires a reviewed corpus change and a deliberate retrain.
- **Monitoring is not a service.** It runs only while RunContainer is open. Nothing is monitored after you close the app.
- **It sees the host, not inside a VM.** Window, CPU/IO and engine-liveness checks observe the host side of a virtual machine. A guest application that hangs without changing host-visible signals may not be diagnosed.
- **A detached GUI app's own stdout is not available.** RC-Brain reads the app's log file and the launcher's piped output; an app that writes to a console RunContainer does not own produces no live stdout.
- **No automatic system repair.** It cannot install runtimes, drivers or services, delete app data without approval, or weaken isolation. For missing Microsoft runtimes it recommends the official installer and stops there.
- **Model availability is reported, never faked.** If the model cannot load, the AI tab says so and there is no fallback to rule-based diagnosis.

## Data

- **Reset and remove are permanent.** There's no built-in backup of environment contents. → [Reset & remove](/user-guide/reset-remove)
- **Each environment has its own copy** of the applications installed in it, which uses extra disk space.

## Documentation

This documentation describes the intended user experience. Screen layouts and labels may differ from the application while it's in development.
