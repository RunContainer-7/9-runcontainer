# Prerequisites

Before you start, make sure you have the following.

## Confirmed

- **A Windows PC.** RunContainer is a Windows application and manages Windows applications.
- **Permission to install software** on that PC. On a work or school device, check with your administrator first.
- **Installers for the applications you want to use**, obtained from their official sources.
- **Free and open source.** RunContainer costs nothing to use, and its source is public.

## From the source repository

The [RunContainer repository](https://github.com/RunContainer-7/runcontainer) documents these defaults:

- **Administrator rights** may be needed for some features.
- **About 4 GB of memory per environment** by default, and about **20–40 GB of disk space** per environment as it grows.

## Supported

| Requirement | Status |
| --- | --- |
| Windows versions | Windows 10 and Windows 11 |
| Windows editions | Home, Pro, Enterprise and Education. Hyper-V environments need Pro, Enterprise or Education. |
| Processor architecture | 64-bit (x64). The installer refuses other architectures. |
| Memory and disk for RunContainer itself | Small: the installer is about 100 MB installed and the app uses Electron's usual working set. The 4 GB / 20–40 GB figures above are per environment. |

::: tip Plan for disk space
Each environment holds its own copy of the applications installed in it. If you plan to create several environments, allow room for them.
:::

## Next step

Continue to [Installation](/getting-started/installation).
