import { CAR_PASS_ROUND_TICKS, LIGHTS_CHANGE_ROUND_TICKS } from './constants';

import { BaseCrossingConnection } from './crossingConnection/base';
import { BaseSwitchingStrategy } from './switchingStrategy/base';
import Car from './Car';
import Config from './config';
import CrossingState from './crossingState';
import Direction from './direction';
import SimulationEnd from './errors/simulationEnd';

export default class Intersection {
	#config: Config;
	#crossingState: CrossingState;
	#switchingStrategy: BaseSwitchingStrategy;

	#simRoundCt: number;

	constructor(
		CrossingConnectionImplementation: new () => BaseCrossingConnection,
		SwitchingStrategyImplementation: new () => BaseSwitchingStrategy
	) {
		this.#config = Config.instance;
		this.#crossingState = new CrossingState(
			CrossingConnectionImplementation
		);
		this.#switchingStrategy = new SwitchingStrategyImplementation();
		this.#simRoundCt = 0;
	}

	addCar(car: Car) {
		this.#crossingState.addCar(car);
	}

	addRandomCar() {
		this.#crossingState.addRandomCar();
	}

	/**
	 * Runs the next round
	 * @return `Car`s which left the intersection this round
	 */
	run(): Set<Car> {
		let carsExitedThisRound = new Set<Car>();

		if (this.#crossingState.checkIfThereAreAnyCars()) {
			console.log(this.#crossingState.toString());
			console.log('No more cars at the intersection 🚗');
			throw new SimulationEnd('Simulation has ended');
		}

		console.log(
			`==================== Round ${this.#simRoundCt}, grace counter: ${this.#config.roundCt} ====================`
		);
		console.log(this.#crossingState.toString());

		// update lights
		let winningDirection: Direction =
			this.#switchingStrategy.calculateWinningDirection(
				this.#crossingState
			);

		if (this.#config.roundCt >= LIGHTS_CHANGE_ROUND_TICKS) {
			this.#crossingState.changeLights(
				(winningDirection = winningDirection)
			);

			this.#config.roundCt = 0;
		}

		if (this.#config.roundCt >= CAR_PASS_ROUND_TICKS) {
			carsExitedThisRound = this.#crossingState.moveCars(
				this.#crossingState.carsStore
			);
		}

		this.#config.roundCt++;
		this.#simRoundCt++;

		return carsExitedThisRound;
	}

	printConfig() {
		console.log(' >> Intersection configuration printed << ');

		console.log(
			`Lights change (🔴 -> 🟡, 🟡 -> 🟢, 🟡 -> 🔴) lasts ${LIGHTS_CHANGE_ROUND_TICKS} round(s)`
		);
		console.log(
			`A car driver waits ${CAR_PASS_ROUND_TICKS} round(s) after 🟢 turns on before driving`
		);
		console.log(
			`The chosen BaseCrossingConnection implementation is: ${this.#crossingState.crossingConnection.constructor.name}, which does the following: ${this.#crossingState.crossingConnection.getDescription()}`
		);

		console.log(' >> ---------------------------------- << ');
	}
}
