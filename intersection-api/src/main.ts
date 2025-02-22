import { CrossingConnectAhead } from './crossingConnection/implementation';
import Intersection from './intersection';
import { MostCarsWinSwitchingStrategy } from './switchingStrategy/implementation';
import SimulationEnd from './errors/simulationEnd';

runIntersection();

export default async function runIntersection() {
	let intersection = new Intersection(
		CrossingConnectAhead,
		MostCarsWinSwitchingStrategy
	);

	for (let i: number = 0; i < 5; i++) {
		intersection.crossingState.addRandomCar();
	}
	while (true) {
		try {
			intersection.run();
		} catch (e: unknown) {
			if (e instanceof SimulationEnd) {
				console.log('Simulation finished!');
				break;
			}
			throw e;
		}

		await new Promise((r) => setTimeout(r, 1500));
	}
}
