# Policies

Plain-language rules for using RunContainer and its community spaces. They are not legal advice, and they do not replace the [MIT licence](https://github.com/RunContainer-7/runcontainer/blob/master/LICENSE) that covers the source code.

## Terms of service

RunContainer is free software provided **as-is, without warranty**. You may use it for personal or commercial work, on as many PCs as you like.

By installing and using RunContainer, you confirm that you are at least **15 years old**, regardless of where you live.

You are responsible for:

- the applications you install and run through it;
- having a licence for those applications;
- keeping your own backups. Migration, reset and repair actions can change an app's managed data.

Do not use RunContainer to break the law, to harm other people or their systems, or to bypass licence checks or protections you do not own. The project may change or withdraw features between releases; the current terms are always this page.

### Selling and forks

RunContainer is free, and it is meant to stay free for everyone. You are **not recommended** to sell RunContainer, its source code or any build made from it.

If you clone the repository and publish your own version (a fork):

- link back to the original project, [RunContainer](https://github.com/RunContainer-7/runcontainer), somewhere people will see it, such as your README or download page;
- do not claim that your fork is the original RunContainer or the official release.

## Privacy policy

RunContainer is local-first.

- **RC-Brain** runs on your PC. Diagnoses, verification results and the experience history are stored in RunContainer's app-data folder (`%APPDATA%\RunContainer`). Inference makes no network request.
- **Diagnostic records are redacted** before they are written: Windows paths, user names, machine names, e-mail addresses, IP addresses and URLs are replaced with placeholders. Raw log text is kept only as a short, scrubbed snippet.
- **The update check** contacts GitHub (`api.github.com`) to read the public release feed. It sends no information about you beyond a normal HTTPS request.
- **Telemetry is off by default.** The official build has no telemetry endpoint configured, so nothing is sent. A build can only report an anonymised anomaly manifest if its owner configures an explicit registry endpoint; the app shows whether that is configured.
- **You stay in control.** You can disable monitoring in Settings, clear the history, or delete `%APPDATA%\RunContainer` at any time.

## Source code, cloning and self-hosting

The source is public at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer) under the MIT licence.

You may read it, clone it, build it, modify it and share your changes. If you publish a modified build, say clearly that it is **not** the official release, and do not use the official download links or checksums for it.

Building from source is the strongest way to check that the installer matches the code: the release workflow in `.github/workflows/release.yml` is the same process used for published builds.

## Code signing

Stable 0.9.3 is self-signed. Older Stable installers and Nightly remain unsigned. A self-signed certificate is not trusted by Windows by default and does not independently establish publisher identity, so Windows may warn for either edition.

Compare each download with the SHA-256 checksum on [Downloads](/downloads). A matching checksum or signature is not a guarantee that the software is safe.

## Use of applications

RunContainer runs programs; it does not give you a licence to them.

- Do **not** use RunContainer to run pirated software, cracked installers, or anything you would not be allowed to install on your own PC.
- Respect each application's licence and the vendor's terms.
- Never point RunContainer at malware or use it to attack systems you do not own.
- Isolation is a safety boundary, not permission to do harm. It is also not a guarantee: see [Isolation is not a guarantee](/safety/not-a-guarantee).

## Community and feedback

The community runs on the [Discord server](https://discord.gg/UKTGRMMmC4) and GitHub issues.

- Treat maintainers and members with respect. Abuse, harassment, threats, discrimination and personal attacks are not welcome.
- Do not mistreat the people answering your questions. They are volunteers, not a support desk you bought.
- Keep feedback constructive: say what happened, what you expected, and what you tried. A clear report is worth more than a complaint.
- RunContainer is free and maintained in spare time. Appreciate that it exists; not every request can be built, and no one owes you a fix on your schedule.

Reports are read, but a report is not a promise of a feature.

## Cost

RunContainer is free. There is no paid tier, no account, and no upsell. If it saves you time, the best way to say thanks is to help someone else in Discord or send a useful bug report.
