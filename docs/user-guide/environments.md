# Managing environments

An **environment** is the managed space that applications are installed into and run from. This page explains how to plan and organise environments.

## Creating an environment

Create an environment from RunContainer and give it a name. Choose a name that describes **what the environment is for**, not which application is in it. Purposes stay meaningful even after you add more applications.

| Good names | Less helpful names |
| --- | --- |
| Everyday | Env1 |
| Photo editing | New environment |
| Testing: unknown tools | Temp |

## How many environments?

There's no single right answer. Some useful patterns:

- **One per purpose.** For example, work, personal and testing.
- **One per application.** This gives the most separation between applications, but takes more disk space.
- **A disposable environment for experiments.** You can reset or remove it at any time without affecting anything else.

::: tip Keep trusted and untrusted software apart
Don't install software you're unsure about into the same environment as tools you rely on. If something goes wrong, you can clean up the experimental environment without touching the others.
:::

## Seeing what's in an environment

RunContainer shows the applications that belong to each environment, and whether each one is [running or stopped](/user-guide/statuses).

## Renaming, resetting and removing

How to return an environment to a clean state or delete it is covered in [Reset & remove](/user-guide/reset-remove).

## Related

- [Concepts & terminology](/guide/concepts)
- [Installing applications](/user-guide/applications)
- [Environment startup problems](/troubleshooting/environment-startup)
