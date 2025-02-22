import Direction from '../../direction';
import LightState from '../../lightState';
import { LightsStateRecord } from '../../types';

export let N_S_LIGHTS_GREEN: LightsStateRecord = {
	[Direction.N]: LightState.GREEN,
	[Direction.S]: LightState.GREEN,
	[Direction.E]: LightState.RED,
	[Direction.W]: LightState.RED,
};
export let E_W_LIGHTS_GREEN: LightsStateRecord = {
	[Direction.N]: LightState.RED,
	[Direction.S]: LightState.RED,
	[Direction.E]: LightState.GREEN,
	[Direction.W]: LightState.GREEN,
};
