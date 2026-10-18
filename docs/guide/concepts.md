# Concepts & terminology

Only a few ideas are needed to understand RunContainer. You'll see these terms throughout the documentation. The [Glossary](/reference/glossary) lists every term in one place.

## Environment

An **environment** is a managed space that RunContainer creates and looks after. Applications are installed into an environment and run from it. An environment's contents are designed to stay apart from the rest of your PC and from other environments.

You might create:

- one environment for everyday tools,
- another for a specific project,
- and a temporary one to try out software you're unsure about.

## Application

An **application** is a Windows program that you install *into* an environment, usually by running its normal installer through RunContainer. RunContainer records which environment each application belongs to.

## Host

The **host** is your PC itself: the normal Windows desktop, outside any environment. Programs you install the ordinary way live on the host.

## Running and stopped

An application, or an environment, is either **running** (in use) or **stopped** (not in use). See [Statuses & errors](/user-guide/statuses) for what each state means and what to do when something goes wrong.

## Reset and remove

- **Reset** returns an environment to a clean state so you can start again.
- **Remove** deletes an environment and the applications inside it.

Where these actions are available, they're described in [Reset & remove](/user-guide/reset-remove).

## How the pieces fit together

```text
Your PC (host)
└── RunContainer
    ├── Environment: Everyday
    │   ├── Application A
    │   └── Application B
    └── Environment: Testing
        └── Application C
```

Each application belongs to exactly one environment. You can have more than one environment, and an environment can hold more than one application.
