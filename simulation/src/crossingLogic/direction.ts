export enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}

export function translateDirection(directionFromJSON: string): Direction {
	if (directionFromJSON === 'north') return Direction.N;
	if (directionFromJSON === 'east') return Direction.E;
	if (directionFromJSON === 'south') return Direction.S;
	// directionFromJSON === 'west'
	return Direction.W;
}

export default Direction;
