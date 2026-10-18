# Settings and profiles

RunContainer's main window has six tabs: **Sources**, **Apps**, **Tweaks**, **Settings**, **Profiles** and **Info**.

| Tab | What it's for |
| --- | --- |
| **Sources** | Adding applications: import from a URL, or install a local `.exe` |
| **Apps** | Your installed applications, with their actions |
| **Tweaks** | Per-application options: launch arguments, VM memory, processors and networking |
| **Settings** | How each app is isolated |
| **Profiles** | Isolation presets (default, relaxed or locked), assigned per application |
| **Info** | What RunContainer is, how it works, and its current limits |

![The Sources tab, with a Source URL field and Import from URL and Install local EXE buttons](/screenshots/sources-panel.png)

::: info Labels may change
Labels and options may change between releases. The pages in this guide describe the current version.
:::

## Tweaks

Pick an application in **Tweaks** to change its options:

- **Launch arguments**: passed to the app when it starts.
- **VM memory**: 512 to 32768 MB.
- **VM CPUs**: 1 to 16.
- **Guest networking**: turn it off to run the VM offline.

Invalid values are rejected and not saved. CPU, memory and network changes apply when the VM is off, so use **Reset** afterwards.

![The Tweaks form, with launch arguments, VM memory, VM CPUs, guest networking and Save tweaks](/screenshots/tweaks-panel.png)

## Profiles

Each profile is a preset for an application's network and container capabilities:

- **default**: online VM, with the network adapter attached.
- **relaxed**: online VM, with wider container capabilities.
- **locked**: offline VM with the adapters removed, and a container with no capabilities. A running VM needs **Reset** before this takes effect.

![The Profiles tab, listing the default, relaxed and locked presets](/screenshots/profiles-panel.png)

## Info

The **Info** tab explains how RunContainer works. Its "How it works" and "What isolation you actually get" sections match the limits described in [Isolation](/safety/isolation).

## Isolation in Settings

The **Settings** tab explains how each app is isolated. VM isolation is required and is the default. Optional AppContainer mode is available only when you opt in per app, and is never used as a fallback for VM isolation.

## Application settings vs. RunContainer settings

There are two kinds of settings to keep apart:

- **An application's own settings** (its preferences, sign-ins and recent files) are changed inside the application. They belong to that app's own RunContainer folder, so changing them doesn't affect other apps or your PC.
- **RunContainer's settings** control RunContainer itself and how it isolates apps.

## Related

- [Installing & managing applications](/user-guide/applications)
- [Isolation](/safety/isolation)
- [Privacy & credentials](/safety/privacy)
