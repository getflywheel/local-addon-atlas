import * as LocalMain from '@getflywheel/local/main';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

const { name, version } = packageJson;

const serviceContainer = LocalMain.getServiceContainer();
const { localLogger } = serviceContainer.cradle;

const logger = localLogger.child({
	addon: {
		name,
		version,
	},
});

export default logger;
