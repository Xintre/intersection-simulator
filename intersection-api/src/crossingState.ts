import { CarsCounterRecord, LightsStateRecord } from './types';

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
	carsCounterRecord: CarsCounterRecord;
	crossingConnection: BaseCrossingConnection;
	config: Config;

	constructor(
		CrossingConnectionImplementation: new () => BaseCrossingConnection
	) {
		(this.config = Config.instance),
			(this.crossingConnection = new CrossingConnectionImplementation()),
			(this.lightsStateRecord =
				this.crossingConnection.getInitialLightsState());
		this.carsCounterRecord = _.cloneDeep(STARTING_CARS_COUNTER);
	}

	toString(): string {
		this.showLights();
		return [
			'Crossing state:',
			...Object.entries(this.carsCounterRecord).map(
				([direction, carNumber]) => `${direction}: ${carNumber}🚗`
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
		this.carsCounterRecord[car.start]++;
	}

	moveCars(carsCounterRecord: CarsCounterRecord): void {
		this.crossingConnection.moveCars(
			this.lightsStateRecord,
			carsCounterRecord
		);
	}

	checkIfThereAreAnyCars(): boolean {
		return (
			Object.values(this.carsCounterRecord).reduce(
				(acc, val) => acc + val,
				0
			) === 0
		);
	}

	addRandomCar(): void {
		this.addCar(
			new Car(
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
