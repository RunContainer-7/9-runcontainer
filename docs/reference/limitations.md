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

## Data

- **Reset and remove are permanent.** There's no built-in backup of environment contents. → [Reset & remove](/user-guide/reset-remove)
- **Each environment has its own copy** of the applications installed in it, which uses extra disk space.

## Documentation

This documentation describes the intended user experience. Screen layouts and labels may differ from the application while it's in development.
