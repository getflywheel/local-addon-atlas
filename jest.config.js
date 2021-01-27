module.exports = {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['jest-extended'],
	moduleNameMapper: {
		'^@getflywheel/local/renderer': '<rootDir>/src/test/mockLocalRenderer.ts',
	},
	'snapshotSerializers': ['enzyme-to-json/serializer'],
};
