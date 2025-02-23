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

type AllCommands = AddVehicleCommand | StepCommand;

export type CommandsSeries = Array<AllCommands>;
