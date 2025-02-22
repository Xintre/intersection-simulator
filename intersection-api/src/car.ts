import Direction from './direction';

/**
 * Class representing a car.
 */
export default class Car {
	start: Direction;
	destination: Direction;
	roundCt: number;

	constructor(start: Direction, destination: Direction) {
		this.start = start;
		this.destination = destination;
		this.roundCt = 0;
	}
}
