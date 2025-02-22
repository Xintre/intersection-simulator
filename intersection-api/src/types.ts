import Car from './car';
import Direction from './direction';
import LightState from './lightState';

export type LightsStateRecord = Record<Direction, LightState>;
export type CarsCounterRecord = Record<Direction, number>;
