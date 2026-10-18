# How it differs from ordinary installation

Most Windows applications are installed directly onto your PC. RunContainer adds a managed layer between you and the application.

## Side by side

| | Ordinary installation | With RunContainer |
| --- | --- | --- |
| **Where it's installed** | Directly onto your system | Inside an environment managed by RunContainer |
| **Where its changes go** | Mixed in with everything else on the PC | Intended to stay within its environment |
| **How you launch it** | Start menu, desktop shortcut | From RunContainer, in the application's environment |
| **Separation from other apps** | None beyond what Windows normally provides | Applications can be placed in separate environments |
| **Cleaning up** | Depends on the application's own uninstaller | Centred on the environment |

## Why it helps

**Less clutter on your PC.** Normally, applications leave files, settings and shortcuts in many places. Keeping them in an environment makes it clearer what belongs to what.

**Freedom to experiment.** If you want to try an application, you can use an environment set aside for that purpose, then reset or remove it afterwards.

**Clear boundaries between uses.** You can keep, for example, work tools and personal tools in different environments.

## What stays the same

- An application still looks and behaves like itself. RunContainer doesn't change how the application works internally.
- You still need a legitimate copy and licence for any software you install.
- The application can still use the network and see what you type into it. Isolation isn't a privacy shield. See [Privacy & credentials](/safety/privacy).

## Trade-offs

Running applications in a managed environment isn't free of compromises. Some applications expect to be installed system-wide, need drivers or background services, or include protection that won't work in a managed environment. See [Unsupported applications](/troubleshooting/unsupported-apps) and [Known limitations](/reference/limitations).
