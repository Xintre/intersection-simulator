import { BaseSwitchingStrategy } from '../base';
import CrossingState from '../../crossingState';
import Direction from '../../direction';

/**
 * Strategy that changes lights to green in direction where most cars are waiting.
 */
export default class MostCarsWinSwitchingStrategy extends BaseSwitchingStrategy {
	calculateWinningDirection(crossingState: CrossingState): Direction {
		return Object.entries(crossingState.carsStore)
			.sort(([, carsA], [, carsB]) => carsB.size - carsA.size)
			.map(([direction]) => direction)[0] as Direction;
	}
}
