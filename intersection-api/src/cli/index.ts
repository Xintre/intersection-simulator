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

		const commands = JSON.parse(
			fs.readFileSync('commands.json', {
				encoding: 'utf8',
			})
		) as IO.CommandsSeries;

		const output: IO.ProgramOutput = { stepStatuses: [] };

		while (true) {
			try {
				for (const command of commands) {
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
								leftVehicles: Array.from(
									carsExitedThisRound
								).map((car) => car.carID),
							});

							break;
					}
				}
			} catch (e: unknown) {
				if (e instanceof SimulationEnd) {
					console.log('Simulation finished!');
					break;
				}
			}
		}
	}
}

asyncMain();
