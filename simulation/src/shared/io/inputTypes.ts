type CommandBase = {
	type: 'addVehicle' | 'step';
};

export enum JsonDirection {
	N = 'north',
	S = 'south',
	E = 'east',
	W = 'west',
}

export type AddVehicleCommand = CommandBase & {
	type: 'addVehicle';
	vehicleId: string;
	startRoad: JsonDirection;
	endRoad: JsonDirection;
};

export type StepCommand = CommandBase & {
	type: 'step';
};

export type AllCommands = AddVehicleCommand | StepCommand;

export type CommandsInput = { commands: AllCommands[] };
