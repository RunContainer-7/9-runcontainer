# Installing and managing applications

Applications are installed **into** an environment, rather than directly onto your PC.

## Before you install

- **Get the installer from the official source.** RunContainer doesn't check whether an installer is genuine or safe. See [Testing unfamiliar software](/safety/responsible-testing).
- **Pick the environment first.** Decide which environment the application belongs in. See [Managing environments](/user-guide/environments).
- **Check compatibility notes.** Applications that need drivers, system services or system-wide installation may not work. See [Unsupported applications](/troubleshooting/unsupported-apps).

## Installing an application

1. In RunContainer, choose the environment you want to install into.
2. Choose to install an application and select its installer.
3. Go through the installer as you normally would.
4. When it finishes, the application appears under that environment in RunContainer.

::: info Pre-release
The exact steps and labels may change before the first official release.
:::

## Installer prompts to watch for

| The installer asks to… | What it may mean |
| --- | --- |
| Restart Windows | The application may depend on system-level changes that a managed environment can't provide. |
| Install a driver or system service | This kind of application is often unsupported. See [Known limitations](/reference/limitations). |
| Run with administrator rights | Think about why it needs them, especially for software you don't know. |
| Install extra bundled software | Decline offers you didn't ask for, just as you would outside RunContainer. |

## Managing installed applications

For each installed application, RunContainer shows which environment it belongs to and whether it's running. From there you can [run or stop it](/user-guide/running).

## Updating applications

Many applications update themselves. If an application updates from inside its environment, the update applies to that environment's copy only. Copies in other environments, or on the host, aren't affected.

## Uninstalling applications

To get rid of an application, you can either use its own uninstaller inside the environment or, where supported, [reset or remove the environment](/user-guide/reset-remove) it lives in.

## Related

- [Install & launch errors](/troubleshooting/install-launch)
- [Running & stopping](/user-guide/running)
