# Crossroads API

This is an API server that directs car traffic on a crossroad.

## Setup

To set the project up, `Node.JS` $\geqslant 22.X$ with `npm` is required.

Please run: `npm i`.

## Git Hooks

This project uses `lefthook` to organize its git hooks:

- `pre-push` - runs `npm audit` and Jest tests
- `pre-commit` - runs prettier on the committed files

## Testing

This project uses `jest` to run its tests with `ts-jest` to add support for Typescript. Coverage tracking is enabled and outputs its reports in: `json`, `text-summary` (terminal) and `html` files, as configured in [`jest.config.js`](./jest.config.js).

To run tests, simply execute `npm test` and find the summary & coverage in both the terminal and additionally a full coverage report in HTML format inside [`coverage/index.html`](./coverage/index.html).

## Code style

The code uses single quotes, 4-space width tabs and keeps the format using `prettier`, configured in [`.prettierrc.json`](./.prettierrc.json).

## Structure

TBD

## Github Actions

This project runs CI and CD on Github actions.

### CI

### CD
