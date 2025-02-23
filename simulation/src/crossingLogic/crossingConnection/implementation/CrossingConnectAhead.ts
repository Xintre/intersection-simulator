import { CarsStore, LightsStateRecord } from '../../types';
import { E_W_LIGHTS_GREEN, N_S_LIGHTS_GREEN } from './constants';

import { ALL_LIGHTS_YELLOW } from '../../constants';
import { BaseCrossingConnection } from '../base';
import Car from '../../Car';
import Direction from '../../direction';
import _ from 'lodash';

export default class CrossingConnectAhead extends BaseCrossingConnection {
	getInitialLightsState(): LightsStateRecord {
		return N_S_LIGHTS_GREEN;
	}

	/**
	 * Teleports cars across the direction that is currently green,
	 * moving them away from the crossing in one round
	 *
	 * @param lightsStateRecord the record of lights state to read
	 * @param carsStore the store of cars on each road
	 *
	 * @return set of cars that exited the crossing this round
	 */
	moveCars(
		lightsStateRecord: LightsStateRecord,
		carsStore: CarsStore
	): Set<Car> {
		let carsExited = new Set<Car>();

		let directionsToTeleportForward: Direction[] = [];

		if (_.isEqual(lightsStateRecord, N_S_LIGHTS_GREEN)) {
			directionsToTeleportForward = [Direction.N, Direction.S];
		} else if (_.isEqual(lightsStateRecord, E_W_LIGHTS_GREEN)) {
			directionsToTeleportForward = [Direction.W, Direction.E];
		}

		for (const directionKey of directionsToTeleportForward) {
			for (const car of carsStore[directionKey]) {
				carsExited.add(car);
			}

			carsStore[directionKey].clear();
		}

		return carsExited;
	}

	changeLights(
		lightsStateRecord: LightsStateRecord,
		winningDirection: Direction
	): LightsStateRecord {
		if (_.isEqual(lightsStateRecord, ALL_LIGHTS_YELLOW)) {
			if ([Direction.N, Direction.S].includes(winningDirection)) {
				console.log(
					'Most of the cars are on North-South direction - strategy is to change these lights to green.'
				);
				return N_S_LIGHTS_GREEN;
			} else {
				console.log(
					'Most of the cars are on East-West direction - strategy is to change these lights to green.'
				);
				return E_W_LIGHTS_GREEN;
			}
		} else return ALL_LIGHTS_YELLOW;
	}

	getDescription(): string {
		return 'connects the opposite roads both ways at once, the most common example in real life (either: N<->S or W<->E)';
	}
}
