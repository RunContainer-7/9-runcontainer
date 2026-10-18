# What isolation is intended to accomplish

RunContainer places applications in **managed environments**. Keeping applications apart in this way is called **isolation**.

## The goals

Isolation in RunContainer is intended to:

- **Limit an application's footprint.** Keep its files and settings within its environment, instead of across your PC.
- **Separate applications from each other.** Stop an application in one environment from interfering with applications in another.
- **Make clean-up predictable.** Let you get rid of an application by dealing with one environment.
- **Support careful experimentation.** Give you a place to try software that's kept apart from the tools you depend on.

## What it means for you

- You can keep **work, personal and experimental** software in different environments.
- If an application causes a problem, the effect is **intended to be contained** to its environment. You can then [reset or remove](/user-guide/reset-remove) it.
- Your everyday desktop stays **tidier**, because applications aren't installed into it directly.

## What the settings say

The **Settings** tab describes the isolation RunContainer uses:

![The Settings tab, with the VM isolation card and the optional AppContainer card](/screenshots/settings-isolation.png)

VM isolation is required by default. If it can't be set up, RunContainer refuses to launch the app rather than running it unprotected.

## What it doesn't mean

Isolation **reduces** risk. It doesn't **remove** it. Read [Isolation is not a guarantee](/safety/not-a-guarantee) before relying on RunContainer for anything you're worried about.
