import { Car, IO, Intersection, translateDirection } from '../crossingLogic';

export function processCommand(
	intersection: Intersection,
	command: IO.AllCommands,
	output?: IO.ProgramOutput
) {
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

			output?.stepStatuses.push({
				leftVehicles: Array.from(carsExitedThisRound).map(
					(car) => car.carID
				),
			});

			break;
	}
}
