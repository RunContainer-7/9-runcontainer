# Beginner walkthrough

<VideoIntro eyebrow="Prefer watching?" heading="Watch this walkthrough instead" compact />

This walkthrough covers the basic RunContainer workflow: install an application, run it, and clean up afterwards.

<WorkflowSteps />

::: info Screens change between releases
Button names and screens can change between releases.
:::

## 1. Install an application

On the **Apps** tab, press the **+** button, then choose **Install EXE**. In the file dialog, pick the installer and confirm.

![The + menu on the Apps tab, with Install EXE and Import from URL](/screenshots/apps-menu.png)

RunContainer shows the **Installing into RunContainer** window while it validates the file, creates the app's sandbox and registers it. When it finishes, the app appears in **My Apps**.

::: tip
If the installer asks to restart Windows, or to install drivers or system services, the application may not be suitable. See [Unsupported applications](/troubleshooting/unsupported-apps).
:::

## 2. Run the application

Press **Run** on the app. RunContainer starts it inside its isolated environment, and the app behaves like a normal Windows application. Press **Close** when you're finished. → [Running & stopping](/user-guide/running)

## 3. Keep it, or clean up

- **Keep it** if you'll use the application again. It stays installed until you delete it.
- **Reset** restarts the app's environment and keeps its data. → [Reset & remove](/user-guide/reset-remove)
- **Delete** removes the app and its folder.

::: danger Delete removes data
Deleting an app also removes the files saved inside it. Copy anything you want to keep out first.
:::

## You're done

You've completed the basic workflow. Next, you could:

- Learn what each [status](/user-guide/statuses) means.
- Read [What isolation is for](/safety/isolation) before using RunContainer for unfamiliar software.
- Browse the [FAQ](/reference/faq).
