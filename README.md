# intersection-simulator

## Setup

To set the project up, `Node.JS` $\geqslant 22.X$ with `yarn` is required.

Please run: `yarn`.

## Getting started

After completing the `Setup` section, please do the following:

1. Build & run the CLI app in mode reading input [`simulation/commands.json`](simulation/commands.json): `a`; you will find the JSON output both in the end of program output in the console and in [`simulation/output.json`](simulation/output.json)

## Scripts

- `build` - runs parallelly `build` command in every workspace, if present
- `test` - runs parallelly `test` command in every workspace, if present
- `postinstall` - installs lefthook to git hooks
- `stylecheck` - runs parallelly `stylecheck` command in every workspace, if present
- `python:run` - runs the prototype python script
- `python:lint` - runs ruff in the python prototype

## Git Hooks

This project uses `lefthook` to organize its git hooks:

- `pre-push` - runs: `yarn test` and `yarn stylecheck`
- `pre-commit` - runs prettier on the committed files

## Technical description

This project is a monorepository using yarn to manage its workspaces and

## Workspaces

(format of listing: `path on disk` $\rightarrow$ `workspace name - field 'name' in package.json`)

- `./simulation` $\rightarrow$ `@xintre/simulation`

## Testing

This project uses `jest` to run its tests with `ts-jest` to add support for Typescript. Coverage tracking is enabled and outputs its reports in: `json`, `text-summary` (terminal) and `html` files, as configured in [`jest.config.js`](./jest.config.js).

To run tests, simply execute `npm test` and find the summary & coverage in both the terminal and additionally a full coverage report in HTML format inside [`coverage/index.html`](./coverage/index.html).

## Code style

The code uses single quotes, 4-space width tabs and keeps the format using `prettier`, configured in [`.prettierrc.json`](./.prettierrc.json).

## Github Actions

This project runs CI and CD on Github actions.

### CI

TBD

### CD

TBD
