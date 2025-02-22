# intersection-simulator

## Setup

To set the project up, `Node.JS` $\geqslant 22.X$ with `yarn` is required.

Please run: `yarn`.

## Scripts

- `postinstall` - installs lefthook to git hooks
- `stylecheck` - runs parallelly in each of the workspaces: `stylecheck` package.json script if applicable
- `python:run` - runs the prototype python script
- `python:lint` - runs ruff in the python prototype
- `ts:compile` - runs node tsc in intersection-api/src
- `ts:run` - runs node main in intersection-api/src

## Git Hooks

This project uses `lefthook` to organize its git hooks:

- `pre-push` - runs: `yarn test` and `yarn stylecheck`
- `pre-commit` - runs prettier on the committed files

## Technical description

This project is a monorepository using yarn to manage its workspaces and

## Workspaces

(format of listing: `path on disk` $\rightarrow$ `workspace name - field 'name' in package.json`)

- `./intersection-api` $\rightarrow$ `@xintre/intersection-api`

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
