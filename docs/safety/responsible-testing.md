# Responsible testing of unfamiliar software

RunContainer can help you evaluate software you don't yet know well, as long as you stay careful.

## Before you test

- **Prefer official sources.** Download from the developer's own website or an official store.
- **Scan the installer** with your usual security software.
- **Back up important files** on your PC.
- **Create a dedicated environment** just for testing. Don't use an environment that holds software you rely on.

## While you test

- **Don't sign in to important accounts** (email, banking, work) from software you're still evaluating.
- **Don't open sensitive files** in it.
- **Decline extra offers** during installation, such as toolbars or bundled programs.
- **Watch what it asks for.** Requests for administrator rights, drivers or restarts deserve a second thought.

## After you test

- If you don't want to keep it, [reset or remove](/user-guide/reset-remove) the test environment.
- If you do want to keep it, consider installing it fresh into an everyday environment, rather than reusing the test environment.

## If something seems wrong

If an application behaves suspiciously (unexpected pop-ups, changed settings outside its environment, unknown sign-in alerts):

1. **Stop the application** and close RunContainer.
2. **Disconnect from the internet** if you're concerned it's sending data.
3. **Run a full scan** with your security software.
4. **Change passwords** for any accounts you used while it was running, using a different, trusted device.
5. **Remove the environment** once you're done investigating.

If you believe RunContainer itself let an application affect your PC in a way it shouldn't, please see [Reporting security issues](/reference/security).

::: warning Malware research
Deliberately running known malware calls for dedicated, disconnected equipment and specialist tools. RunContainer isn't designed or suitable for that purpose.
:::
