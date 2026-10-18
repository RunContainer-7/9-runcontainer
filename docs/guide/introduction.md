# What is RunContainer?

RunContainer is a **Windows application management and isolation tool**. With it, you install and run Windows applications **inside environments that RunContainer manages**, instead of installing them directly onto your PC as ordinary standalone desktop applications.

::: info Pre-release software
RunContainer is in development and hasn't had an official public release yet. This documentation describes the intended user experience. Details may change before the first release. See [Downloads](/downloads) for current availability.
:::

## The idea in one sentence

> Give every Windows application a managed space of its own, so it's easier to keep track of, keep apart and clean up.

If you know [LiveContainer](https://github.com/LiveContainer/LiveContainer) on iOS, the idea is similar. LiveContainer lets apps run inside its own managed space instead of being installed on the device as normal apps. RunContainer applies the same idea to Windows applications. RunContainer is a separate project and isn't affiliated with LiveContainer.

## What RunContainer is designed to help you do

- **Keep applications organised.** See which applications you've installed through RunContainer and which environment each one belongs to.
- **Keep applications apart.** Put applications in separate environments so that one application's changes are kept away from your everyday desktop and from other applications.
- **Run and stop applications from one place.** Launch an application in its environment, and stop it again when you're done.
- **Clean up more easily.** When you no longer need an application, clean-up focuses on its environment instead of files and settings scattered across your PC.
- **Try things out more carefully.** Use a dedicated environment to evaluate software before deciding whether to keep it. See [Testing unfamiliar software](/safety/responsible-testing).

## What RunContainer is not

- **Not an antivirus or malware scanner.** It doesn't decide whether software is safe.
- **Not a guarantee of security.** Isolation reduces risk but doesn't remove it. Read [Isolation is not a guarantee](/safety/not-a-guarantee).
- **Not universally compatible.** Some Windows applications won't work inside a managed environment. See [Known limitations](/reference/limitations).

## Where to go next

- [Concepts & terminology](/guide/concepts): the words used throughout these docs.
- [How it differs](/guide/how-it-differs): RunContainer compared with an ordinary installation.
- [Getting started](/getting-started/prerequisites): what you need before you begin.
