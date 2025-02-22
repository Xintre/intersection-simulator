import { CarsCounterRecord, LightsStateRecord } from '../../types';

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
	abstract moveCars(
		lightsStateRecord: LightsStateRecord,
		carsCounterRecord: CarsCounterRecord
	): void;
	/**
     * Changes intersection lights to green in direction where most cars are waiting.
        Returns new lights_state_dict value that should be updated.
     */
	abstract changeLights(
		lightsStateRecord: LightsStateRecord,
		winningDirection: Direction
	): LightsStateRecord;
}
