# Running and stopping applications

## Running an application

Start an application from RunContainer. It runs **inside its environment**. If that environment isn't already in use, RunContainer prepares it first. This can take a moment the first time.

Once open, the application looks and behaves like any other Windows application.

::: tip Launch from RunContainer
Applications installed into an environment are meant to be started from RunContainer. If you start a copy of the same program installed directly on your PC, it runs on the host, outside any environment.
:::

## Telling where an application is running

RunContainer shows which applications are currently running and the environment each belongs to. See [Statuses & errors](/user-guide/statuses).

## Stopping an application

- **Close it normally** using the application's own exit option or window close button. This is the preferred method and gives the application a chance to save your work.
- **Stop it from RunContainer** if the application isn't responding.

::: warning Unsaved work
Stopping an application that isn't responding may lose unsaved work, just as ending a task does in Windows.
:::

## Running several applications

You can use applications from different environments at the same time. Each stays in its own environment.

## Related

- [Environment startup problems](/troubleshooting/environment-startup)
- [Install & launch errors](/troubleshooting/install-launch)
