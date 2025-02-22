import { CarsCounterRecord, LightsStateRecord } from './types';

import Direction from './direction';
import LightState from './lightState';

export const ONE_ROUND_CLOCK_TICKS: number = 3;
export const CAR_PASS_CLOCK_TICKS: number = 2;

export let STARTING_CARS_COUNTER: CarsCounterRecord = {
	[Direction.N]: 0,
	[Direction.E]: 0,
	[Direction.S]: 0,
	[Direction.W]: 0,
};

export let ALL_LIGHTS_YELLOW: LightsStateRecord = {
	[Direction.N]: LightState.YELLOW,
	[Direction.S]: LightState.YELLOW,
	[Direction.E]: LightState.YELLOW,
	[Direction.W]: LightState.YELLOW,
};
