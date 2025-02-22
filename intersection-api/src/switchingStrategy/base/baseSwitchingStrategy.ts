import Config from '../../config';
import CrossingState from '../../crossingState';
import Direction from '../../direction';

export default abstract class BaseSwitchingStrategy {
	config: Config;
	constructor() {
		this.config = Config.instance;
	}
	/**
	 * Returns direction that should be enabled (green) ASAP.
	 */
	abstract calculateWinningDirection(crossingState: CrossingState): Direction;
}
