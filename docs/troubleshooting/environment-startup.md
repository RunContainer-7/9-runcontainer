# Environment startup failures

An environment needs to start before an application can run in it.

## It's stuck on "Starting"

- **Wait a little longer.** The first start can take longer than later ones.
- **Close other running environments** to free up resources, then try again.
- **Restart RunContainer**, then your PC if needed.

## It shows an error straight away

- Read the message carefully. It often says what's missing.
- Check free disk space. Environments need room to work.
- Try creating a **new environment** and running a simple application in it. If that works, the original environment may be damaged. See [Recovery & cleanup](/troubleshooting/recovery).

## It only fails for one environment

That environment may be in a bad state. Copy out anything you need, then [reset it](/user-guide/reset-remove).

## It fails for every environment

This points to a setup problem rather than a single environment. See [Setup problems](/troubleshooting/setup) and consider [reporting the issue](/reference/contributing#reporting-bugs).
