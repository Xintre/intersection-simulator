import * as fs from 'fs';

import {
	Car,
	CrossingConnectAhead,
	IO,
	Intersection,
	MostCarsWinSwitchingStrategy,
	SimulationEnd,
	translateDirection,
} from '../crossingLogic';

export default async function asyncMain() {
	const isRandomMode = process.argv.includes('--random');

	let intersection = new Intersection(
		CrossingConnectAhead,
		MostCarsWinSwitchingStrategy
	);

	if (isRandomMode) {
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
	} else {
		// commands.json mode (json input + no delay between rounds, rounds controlled by commands)

		console.log(
			"Running in 'commands.json' mode (no delay + json reading)"
		);

		const input = JSON.parse(
			fs.readFileSync('commands.json', {
				encoding: 'utf8',
			})
		) as IO.CommandsInput;

		const output: IO.ProgramOutput = { stepStatuses: [] };

		intersection.printConfig();

		for (const command of input.commands) {
			try {
				console.log('Processing command', command);

				switch (command.type) {
					case 'addVehicle':
						intersection.addCar(
							new Car(
								command.vehicleId,
								translateDirection(command.startRoad),
								translateDirection(command.endRoad)
							)
						);
						break;

					case 'step':
						const carsExitedThisRound = intersection.run();

						output.stepStatuses.push({
							leftVehicles: Array.from(carsExitedThisRound).map(
								(car) => car.carID
							),
						});

						break;
				}

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
			" >> Program output in required format (also written to 'output.json') << "
		);
		console.log(stringifiedOutput);

		fs.writeFileSync('output.json', stringifiedOutput, {
			encoding: 'utf8',
		});
	}
}

asyncMain();
