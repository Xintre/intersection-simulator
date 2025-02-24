type CommandBase = {
	type: 'addVehicle' | 'step';
};

export type AddVehicleCommand = CommandBase & {
	type: 'addVehicle';
	vehicleId: string;
	startRoad: string;
	endRoad: string;
};

export type StepCommand = CommandBase & {
	type: 'step';
};

export type AllCommands = AddVehicleCommand | StepCommand;

export type CommandsInput = { commands: AllCommands[] };
