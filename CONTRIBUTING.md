# Contributing to Grapes

We would love for you to contribute to Grapes and help make it even better than it is today!
As a contributor, here are the guidelines we would like you to follow.

We also suggest you read the [Project Philosophy](https://grapes.spendesk.design/docs/guide/philosophy) in our documentation.

## Got a Question or Problem?

Do not open issues for general support questions.
Instead, we recommend using Slack to ask support-related questions. Join the channel `#help_squad_design_system` and ask your question.

## Found a Bug?

If you find a bug in the source code, you can help us by joining the channel `#help_squad_design_system` and report the issue.
Even better, you can submit a Pull Request with a fix.

## Development

Make sure you have the following requirements installed: [node](https://nodejs.org/) (v22+) and npm.

Clone the repo locally.

```
git clone https://github.com/Spendesk/grapes
cd grapes
npm install
```

You can then run the storybook and browse to [http://localhost:6006](http://localhost:6006) with:

```bash
npm run dev
```

### Component scaffolding

If you are looking to add a new component that does not exist yet, please run the following command.

```bash
npm run create:component
```

This will start a series of cli prompts to determine what template files and folders should be generated to help quick start your contribution.
The prompts are as follows:

1. Component name, please use appropriate uppercase (e.g. TextField)

2. Category of your component

Upon answering all the prompts, the appropriate file(s) should be generated and ready for modification.

### Icon scaffolding

If you are looking to add a new icon that does not exist yet, please run the following command.

```bash
npm run create:icon
```

This will ask for the icon name and generate the files to help quick start your contribution.

### Tests

We use [vitest](https://vitest.dev/) for unit tests and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) for rendering and writing assertions. Please make sure you include tests with your pull requests. Our CI will run the tests against both react@18 and react@19 as well as run the linter, type checker and Chromatic. You can see on each PR whether you have passed all our checks.

You can run the tests with:

```bash
npm test
```

You can also get a code coverage report by running:

```bash
npm test -- --coverage
```

Please note that we have a strict coverage threshold of **98%**. If your Pull Request decreases the coverage below this threshold, the CI will fail.

### Linting

The code is linted with [eslint](https://eslint.org/). You can run it with:

```bash
npm run lint
```

### TypeScript

The code is written in [TypeScript](https://www.typescriptlang.org/). The type checker will usually run in your editor, but also runs when you run.

```bash
npm run typecheck
```

### Chromatic

We use [Chromatic](https://www.chromatic.com) to check for visual bugs. Only stories named `Snapshot` are submitted to Chromatic for review and test. However, for components that require interaction, every story is submitted to Chromatic. Examples include, but are not limited to: Autocomplete, Modal, PageModal.

### Storybook

We use [Storybook](https://storybooks.js.org) for local development. Run the following command to start it:

```bash
npm run dev
```

Then, open [http://localhost:6006](http://localhost:6006) in your browser to play around with the components and test your changes.

### Commit Message Format

Grapes is using [angular commit message conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).
Adherence to these conventions is mandatory because the release and the changelog are automatically generated from these messages.

#### Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.

#### Type

Must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope

The scope could be anything specifying the place of the commit change. For example TextInput, RadioInput etc...

You can use \* when the change affects more than a single scope.

#### Examples

Here is an example of the release type that will be done based on a commit message:

| Commit message                                                                                                   | Release type     |
| ---------------------------------------------------------------------------------------------------------------- | ---------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                             | Fix Release      |
| `feat(pencil): add 'graphiteWidth' option`                                                                       | Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.` | Breaking Release |

## Pull Requests

A few things to keep in mind before submitting a pull request:

- Add a clear description covering your changes
- Make sure linting and tests pass
- Include relevant unit tests
- Add/update stories in storybook for your changes
- Remember that all submissions require review from the Grapes owner

The team will review all pull requests and may request changes to it. Once, at least one owner has validated your PR, you will be able to merge it.

Lastly, please follow the pull request template when submitting a pull request!

## Maintenance Guidelines

When contributing to Grapes, it's important to design it for generic usage, rather than assuming that the Spendesk frontend will be the only consumer.

It's also important to remember that the web extends beyond Chrome and Chromium-based browsers. It's **essential** to test Grapes against a range of browsers including Firefox and Safari. Supported platforms are documented on the [documentation website](https://grapes.spendesk.design/docs/guide/supported-platforms).

That being said, Grapes should adopt the design philosophy of [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), ensuring that it remains accessible to users with older browsers while still leveraging modern features for those with newer browsers.
It means that features such as animations can be built using the latest **standardized** features.

### Source of truth

Starting with Grapes 1.x, Figma serves as the source of truth. No features, components or icons should be added to this repository unless their specifications are documented in [Figma](https://www.figma.com/files/910916912733890296/project/22685136/%F0%9F%8C%8D-Core?fuid=938493096974291740). Previously, the approach was the opposite, which led to many disruptions for the design team.

The updated process is as follows:

1. Designers collaborate on a new specification, with feedback from developers.
1. Designers publish a new version of the Design System library on Figma.
1. Designers announce the changes in the #announce-grapes-design-web channel on Slack.
1. Developers implement the changes in this repository.

Only bug fixes are permitted to bypass this process.

### Notes on dependencies

Grapes aims to be lightweight, which includes being mindful of the number and size of its npm dependencies. When considering adding a new dependency to Grapes, it's important to carefully evaluate the impact on maintainability and compatibility with existing consumers.

Just because an external library seems to work in the Spendesk frontend, it doesn't mean it will be a good fit for Grapes. A new version of the library could potentially break compatibility with the Spendesk frontend.

It's also important to remember that Grapes is consumed by different bundlers, such as **Vite**, **Webpack**, **Turbo**, and **Parcel**. You need to test all of these bundlers when adding a new dependency using the `beta` branch.

### Think before adding yet another prop

We already have many props, and we should avoid fixing an issue by adding yet another one. Before adding an prop, remember the [Grapes philosophy](https://grapes.spendesk.design/docs/guide/philosophy) and consider whether the problem:

- is really worth addressing
- has workaround using existing prop
- can be addressed with a custom wrapper instead

### Introduce a breaking change

When introducing a breaking change, it's **essential** to provide thorough documentation and implement a codemod to facilitate the migration for consumers.

Codemod should be added to the [Grapes-codemod repository](https://github.com/Spendesk/grapes-codemod) and a documentation about how to use it should be added to the [documentation website.](https://grapes.spendesk.design/docs/guide/codemods).

## Release

Grapes is deployed on [NPM](https://www.npmjs.com/package/@dev-spendesk/grapes). We use [semantic-release](https://semantic-release.gitbook.io/semantic-release/) to automate the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package.

### Release rules

For each new commit added to `master`, our CI runs semantic-release to compare your commit against our release rules:

- Commits with `type` 'feat' will be associated with a `minor` release.
- Commits with `type` 'fix' will be associated with a `patch` release.
- Commits with `type` 'perf' will be associated with a `patch` release.
- Commits with `scope` 'no-release' will not be associated with a release type even if they have a breaking change or the `type` 'feat', 'fix' or 'perf'.

If a release is created, you will be notified on your pull requests.

### Pre-version

You can deploy a beta version of Grapes using the branch `beta`. Commit your work on this branch and semantic-release will trigger a new pre-release available under the tag `beta` on npm. Make sure to ask on Slack at #help_squad_design_system before committing your work on beta.

You will be able to use it in your repo with:

```bash
npm install @dev-spendesk/grapes@beta
```

Please note that the beta branch is subject to the same release rules as the branch master.
