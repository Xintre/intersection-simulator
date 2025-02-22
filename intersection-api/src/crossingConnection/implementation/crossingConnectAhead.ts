import { CarsCounterRecord, LightsStateRecord } from '../../types';
import { E_W_LIGHTS_GREEN, N_S_LIGHTS_GREEN } from './constants';

import { ALL_LIGHTS_YELLOW } from '../../constants';
import { BaseCrossingConnection } from '../base';
import Direction from '../../direction';
import _ from 'lodash';

export default class CrossingConnectAhead extends BaseCrossingConnection {
	getInitialLightsState(): LightsStateRecord {
		return N_S_LIGHTS_GREEN;
	}
	moveCars(
		lightsStateRecord: LightsStateRecord,
		carsCounterRecord: CarsCounterRecord
	): void {
		if (_.isEqual(lightsStateRecord, N_S_LIGHTS_GREEN)) {
			carsCounterRecord[Direction.N] = 0;
			carsCounterRecord[Direction.S] = 0;
		}
		if (_.isEqual(lightsStateRecord, E_W_LIGHTS_GREEN)) {
			carsCounterRecord[Direction.W] = 0;
			carsCounterRecord[Direction.E] = 0;
		}
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
}
