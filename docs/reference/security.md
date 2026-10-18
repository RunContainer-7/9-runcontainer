# Reporting security issues

If you believe you've found a security vulnerability in RunContainer, such as a way for an application to affect the host or another environment beyond what's described in [Known limitations](/reference/limitations), please report it **privately and responsibly**.

## How to report

<p>Private reporting channel: <ProjectLink to="securityUrl" label="Security advisories" /></p>

A dedicated private security reporting channel hasn't been published yet. Until it is:

- **Don't disclose vulnerabilities publicly**, including in public issues, forums or social media.
- **Don't send exploit details** to anyone claiming to represent the project through an unofficial channel.
- Check back here. This page will be updated with the official channel once it's established.

## What to include

When a channel is available, a good report includes:

- a description of the issue and its potential impact,
- steps to reproduce it, using harmless test programs where possible,
- the RunContainer version and your Windows version.

Remove personal information from anything you share.

## Scope

**In scope:** problems in RunContainer itself that undermine the intended separation between environments and the host.

**Out of scope:** behaviour already described as a limitation, such as network access, what an application can see while you use it, and applications that install drivers or system services. See [Isolation is not a guarantee](/safety/not-a-guarantee).
