import Car from '../Car';
import { CrossingConnectAhead } from '../crossingConnection';
import Direction from '../direction';
import Intersection from '../intersection';
import LightState from '../lightState';
import { MostCarsWinSwitchingStrategy } from '../switchingStrategy';
import SimulationEnd from '../errors/simulationEnd';

class SpyableIntersection extends Intersection {
	getConfig() {
		return this.config;
	}

	getCrossingState() {
		return this.crossingState;
	}

	getSwitchingStrategy() {
		return this.switchingStrategy;
	}
}

describe('Intersection', () => {
	let intersection: SpyableIntersection;

	beforeEach(() => {
		intersection = new SpyableIntersection(
			CrossingConnectAhead,
			MostCarsWinSwitchingStrategy
		);
	});

	it('should add a car', () => {
		const addCarSpy = jest.spyOn(intersection.getCrossingState(), 'addCar');

		const car = new Car('vehicle1', Direction.E, Direction.W);

		intersection.addCar(car);

		expect(addCarSpy).toHaveBeenCalledWith(car);
		expect(addCarSpy).toHaveBeenCalledTimes(1);
	});

	it('should add a random car', () => {
		const addCarSpy = jest.spyOn(
			intersection.getCrossingState(),
			'addRandomCar'
		);

		intersection.addRandomCar();

		expect(addCarSpy).toHaveBeenCalledTimes(1);
	});

	it('getState() should return a valid initial state', () => {
		const getStateSpy = jest.spyOn(
			intersection.getCrossingState(),
			'getState'
		);

		const state = intersection.getState();
		expect(getStateSpy).toHaveBeenCalled();

		expect(state.simRoundCt).toEqual(0);
		expect(state.graceCt).toEqual(0);
		expect(state.carsStore).toEqual({
			[Direction.N]: [],
			[Direction.S]: [],
			[Direction.E]: [],
			[Direction.W]: [],
		});
		expect(state.lightsState).toEqual({
			[Direction.N]: LightState.GREEN,
			[Direction.S]: LightState.GREEN,
			[Direction.E]: LightState.RED,
			[Direction.W]: LightState.RED,
		});
	});

	it('should throw SimulationEnd when no cars are left', () => {
		expect(() => intersection.run()).toThrow(SimulationEnd);
	});
});
