<script setup lang="ts">
import { project } from '../.vitepress/project'
const latest = project.latestDownload
</script>

# What is RunContainer?

RunContainer is a **Windows application management and isolation tool**. With it, you install and run Windows applications **inside environments that RunContainer manages**, instead of installing them directly onto your PC as ordinary standalone desktop applications.

::: info Current release
RunContainer **{{ latest.version }}** is the current stable release for Windows. See [Downloads](/downloads) for both editions and their installers.
:::

## Two versions: Stable and Nightly

**Stable** is the green edition recommended for everyday use. **Nightly** is blue and gives early access to experimental features; it may contain more bugs. Nightly has developer mode, including experimental virtual machines and technical RC-Brain details. Stable 0.9.0 still includes developer mode; a future Stable update is intended to move it to Nightly.

You can install both separately: their apps, settings and updates are separate, and your existing apps are not automatically copied between them. [Compare and download the editions](/downloads#choose-your-version).

<VideoIntro heading="New here? Watch the tour" />

## The simplest way to think about it

> **RunContainer is an app that opens other apps inside itself.**

You add a Windows application and press **Run**. RunContainer attempts to show the app in its own window, with separate managed files and settings. Some windows or installers cannot be hosted and may appear on the desktop instead. See [Known limitations](/reference/limitations).

<SimulationDemo />

## If you know LiveContainer on iOS

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
