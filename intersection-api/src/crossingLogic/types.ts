import Car from './Car';
import Direction from './direction';
import LightState from './lightState';

export type LightsStateRecord = Record<Direction, LightState>;
export type CarsStore = Record<Direction, Set<Car>>;
