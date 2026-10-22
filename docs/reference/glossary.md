# Glossary

### Application

A Windows program installed into an environment through RunContainer. → [Installing applications](/user-guide/applications)

### Environment

A managed space created and looked after by RunContainer. Applications are installed into and run from an environment. → [Managing environments](/user-guide/environments)

### Host

Your PC itself: the normal Windows desktop, outside any environment.

### Installer

The setup program an application provides, usually a `.exe` or `.msi` file, which you run to install the application.

### RC-Brain

RunContainer's own small neural model. It observes running applications, diagnoses problems and chooses a repair action. It runs locally and only while RunContainer is open. → [RC-Brain](/guide/ai-brain)

### Diagnosis

The cause RC-Brain chooses for an observation (for example `missing_runtime` or `engine_unresponsive`), with a calibrated confidence and the evidence that led to it.

### Repair action

One of the fixed, validated operations RC-Brain may choose (restart the app, restart the engine, repair folder permissions, or clear the profile with approval). The model cannot supply commands of its own.

### Isolation

Keeping applications and their changes apart from the host and from each other. It reduces risk but isn't a guarantee. → [What isolation is for](/safety/isolation)

### Portable application

An application that runs without being installed. These often work well in managed environments.

### Preview release

A build made available for testing before a stable release. It may have unfinished features or bugs.

### Remove

Delete an environment along with the applications and files inside it. → [Reset & remove](/user-guide/reset-remove)

### Reset

Stop everything an app started and return its environment to a clean state, keeping the app's saved files and data. → [Reset & remove](/user-guide/reset-remove)

### Running

In use. An application or environment that's currently open. → [Statuses](/user-guide/statuses)

### Stable release

A build recommended for general use.

### Stopped

Not in use. → [Statuses](/user-guide/statuses)
