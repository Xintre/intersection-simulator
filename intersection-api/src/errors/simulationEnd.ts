export default class SimulationEnd extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'SimulationEnd';
		Object.setPrototypeOf(this, SimulationEnd.prototype);
	}
}
