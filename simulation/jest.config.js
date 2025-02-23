/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
	roots: ['<rootDir>/src'],
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[tj]s?(x)',
	],
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,tsx,jsx}'],
	coverageReporters: ['html', 'json', 'text-summary'],
};
