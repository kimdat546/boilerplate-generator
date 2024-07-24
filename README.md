# Hypercoding Generator

Hypercoding Generator is a CLI tool to generate boilerplate templates for projects. It helps automate the setup of new projects with predefined configurations and structures, making it easier to start new projects quickly.

![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103) ![Stars](https://img.shields.io/github/stars/kimdat546/boilerplate-generator)

## Features

- Generate Vite projects with React and TypeScript
- Edit tsconfig and Vite config files
- Add custom ESLint rules
- Initialize project structure based on predefined templates
- Install and configure dependencies like Tailwind CSS and Shadcn UI
- Supports adding new boilerplate templates in the future

## Installation

You can install the hypercoding-generator globally using npm:

```base
npm install -g hypercoding-generator
```

## Usage

To create a new project using the generator, run:

```base
hypercoding-generator
```

If you don't have the generator installed globally, you can use npx to run it without installing it:

```base
npx hypercoding-generator
```

The generator will prompt you to select a boilerplate template and enter the project name. It will then create the project with the specified configurations and structure.

## Templates

The project structure templates are stored in the structures folder. You can find predefined templates for different project types, such as React, React Typescript, and React Tailwind. Many more templates will be added in the future.

`Currently available templates:`

- React-Shadcn UI

## Using a Template

When you run the generator, it will list all available templates. You can select the desired template from the list. The generator will create the project with the specified configurations and structure.

```base
npx hypercoding-generator
? Project name: my-vite-project
? Select a package manager
❯ React-Shadcn UI
  Coming soon
 ──────────────
React, Vite, Shadcn UI, Tailwind CSS, TypeScript
```

## Contributing

We welcome contributions from the community. Please read our [Contributing Guide](./.github/CONTRIBUTING.md) for details on how to get started.

## Code of Conduct

Please note that this project is released with a [Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## Donate

If you find this project useful and would like to support its development, you can [`buy me a coffee`](https://buymeacoffee.com/kimdat546) or donate via [`PayPal`](https://www.paypal.com/paypalme/kimdat546). Your support is greatly appreciated!

## License

This project is licensed under the BSD-3-Clause License. See the [LICENSE](LICENSE) file for details.
