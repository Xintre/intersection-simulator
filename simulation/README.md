# Crossroads API

This is an API server that directs car traffic on a crossroad.

## Scripts

- `test` - runs Jest tests with coverage
- `stylecheck` - runs prettier check on files
- `build` - transpiles TS to JS with `tsc`
- `dev:cli` / `start:cli` - runs CLI `simulate` command with default positional input & output arguments (runs from commands from input file, exits when commands end):
    - `dev:cli` - runs directly from TS source files using `tsx`
    - `start:cli` - runs from `build/` transpiled JS files; **requires `build` to be run first!**
- `dev:cli-random` / `start:cli-random` - runs CLI `random` command (randomly added cars, simulation running until all cars exit)
    - `dev:cli-random` - runs directly from TS source files using `tsx`
    - `start:cli-random` - runs from `build/` transpiled JS files; **requires `build` to be run first!**
- `dev:server` / `start:server` - runs the Express server:
    - `dev:server` - runs directly from TS source files using `tsx`
    - `start:server` - runs from `build/` transpiled JS files; **requires `build` to be run first!**

## CLI options

The CLI is built using `yargs`. It is possible to just run it with `--help` or without any positional command for it to print help.

To run the CLI manually, do it either:

1. After running `yarn build` from JS transpiled files: `npx tsx build/cli --help`
2. Run TS files with `tsx`: `npx tsx build/cli --help`

Usage:

```bash
cli <command>

Commands:
  cli simulate [input] [output]  run the crossroads simulation, program exits
                                 when input ends
  cli random                     runs in random mode (adding random cars &
                                 running until all exit the crossing), ignoring
                                 the input positional option

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```
