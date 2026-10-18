# Why isolation is not an absolute guarantee

::: danger Important
RunContainer is **not** an antivirus, malware scanner or security sandbox for hostile software. **Don't** run software you believe to be malicious on a PC you care about, inside RunContainer or not.
:::

## Why there are limits

- **Applications still need to interact with your PC.** To be useful, an application needs to show windows, use your keyboard and mouse, open files you give it and, often, reach the internet. Each of these crosses the boundary of its environment.
- **The network isn't contained.** An application can send and receive data over the internet. Removing its environment doesn't undo what it sent.
- **What you show it, it can see.** Anything you type, paste or open in an application is available to that application.
- **Software has bugs.** Like any software, RunContainer may have flaws that let an application affect more than intended.
- **Some applications go deeper.** Applications that install drivers or system services work at a level that environments aren't designed to contain. See [Unsupported applications](/troubleshooting/unsupported-apps).

## Keep your normal protections

Using RunContainer **doesn't** replace:

- Windows security features and updates,
- reputable antivirus software,
- backups of important files,
- downloading software only from sources you trust.

## Use it as one layer

Think of RunContainer as **one helpful layer** among several: useful for keeping things organised and reducing the impact of mistakes, not a reason to relax other precautions.

## Related

- [Testing unfamiliar software](/safety/responsible-testing)
- [Privacy & credentials](/safety/privacy)
- [Reporting security issues](/reference/security)
