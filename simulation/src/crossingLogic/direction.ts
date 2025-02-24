import { IO } from '../shared';

export enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}

export function translateDirection(
	directionFromJSON: IO.JsonDirection
): Direction {
	switch (directionFromJSON) {
		case 'north':
			return Direction.N;

		case 'east':
			return Direction.E;

		case 'south':
			return Direction.S;

		case 'west':
			return Direction.W;

		default:
			throw new Error('Invalid direction: ' + directionFromJSON);
	}
}

export default Direction;
