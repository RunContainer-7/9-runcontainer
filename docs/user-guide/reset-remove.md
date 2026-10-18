# Resetting and removing environments

Clean-up is centred on environments. Instead of tracking down every file an application left behind, you deal with the environment it was installed into.

::: info Availability
Reset and remove are described as intended. If an option isn't available in your build, use the application's own uninstaller inside the environment.
:::

## Reset vs. delete

RunContainer has two separate actions. Don't confuse them.

| | Reset | Delete |
| --- | --- | --- |
| **What it does** | Stops the application and returns the environment to a clean state | Removes the environment |
| **The environment** | Kept | Deleted |
| **Installed applications** | Kept | Removed |
| **Files saved inside it** | Kept | Removed |
| **Good for** | Recovering a stuck environment, or applying changed CPU, memory or network settings | Environments you no longer need |

Reset keeps the disk, installed applications and data. Use it when an environment is stuck or after you change its settings. For AppContainer-mode applications, Reset stops the processes and removes the container profile.

::: warning Delete can take a while
Deleting a VM environment shuts the environment down first, and can wait up to two minutes for it to power off. If deletion reports a leftover lock, close antivirus, backup or indexing tools that may be using the files, then run Delete again.
:::

## Before you reset or remove

1. **Close every application** in the environment.
2. **Copy out anything you want to keep.** Documents or exports saved inside the environment are lost when it's reset or removed.
3. **Sign out of accounts** in applications you're about to remove, where that matters to you. Signing out often ends the session on the service's side as well.

::: danger This can't be undone
Resetting or removing an environment permanently deletes its contents. RunContainer doesn't keep a backup.
:::

## Things that may be outside the environment

Isolation isn't absolute. Some effects of an application can reach beyond its environment, for example:

- data the application sent over the internet,
- accounts it created or signed into online,
- files you saved on purpose outside the environment.

Removing an environment doesn't undo these. See [Isolation is not a guarantee](/safety/not-a-guarantee).

## If something won't clean up

See [Recovery & cleanup issues](/troubleshooting/recovery).
