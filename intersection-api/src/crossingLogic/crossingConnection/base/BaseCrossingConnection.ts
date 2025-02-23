import { CarsStore, LightsStateRecord } from '../../types';

import Car from '../../Car';
import Config from '../../config';
import Direction from '../../direction';

/**
 * Base class for crossing types that specifies possible light switching patterns.
 */
export default abstract class BaseCrossingConnection {
	protected config: Config;

	constructor() {
		this.config = Config.instance;
	}

	abstract getInitialLightsState(): LightsStateRecord;

	/**
	 * Moves cars around the map according to crossing connection implementation's logic
	 *
	 * @param lightsStateRecord the record of lights state to read
	 * @param carsStore the store of cars on each road
	 *
	 * @return set of cars that exited the crossing this round
	 */
	abstract moveCars(
		lightsStateRecord: LightsStateRecord,
		carsStore: CarsStore
	): Set<Car>;

	/**
	 * Changes intersection lights to green in direction where most cars are waiting.
	 *
	 * @return new lights_state_dict value that should be updated.
	 */
	abstract changeLights(
		lightsStateRecord: LightsStateRecord,
		winningDirection: Direction
	): LightsStateRecord;

	/**
	 * Describes the behavior of this strategy
	 */
	abstract getDescription(): string;
}
