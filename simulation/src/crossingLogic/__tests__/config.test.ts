import Config from '../config';

describe('Config', () => {
	it('instance() returns the singleton instance', () => {
		expect(Config.instance).toBe(Config.instance);
	});
});
