import Direction from './direction';

/**
 * Class representing a car.
 */
export default class Car {
	carID: string;
	start: Direction;
	destination: Direction;
	roundCt: number;

	constructor(carID: string, start: Direction, destination: Direction) {
		this.carID = carID;
		this.start = start;
		this.destination = destination;
		this.roundCt = 0;
	}
}
