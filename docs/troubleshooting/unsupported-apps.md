# Unsupported applications

RunContainer can't run every Windows application. Some applications depend on things a managed environment can't provide.

## Applications likely to have problems

| Type of application | Why it may not work |
| --- | --- |
| Software that installs **drivers** (hardware tools, some VPNs, virtual devices) | Drivers are installed into Windows itself, outside any environment. |
| Software that installs **system services** or deep system integrations | These expect to change Windows as a whole. |
| Games or applications with **anti-cheat or copy protection** | These often refuse to run in a managed or unusual environment. |
| **Security software** such as antivirus or firewalls | These need full access to the system to do their job. |
| **System utilities** that change Windows settings, disks or startup | They're designed to act on the host. |
| Software that **requires a restart** to finish installing | The restart may not complete the installation inside the environment. |

This list is a general guide, not a complete compatibility list. An application not listed here may still not work, and one listed may work.

## What to do

1. Try the application in a **fresh environment** to rule out an environment problem.
2. Check whether the application has a **portable** or "no install" version, which may behave better.
3. If it still doesn't work, it may be unsupported. You can [report it](/reference/contributing#reporting-compatibility) so it can be documented.

## Related

- [Known limitations](/reference/limitations)
- [Install & launch errors](/troubleshooting/install-launch)
