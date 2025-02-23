import { CarsStore, LightsStateRecord } from './types';

import { BaseCrossingConnection } from './crossingConnection/base';
import Car from './car';
import Config from './config';
import Direction from './direction';
import { STARTING_CARS_COUNTER } from './constants';
import _ from 'lodash';

/**
 * Holds and handles crossing state.
 */
export default class CrossingState {
	lightsStateRecord: LightsStateRecord;
	carsStore: CarsStore;
	crossingConnection: BaseCrossingConnection;
	config: Config;

	constructor(
		CrossingConnectionImplementation: new () => BaseCrossingConnection
	) {
		(this.config = Config.instance),
			(this.crossingConnection = new CrossingConnectionImplementation()),
			(this.lightsStateRecord =
				this.crossingConnection.getInitialLightsState());
		this.carsStore = _.cloneDeep(STARTING_CARS_COUNTER);
	}

	toString(): string {
		this.showLights();
		return [
			'Crossing state:',
			...Object.entries(this.carsStore).map(
				([direction, cars]) => `${direction}: ${cars.size}🚗`
			),
		].join('\n');
	}

	showLights(): void {
		console.log('Lights 🚦');
		console.log(
			Object.entries(this.lightsStateRecord)
				.map(([direction, light]) => `${direction}:${light}`)
				.join('\n')
		);
	}

	addCar(car: Car): void {
		this.carsStore[car.start].add(car);
	}

	/**
	 * Moves cars around the map according to crossing connection implementation's logic
	 *
	 * @return set of cars that exited the crossing this round
	 */
	moveCars(carsStore: CarsStore): Set<Car> {
		return this.crossingConnection.moveCars(
			this.lightsStateRecord,
			carsStore
		);
	}

	checkIfThereAreAnyCars(): boolean {
		return (
			Object.values(this.carsStore).reduce(
				(acc, cars) => acc + cars.size,
				0
			) === 0
		);
	}

	addRandomCar(): void {
		this.addCar(
			new Car(
				Math.floor(Math.random() * 100).toString(),
				// this.config.roundCt.toString(),
				_.sample(Object.values(Direction)) as Direction,
				_.sample(Object.values(Direction)) as Direction
			)
		);
	}

	changeLights(winningDirection: Direction): void {
		/**
		 * Changes intersection lights to green in direction where most cars are waiting.
		 */
		this.lightsStateRecord = this.crossingConnection.changeLights(
			(this.lightsStateRecord = this.lightsStateRecord),
			(winningDirection = winningDirection)
		);
	}
}
