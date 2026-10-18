# Recovery and cleanup issues

## An environment won't reset or remove

Usually something in it is still running.

1. Close every application in the environment.
2. Wait for the environment to show as stopped.
3. Try again.
4. If it still fails, restart your PC and try again before opening any applications.

## I removed an environment but something is still there

Isolation isn't absolute. Some things can sit outside an environment:

- **Files you saved outside the environment** on purpose, for example to your Desktop or a USB drive.
- **Online accounts and data.** Removing an environment doesn't delete accounts, cloud files or anything the application sent over the internet.
- **Shortcuts you created yourself.**

Remove these manually if you no longer want them. See [Isolation is not a guarantee](/safety/not-a-guarantee).

## I removed an environment by mistake

Removed environments can't be recovered by RunContainer. Reinstall the applications in a new environment. To avoid losing work, regularly copy important files out of environments.

## An application misbehaved and I'm worried

If you think an application was malicious, removing its environment may not be enough. See [Testing unfamiliar software](/safety/responsible-testing#if-something-seems-wrong).
