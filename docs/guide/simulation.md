---
title: The RunContainer simulation
description: An animated, recording-style walkthrough of running an app inside RunContainer, step by step.
---

# The simulation

The simplest way to understand RunContainer is one sentence:

> **It is an app that opens other apps inside itself.**

You pick a Windows application, press **Run**, and that application opens in a window
*inside* RunContainer — with its own files, settings and limits — instead of becoming
another stand-alone window and another set of files scattered over your PC.

<SimulationDemo />

::: info This is a simulation, not a screen recording
The animation above is drawn from the product's real flow, so it plays instantly, loops,
and works on every screen size. It is not footage of a specific PC. For the real interface,
watch the [video walkthrough](/guide/introduction#new-here-watch-the-tour) or
[install RunContainer](/downloads).
:::

## What each step shows

1. **Pick an app.** Anything you add is copied into a managed environment. The app list
   shows the app's own icon, its name and which environment it belongs to.
2. **Press Run.** RunContainer starts the app contained, verifies that the containment is
   actually in force, and only then reports it as running. Nothing is reported as contained
   on trust.
3. **The window opens inside RunContainer.** The app's window is hosted in a RunContainer
   window. For an app that requires administrator rights, Windows will not allow that
   hosting, so the window stays on your desktop and RunContainer says so plainly.
4. **Close it.** Everything the app wrote stays in its environment. Deleting the
   environment afterwards removes exactly those files; resetting it keeps them.

## Try it yourself

- [Download RunContainer](/downloads) and install it.
- Follow [Installing applications](/user-guide/applications) to add your first `.exe`.
- Read [Running and stopping](/user-guide/running) for what Run does, and
  [Reset and remove](/user-guide/reset-remove) for the difference between keeping and
  deleting an environment's files.

If the animation helped, subscribing to the [YouTube channel](https://www.youtube.com/@RunContainer)
and joining the [Discord](https://discord.gg/UKTGRMMmC4) is the easiest way to support
the project.
