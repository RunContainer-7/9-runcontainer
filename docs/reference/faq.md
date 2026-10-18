# Frequently asked questions

## General

### What is RunContainer?

A Windows application management and isolation tool. With it, you install and run Windows applications inside environments that RunContainer manages, instead of directly on your PC. → [Introduction](/guide/introduction)

### Is it like LiveContainer?

The idea is similar. [LiveContainer](https://github.com/LiveContainer/LiveContainer) lets iOS apps run inside its own managed space instead of being installed on the device directly. RunContainer applies the same idea to Windows applications. The two are separate, unrelated projects.

### Is RunContainer free?

RunContainer is free and open source. Its source code is public at [github.com/north-star-info/runcontainer](https://github.com/north-star-info/runcontainer). The repository README names the MIT licence, but the repository doesn't yet include a LICENSE file, so the exact licence terms are not yet confirmed.

### Is it available now?

Not yet. There's no official public release. See [Downloads](/downloads).

## Using RunContainer

### Can I use applications I already have installed?

Applications installed directly on your PC stay where they are. To use an application inside RunContainer, install it into an environment. → [Installing applications](/user-guide/applications)

### Can I run applications from more than one environment at once?

Yes. Each application runs in its own environment. → [Running & stopping](/user-guide/running)

### Why do I have to sign in again in a new environment?

Each environment keeps its own copy of an application's settings and sign-ins. → [Settings & profiles](/user-guide/settings)

### Will every Windows application work?

No. Applications that need drivers, system services, anti-cheat or deep system access often don't. → [Unsupported applications](/troubleshooting/unsupported-apps)

## Safety

### Does RunContainer protect me from malware?

No. Isolation reduces the impact an application has on the rest of your PC, but it isn't malware protection or a guarantee of safety. → [Isolation is not a guarantee](/safety/not-a-guarantee)

### Is it safe to sign into accounts inside an environment?

Only as safe as the application itself. The application can see whatever you type into it. → [Privacy & credentials](/safety/privacy)

### How do I report a security problem?

→ [Reporting security issues](/reference/security)

## Project

### How can I help?

→ [Contributing](/reference/contributing)

### Where's the source code?

RunContainer is free and open source. The source code is at [github.com/north-star-info/runcontainer](https://github.com/north-star-info/runcontainer). → [Community & links](/community#source-code)

### Where can I get support?

Visit the [Support page](/support) for the Discord server and tips on asking for help.
