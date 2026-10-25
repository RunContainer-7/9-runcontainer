# Installing and managing applications

RunContainer installs each application into its own managed copy, rather than onto your PC directly. The app then runs from that copy.

## Before you install

- **Get the installer from the official source.** RunContainer doesn't check whether an installer is genuine or safe. See [Testing unfamiliar software](/safety/responsible-testing).
- **Check compatibility notes.** Applications that need drivers, system services or system-wide installation may not work. See [Unsupported applications](/troubleshooting/unsupported-apps).
- **Check the prerequisites.** See [Prerequisites](/getting-started/prerequisites).

## Installing from the Sources tab

The **Sources** tab has the same two options as the **+** menu: a **Source URL** field with **Import from URL**, and **Install local EXE**.

![The Sources tab with the Source URL field and the Import from URL and Install local EXE buttons](/screenshots/sources-panel.png)

## Installing an application from an EXE

1. Open the **Apps** tab (My Apps).
2. Press the **+** button in the top-right corner. A menu opens with **Install EXE** and **Import from URL**.
3. Choose **Install EXE**. A file dialog opens, showing `.exe` files.
4. Select the installer and confirm.
5. The **Installing into RunContainer** window shows three steps: validate the app, create its sandbox, and register it in the launcher. Close it with **×** or by clicking outside it when the steps are done.
6. The app appears in **My Apps** under *Managed apps*.

![The + menu on the Apps tab, showing Install EXE and Import from URL](/screenshots/apps-menu.png)

RunContainer checks that the file is an `.exe` with a valid Windows program header before it copies anything. Files that fail the check aren't installed.

::: info Screens change between releases
The exact steps and labels can change between releases. The screenshots above are from the current build.
:::

## Installing from a URL

Choose **Import from URL** from the same **+** menu, then enter the address of the installer. Only `https://` addresses are accepted. RunContainer downloads the file, then installs it the same way as an EXE you picked yourself.

## Running the installer

The app's installer runs inside the app's own environment, not loose on your desktop. It gets the same space and limits as the app itself. Installer prompts to watch for are listed below.

The installer's window is shown inside RunContainer. It is hosted in a second RunContainer window with **Stop app**, **Release window** and a way back to the main window; when the installer requires administrator rights, Windows blocks that hosting, so the elevated launcher opens a RunContainer administrator window and hosts the wizard there instead. Apps that run in a virtual machine get the same treatment: the guest display, including any wizard inside it, opens in that window automatically. Hosting is presentation only — it changes where a window appears, not what the app can reach — and Windows can still decline to host a window, in which case RunContainer says so and the window stays on your desktop.

If the installer finishes but the environment needs a reboot, RunContainer tells you. Use **Reset** on the app, then **Run** it.

## Installer prompts to watch for

| The installer asks to… | What it may mean |
| --- | --- |
| Restart Windows | The application may depend on system-level changes that RunContainer can't provide. |
| Install a driver or system service | This kind of application is often unsupported. See [Known limitations](/reference/limitations). |
| Run with administrator rights | Think about why it needs them, especially for software you don't know. |
| Install extra bundled software | Decline offers you didn't ask for, just as you would outside RunContainer. |

## Managing installed applications

Each app in **My Apps** has these actions:

- **Manage**: see where the app lives, its log, how its window appears, and its access profile. See [Settings](/user-guide/settings).
- **Run** and **Close**: start the app, or stop it. See [Running & stopping](/user-guide/running).
- **Reset**: restart the app's environment, keeping its data. See [Reset or remove](/user-guide/reset-remove).
- **Duplicate**: create a separate copy with separate data.
- **Export info**: export the app's details.
- **Logs**: view the app's logs.
- **Delete**: remove the app's folder.

## Updating applications

Many applications update themselves. An update applies only to the RunContainer copy of the app. The installed copy on your PC isn't affected, and neither is any other app.

## Microsoft Store packages

Some downloads from a vendor's site aren't the application itself. They are a small bridge — a few hundred kilobytes — that asks Windows to install a Microsoft Store package. Windows installs those system-wide into `WindowsApps`, with a package identity, and does not let any other program redirect that into an app folder: there is nothing for RunContainer to keep separate, and the Store's window is a UWP frame that no RunContainer window can host.

RunContainer recognises such a bridge and refuses it before anything starts, rather than letting the real app install outside its environment. Two options:

- **Use the desktop build.** The vendor's `.exe` or `.msi` download is installed into the app's own folder and contained normally.
- **Use a virtual machine for that environment.** With a VM engine selected in [Settings](/user-guide/settings), the Store install happens inside the guest OS, on the guest's own screen.

A normal application that merely offers a Store link is not affected; only a small file that exists to hand off to the Store is refused.

## Uninstalling applications

To remove an app, use **Delete** in its entry under **My Apps**. You can also use the app's own uninstaller inside RunContainer first, then delete the entry.

## Related

- [Install & launch errors](/troubleshooting/install-launch)
- [Running & stopping](/user-guide/running)
