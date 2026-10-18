# Statuses and common errors

RunContainer shows the state of each environment and application. The wording in the application may vary while RunContainer is in pre-release. The meanings below describe the general states.

## States

The application states in the RunContainer source code are:

| State | Meaning | What you can do |
| --- | --- | --- |
| **Installed** | The installer finished and the application is ready to run. | Run it. |
| **Installed, needs reboot** | The installer asked for a restart. | Reset the environment, then run it. |
| **Running** | The application is open. | Use it, or stop it. |
| **Stopped** | The application isn't running. | Run it again. |
| **Failed** | Something went wrong. | Read the message, then see below. |
| **Unknown** | RunContainer restarted, or the environment stopped responding. | Run to refresh the state, stop to close it cleanly, or reset to restart the environment. |

Only one operation (run, install, delete or reset) can run in an environment at a time. If you try another while one is in progress, RunContainer refuses it. Wait for the first one to finish.

## Common errors

### The environment won't start

The environment stays at *Starting* or shows an error. → [Environment startup problems](/troubleshooting/environment-startup)

### The installer fails or closes early

→ [Install & launch errors](/troubleshooting/install-launch)

### The application opens and then closes, or doesn't open

→ [Install & launch errors](/troubleshooting/install-launch) and [Unsupported applications](/troubleshooting/unsupported-apps)

### An environment can't be reset or removed

Usually something inside it is still running. → [Recovery & cleanup issues](/troubleshooting/recovery)

## Reporting a problem

If none of the troubleshooting pages help, please report the problem. See [Contributing](/reference/contributing#reporting-bugs) for what to include, and **remove any personal information** first.

You can also ask for help on the Discord server. See the [Support page](/support).
