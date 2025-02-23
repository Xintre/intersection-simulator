export default class Config {
	/**
	 * Singleton class that contains all the configuration values for the application.
	 */
	roundCt: number = 0;

	static #instance: Config;

	private constructor() {}

	public static get instance(): Config {
		if (!Config.#instance) {
			Config.#instance = new Config();
		}

		return Config.#instance;
	}
}
