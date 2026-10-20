# Settings and profiles

RunContainer's main window has seven tabs: **Sources**, **Apps**, **Tweaks**, **Settings**, **Profiles**, **Info** and **Updates**.

| Tab | What it's for |
| --- | --- |
| **Sources** | Adding applications: import from a URL, or install a local `.exe` |
| **Apps** | Your installed applications, with their actions |
| **Tweaks** | Per-application options: launch arguments, memory cap, CPU share and networking |
| **Settings** | Which isolation backend this PC uses, and app storage |
| **Profiles** | Isolation presets (default, relaxed or locked), assigned per application |
| **Info** | What RunContainer is, how it works, and its current limits |
| **Updates** | The installed version, a check-for-updates button and the release notes feed |

![The Sources tab, with a Source URL field and Import from URL and Install local EXE buttons](/screenshots/sources-panel.png)

::: info Labels may change
Labels and options may change between releases. The pages in this guide describe the current version.
:::

## Tweaks

Pick an application in **Tweaks** to change its options:

- **Launch arguments**: passed to the app when it starts.
- **Memory cap**: 512 to 32768 MB.
- **CPU share**: 1 to 16.
- **Guest networking**: turn it off to run the app offline.

Invalid values are rejected and not saved. Memory and CPU caps apply at the next **Run**. Network changes apply to a VM backend after **Reset**; containment can't cut network access.

![The Tweaks form, with launch arguments, VM memory, VM CPUs, guest networking and Save tweaks](/screenshots/tweaks-panel.png)

## Profiles

Each profile is a preset for an application's network and container capabilities:

- **default**: online VM, with the network adapter attached.
- **relaxed**: online VM, with wider container capabilities.
- **locked**: offline VM with the adapters removed, and a container with no capabilities. A running VM needs **Reset** before this takes effect.

![The Profiles tab, listing the default, relaxed and locked presets](/screenshots/profiles-panel.png)

## Info

The **Info** tab explains how RunContainer works. Its "How it works" and "What isolation you actually get" sections match the limits described in [Isolation](/safety/isolation).

Further down the tab, the **Support & documentation** section links to this documentation and to the [Discord server](/support), and both open in your default browser. The same Discord link appears in the beta notice. RunContainer only opens its own project links; any other address is refused.

![The Info tab. The Support & documentation section with both links sits below the cards shown here.](/screenshots/info-panel.png)

## Isolation in Settings

You don't configure isolation by hand. The **Settings** tab shows the backend RunContainer picked for this PC:

- **Backend: VM (QEMU)** — apps run inside a managed virtual machine with its own disk.
- **Backend: containment (RCVM)** — apps run inside a Windows Job Object with lifetime, memory, CPU and process caps, plus a private profile folder per app. This is not a hardware VM and does not cut network access.

Backend overrides, the Hyper-V readiness check, the guest credential and the option to point at a prepared VM image sit under **Advanced**, so the everyday screens are short. RunContainer never downloads or bundles Windows.

![The Settings tab, showing the picked backend, app storage and a collapsed Advanced section](/screenshots/tab-settings.png)

## Updates

The **Updates** tab shows the installed version and the release notes for every release. **Check for updates** reads the latest stable GitHub Release: when a newer version exists, a notice appears at the top of the window with **Update…**, **Remind tomorrow** and a dismiss button. Downloads are verified against the published size and checksum before anything runs.

![The Updates tab, with the installed version and the release notes feed](/screenshots/updates-panel.png)

## Application settings vs. RunContainer settings

There are two kinds of settings to keep apart:

- **An application's own settings** (its preferences, sign-ins and recent files) are changed inside the application. They belong to that app's own RunContainer folder, so changing them doesn't affect other apps or your PC.
- **RunContainer's settings** control RunContainer itself and how it isolates apps.

## Related

- [Installing & managing applications](/user-guide/applications)
- [Isolation](/safety/isolation)
- [Privacy & credentials](/safety/privacy)
