# intersection-simulator

![example workflow](https://github.com/Xintre/intersection-simulator/actions/workflows/ci.yml/badge.svg)

## Setup

To set the project up, `Node.JS` $\geqslant 22.X$ with `yarn` is required.

**Please run: `yarn`.**

Since I didn't finish adjusting the React Native app to work with a monorepo setup, for now it is a separate project. **You also need to run `cd app && yarn`.**

## Getting started

After completing the `Setup` section, please do the following:

1. Build & run the CLI app in mode reading input [`simulation/commands.json`](simulation/commands.json):
   - `yarn workspace @xintre/simulation run build`
   - `yarn workspace @xintre/simulation run start:cli`
   - you will find the JSON output both in the end of program output in the console and in [`simulation/output.json`](simulation/output.json)
2. Run the server (do not close it):
   - `yarn workspace @xintre/simulation run start:server`
3. Run the React Native app (in another terminal):
   - for Android: `yarn workspace @xintre/simulation run android`
   - for iOS: `yarn workspace @xintre/simulation run ios`

## Documentation

- Simulation module's [`README.md`](./simulation/README.md), documenting the CLI, server, logic and additional scripts related to them
- React Native app's [`README.md`](./app/README.md)

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

This project is a monorepository using yarn to manage its workspaces and provides scripts in separate `package.json`s across workspaces.

The stack is as follows:

- React Native app:
  - `react-native`
  - `axios`
  - `react-native-paper`
  - `react-native-vector-icons`
- Simulation API
  - `lodash`
  - `yargs`
  - `helmet`
  - `express`

And:

- `jest` + `ts-jest` for TS support
- `typescript`
- `lefthook` for GIT Hooks
- `prettier` as the formatter

## Workspaces

(format of listing: `path on disk` $\rightarrow$ `workspace name - field 'name' in package.json`)

- `./simulation` $\rightarrow$ `@xintre/simulation`

## Code style

The code uses single quotes, 4-space width tabs and keeps the format using `prettier`, configured in [`.prettierrc.json`](./.prettierrc.json).

## Github Actions

This project runs CI and CD on Github actions.

### CI

TBD

### CD

TBD
