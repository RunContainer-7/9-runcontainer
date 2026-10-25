# Resetting and removing environments

Clean-up is centred on environments. Instead of tracking down every file an application left behind, you deal with the environment it was installed into.

::: info What reset is for
Reset stops the app and starts it again with its current settings. It is the recovery action for a stuck app or for changed memory and CPU limits — not a wipe. Use **Delete** when you actually want the environment and its files gone.
:::

## Reset vs. delete

RunContainer has two separate actions. Don't confuse them.

| | Reset | Delete |
| --- | --- | --- |
| **What it does** | Stops the application and starts it again with its current settings | Removes the environment |
| **The environment** | Kept | Deleted |
| **Installed applications** | Kept | Removed |
| **Files saved inside it** | Kept | Removed |
| **Good for** | Recovering a stuck environment, or applying changed CPU and memory limits | Environments you no longer need |

Reset stops everything the app started and starts it again, while keeping the environment, the installed app and its files and data. Use it when an app is stuck or after you change its memory or CPU limits.

::: warning Delete can take a while
Delete stops the app first, which can take a moment with a large app. If it reports that a file is still in use, close antivirus, backup or indexing tools that may be holding it, then run Delete again.

Windows also creates links inside an environment's profile by itself — the internet cache turns `Content.IE5` into a junction the first time an app caches anything. Delete removes such a link and nothing it points at, so this no longer needs any action from you.
:::

## Before you reset or remove

1. **Close every application** in the environment.
2. **Copy out anything you want to keep.** Documents or exports saved inside the environment are kept by Reset but lost when the environment is deleted.
3. **Sign out of accounts** in applications you're about to remove, where that matters to you. Signing out often ends the session on the service's side as well.

::: danger Delete can't be undone
Deleting an environment permanently removes its contents: the installed app, its settings and every file saved inside it. RunContainer doesn't keep a backup. **Reset does not do this** — it keeps all of them.
:::

## Things that may be outside the environment

Isolation isn't absolute. Some effects of an application can reach beyond its environment, for example:

- data the application sent over the internet,
- accounts it created or signed into online,
- files you saved on purpose outside the environment.

Removing an environment doesn't undo these. See [Isolation is not a guarantee](/safety/not-a-guarantee).

## If something won't clean up

See [Recovery & cleanup issues](/troubleshooting/recovery).
