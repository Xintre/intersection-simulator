import type * as IO from './io';

import { Car, Intersection, translateDirection } from '../crossingLogic';

export function processCommand(
	intersection: Intersection,
	command: IO.AllCommands,
	output?: IO.ProgramOutput
) {
	switch (command.type) {
		case 'addVehicle':
			console.log(
				`Adding car '${command.vehicleId}' driving from ${command.startRoad} to ${command.endRoad}`
			);

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

			console.log(
				`Step ${output?.stepStatuses.length} completed, ${carsExitedThisRound.size} car(s) exited the crossing this turn`
			);

			output?.stepStatuses.push({
				leftVehicles: Array.from(carsExitedThisRound).map(
					(car) => car.carID
				),
			});

			break;
	}
}
