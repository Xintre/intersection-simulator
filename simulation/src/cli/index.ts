import * as fs from 'fs';

import {
	CrossingConnectAhead,
	IO,
	Intersection,
	MostCarsWinSwitchingStrategy,
	SimulationEnd,
} from '../crossingLogic';

import { hideBin } from 'yargs/helpers';
import { processCommand } from '../shared';
import yargs from 'yargs';

let intersection = new Intersection(
	CrossingConnectAhead,
	MostCarsWinSwitchingStrategy
);

yargs(hideBin(process.argv))
	.command(
		'simulate [input] [output]',
		'run the crossroads simulation, program exits when input ends',
		(yargs) => {
			return yargs
				.positional('input', {
					describe: 'input commands JSON file',
					default: 'commands.json',
				})
				.positional('output', {
					describe: 'program output JSON file',
					default: 'output.json',
				});
		},
		async (argv) => {
			// commands mode (json input + no delay between rounds, rounds controlled by commands)

			console.log("Running in 'commands' mode (no delay + json reading)");

			const input = JSON.parse(
				fs.readFileSync(argv.input, {
					encoding: 'utf8',
				})
			) as IO.CommandsInput;

			const output: IO.ProgramOutput = { stepStatuses: [] };

			intersection.printConfig();

			for (const command of input.commands) {
				try {
					console.log('Processing command', command);
					processCommand(intersection, command, output);
					console.log();
				} catch (e: unknown) {
					if (e instanceof SimulationEnd) {
						// silence the error - we want to run forever in this mode
					} else {
						// make other errors happen
						throw e;
					}
				}
			}

			const stringifiedOutput = JSON.stringify(output, null, 2);

			console.log(
				` >> Program output in required format (also written to '${argv.output}') << `
			);
			console.log(stringifiedOutput);

			fs.writeFileSync(argv.output, stringifiedOutput, {
				encoding: 'utf8',
			});
		}
	)
	.command(
		'random',
		'runs in random mode (adding random cars & running until all exit the crossing), ignoring the input positional option',
		(yargs) => {
			return yargs.positional('output', {
				describe: 'program output JSON file',
				default: 'output.json',
			});
		},
		async (_argv) => {
			// "random" mode - will run random cars

			console.log(
				"Running in 'random' mode (random cars spawned + delay between rounds)"
			);

			for (let i: number = 0; i < 5; i++) {
				intersection.addRandomCar();
			}

			intersection.printConfig();

			while (true) {
				try {
					intersection.run();
				} catch (e: unknown) {
					if (e instanceof SimulationEnd) {
						console.log('Simulation finished!');
						break;
					}
				}

				await new Promise((r) => setTimeout(r, 1500));
			}
		}
	)
	.demandCommand(1)
	.help()
	.parse();
