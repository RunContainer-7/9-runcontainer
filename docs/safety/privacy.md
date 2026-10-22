# Privacy and credentials

## What RunContainer does and doesn't change

Putting an application in an environment changes **where its files and settings are kept**. It doesn't change **what the application can see** when you use it:

- Text you type and files you open are visible to the application.
- The application can still use the internet, including any telemetry or analytics of its own.
- Accounts you sign into are accounts on that service. They exist outside RunContainer.

## RC-Brain (AI monitoring)

RC-Brain runs entirely on your PC. Observations and model inference stay local; the model is a small file shipped with the app, not a cloud service.

- **No telemetry endpoint is configured by default.** Anomaly reports are only produced when a build explicitly sets an HTTPS registry endpoint. In the public builds there is no endpoint, so nothing is sent at all.
- **If an endpoint is configured**, a handled anomaly produces a small JSON manifest containing the application's display name, the diagnosis and chosen action, a scrubbed log snippet (paths, user names, host names, IP addresses and e-mail addresses replaced) and whether the repair worked. It contains no app data, no files and no full logs.
- **Logs are never executed.** Text in a log is evidence; instructions embedded in it are classified as suspicious and escalated.
- **You can pause monitoring** from the **AI** tab, and closing RunContainer stops it.

→ [RC-Brain: architecture, training and permissions](/guide/ai-brain)

## Handling credentials

- **Sign in only to applications you trust.** An environment doesn't make it safe to give your password to unknown software.
- **Use a password manager** and unique passwords, so one compromised application can't unlock others.
- **Turn on two-factor authentication** for important accounts.
- **Sign out before removing an environment** if you want the session ended on the service's side. Deleting local data doesn't always sign you out remotely.

## Separate identities with environments

Each environment keeps its own copy of an application's settings and sign-ins. You can use this to keep, for example, a work account and a personal account in separate environments.

## Sharing logs and screenshots

When asking for help or reporting a bug, check what you're sharing first:

- Remove **usernames**, **email addresses** and **file paths** that include your name.
- Never share **passwords**, **licence keys**, **tokens** or **recovery codes**.
- Crop screenshots to just the relevant part.

## Related

- [Why isolation is not a guarantee](/safety/not-a-guarantee)
- [Settings & profiles](/user-guide/settings)
