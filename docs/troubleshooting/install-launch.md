# Installation and launch errors

## The installer fails or closes early

- **Check that you chose the right installer** for your PC, for example a 64-bit installer for a 64-bit PC.
- **Download the installer again** from the official source. The file may be incomplete.
- **Watch for prompts** about drivers, services or restarts. These often mean the application is [unsupported](/troubleshooting/unsupported-apps).
- **Try a fresh environment.** A previous failed install may have left the environment in a confused state.

## The installer says the application is already installed

The application may already be installed in this environment. Check the application list for the environment. Copies installed on the host or in other environments don't count. Each environment is separate.

## The application doesn't appear after installing

- Make sure the installer actually finished. Some show a final "Finish" screen that needs to be clicked.
- Some installers start a second, separate installer. Wait for every window to close.

## The application won't open, or closes immediately

- **Start it from RunContainer,** not from a shortcut that may point to a copy on the host.
- **Close it fully and try again.** Check that its environment has stopped first.
- **Look for a missing component.** Some applications need extra runtime libraries, which their own installer may offer to install.
- If it never opens, it may be [unsupported](/troubleshooting/unsupported-apps).

## The application asks for administrator rights (Windows error 740)

Some executables declare that they **require administrator rights**. Windows refuses to start those from a normal, non-elevated process and reports **740**. This used to stop an installation outright; since 0.7.4 RunContainer handles it:

1. RunContainer recognises the refusal and asks **Windows** for approval once (the standard UAC prompt).
2. If you approve, the **same contained launcher** starts elevated — the Job Object caps and the app's own data folder still apply.
3. Because Windows does not allow a normal process to host an elevated window, the **elevated launcher opens its own RunContainer window** (titled `RunContainer — <app> (administrator approved)`) and hosts the app or installer wizard inside it. Closing that window stops the contained app. The app card says it is administrator-approved.

If you decline the prompt, nothing is started. If the app still fails after approval, it is probably installing drivers or services, which needs a [virtual machine environment](/safety/isolation). Never weaken containment just to make an installer run.

## The application asks me to sign in again

Each environment keeps its own copy of an application's settings and sign-ins. This is expected after installing into a new environment. See [Settings & profiles](/user-guide/settings).
