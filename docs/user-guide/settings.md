# Settings and profiles

RunContainer's main window has six tabs: **Sources**, **Apps**, **Tweaks**, **Settings**, **Profiles** and **Info**.

| Tab | What it's for |
| --- | --- |
| **Sources** | Adding applications, including installing an `.exe` file or importing from a URL |
| **Apps** | Your installed applications, with their status and actions |
| **Tweaks** | Per-application options: launch arguments, memory, processors and networking |
| **Settings** | RunContainer's own settings, including the sign-in it needs to set up environments |
| **Profiles** | Presets for an environment's network and capability settings: default, relaxed or locked |
| **Info** | Information about RunContainer, including its version |

::: info Pre-release
The source code is at an early version (0.5.0). Labels and options may change before an official release.
:::

## Application settings vs. RunContainer settings

There are two kinds of settings to keep apart:

- **An application's own settings** (its preferences, sign-ins and recent files) are changed inside the application, and belong to the environment it runs in. Changing them in one environment doesn't affect other environments or the host.
- **RunContainer's settings** control RunContainer itself and how it manages environments.

## Using environments as profiles

You can use environments as simple profiles even without a dedicated profile feature. Install the same application into two environments, for example "Work" and "Personal", and each copy keeps its own settings and sign-ins.

## Related

- [Managing environments](/user-guide/environments)
- [Privacy & credentials](/safety/privacy)
