# Beginner walkthrough

This walkthrough covers the complete RunContainer workflow: create an environment, install an application into it, run it, and clean up afterwards.

<WorkflowSteps />

::: info Pre-release
Exact button names and screens may change before the first official release. The steps below describe the workflow, not a specific screen layout.
:::

## 1. Create an environment

Create a new environment in RunContainer and give it a descriptive name, such as **Everyday**.

An environment is the managed space your application will live in. → [Managing environments](/user-guide/environments)

## 2. Install an application

Choose to install an application into your new environment, then select the application's installer. Go through the installer as you normally would.

When the installer finishes, the application appears in RunContainer under the environment you chose. → [Installing applications](/user-guide/applications)

::: tip
If an installer asks to restart Windows, or to install drivers or system services, the application may not be suitable for a managed environment. See [Unsupported applications](/troubleshooting/unsupported-apps).
:::

## 3. Run the application

Start the application from RunContainer. It opens and behaves like a normal Windows application, but it's running inside its environment.

When you're finished, close the application normally or stop it from RunContainer. → [Running & stopping](/user-guide/running)

## 4. Keep it, or clean up

- **Keep it** if you'll use the application again. It stays in its environment until you remove it.
- **Reset or remove** the environment if you were only trying something out. → [Reset & remove](/user-guide/reset-remove)

::: danger Removing deletes data
Removing an environment also removes the applications and any files saved inside it. Copy anything you want to keep out of the environment first.
:::

## You're done

You've completed the full workflow. Next, you could:

- Learn what each [status](/user-guide/statuses) means.
- Read [What isolation is for](/safety/isolation) before using RunContainer for unfamiliar software.
- Browse the [FAQ](/reference/faq).
