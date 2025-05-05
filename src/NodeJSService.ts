import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import { IPC_EVENTS, ANALYTIC_EVENTS, headlessDirectoryName } from './constants';
import * as LocalMain from '@getflywheel/local/main';
import { IProcessOpts } from '@getflywheel/local';


const { execFilePromise, getServiceContainer } = LocalMain;

const serviceContainer = getServiceContainer();

const resourcesPath = path.resolve(__dirname, '..');
const nodeModulesPath = path.resolve(resourcesPath, 'node_modules');

export default class LightningServiceNodeJS extends LocalMain.LightningService {
	readonly serviceName: string = 'nodejs';

	readonly binVersion: string = '1.0.0';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	get requiredPorts () {
		return {
			HTTP: 1,
		};
	}

	get appNodePath (): string {
		return path.join(this._site.longPath, headlessDirectoryName);
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	get bins () {
		return {
			[LocalMain.LightningServicePlatform.Darwin]: {
				electron: process.execPath,
			},
			[LocalMain.LightningServicePlatform.Win32]: {
				electron: process.execPath,
			},
			[LocalMain.LightningServicePlatform.Linux]: {
				electron: process.execPath,
			},
		};
	}

	get electronifiedPATH (): string {
		const PATH = process.env.PATH!.split(path.delimiter);
		PATH.unshift(path.join(resourcesPath, 'electron-node'));
		return PATH.join(path.delimiter);
	}

	get defaultEnv () {
		return {
			LOCAL_ELECTRON_PATH: this.bin!.electron,
			ELECTRON_RUN_AS_NODE: '1',
			PATH: this.electronifiedPATH,
			NPM_PATH: path.join(nodeModulesPath, 'npm', 'bin', 'npm-cli.js'),
			NPM_CONFIG_PREFIX: resourcesPath,
		};
	}

	/**
	 * @todo show stdout/stderr to user
	 */
	async preprovision (): Promise<void> {
		const { errorHandler } = getServiceContainer().cradle;
		const appNodeExists = await fs.pathExists(path.resolve(this._site.longPath, headlessDirectoryName));

		LocalMain.sendIPCEvent('updateSiteMessage', this._site.id, 'Installing Faust.js');

		try {
			if (appNodeExists) {
				// node_modules are excluded from exports so install them on import.
				await execFilePromise(this.bin!.electron, [
					path.resolve(nodeModulesPath, 'npm', 'bin', 'npm-cli.js'),
					'install',
				], {
					cwd: path.join(this._site.longPath, headlessDirectoryName),
					env: this.defaultEnv,
				});

				const envFilePath = path.join(this.appNodePath, '.env.local');
				if (fs.existsSync(envFilePath)) {
					// we need to update the NEXT_PUBLIC_WORDPRESS_URL and set it to the new sites backendurl
					const envFileContent = fs.readFileSync(envFilePath).toString();
					const updatedEnvFileContent = envFileContent.replace(
						/^NEXT_PUBLIC_WORDPRESS_URL=(.*)/,
						`NEXT_PUBLIC_WORDPRESS_URL=${this._site.backendUrl}`,
					);
					fs.writeFileSync(envFilePath, updatedEnvFileContent);
				}
			} else {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const headlessUrl = this._site?.customOptions?.headlessUrl ?? 'https://github.com/wpengine/faustjs/tree/main/examples/next/faustwp-getting-started';

				await execFilePromise(this.bin!.electron, [
					path.resolve(nodeModulesPath, 'npm', 'bin', 'npx-cli.js'),
					'create-next-app',
					'--example',
					`${headlessUrl}`,
					'--use-npm',
					headlessDirectoryName,
				], {
					cwd: this._site.longPath,
					env: this.defaultEnv,
				});
			}

			if (os.platform() === 'win32') {
				const babelrc = `{"presets":["next/babel"]}`;

				await fs.writeFile(path.join(this.appNodePath, '.babelrc'), babelrc);
			}
		} catch (e) {
			// Report the error to the user, the Local log, and Sentry.
			errorHandler.handleError({
				error: e,
				message: 'error encountered during preprovision step',
				dialogTitle: 'Uh-oh! Local ran into an error.',
				dialogMessage: e.toString(),
			});

			// Halt provisioning and cleanup.
			throw new Error('error encountered during preprovision step');
		}
	}

	async finalizeNewSite (): Promise<void> {
		const { wpCli, siteDatabase, errorHandler } = serviceContainer.cradle;
		const { additionalPlugins = [], installCommand = '' } = this._site.customOptions;
		const requiredPlugins = [
			'faustwp',
			'wp-graphql',
			...additionalPlugins,
		];

		try {
			// eslint-disable-next-line default-case
			await siteDatabase.waitForDB(this._site);

			LocalMain.sendIPCEvent('updateSiteMessage', this._site.id, 'Installing WordPress plugins');

			for (const plugin of requiredPlugins) {
				await wpCli.run(this._site, ['plugin', 'install', '--activate', plugin]);
			}

			await this.configureFaust();

			if (installCommand) {
				const exit = os.platform() === 'win32' ? ' & exit' : '; exit';
				const customShellEntry = `${installCommand}${exit}`;

				LocalMain.sendIPCEvent('siteShellEntry:launch', this._site, customShellEntry);
			}
		} catch (e) {
			// Report the error to the user, the Local log, and Sentry.
			errorHandler.handleError({
				error: e,
				message: 'error encountered during finalizeNewSite step',
				dialogTitle: 'Uh-oh! Local ran into an error.',
				dialogMessage: e.toString(),
			});

			// Halt provisioning and cleanup.
			throw new Error('error encountered during finalizeNewSite step');
		}

		LocalMain.sendIPCEvent(IPC_EVENTS.TRACK_EVENT, ANALYTIC_EVENTS.SITE_PROVISIONED);
	}

	async configureFaust (): Promise<void> {
		const { wpCli, siteProcessManager } = serviceContainer.cradle;

		LocalMain.sendIPCEvent('updateSiteMessage', this._site.id, 'Configuring WordPress for Faust.js');

		// Fetch the secret key generated by the FaustWP plugin on activation.
		const faustWPsettings = await wpCli.run(this._site, [
			'option',
			'get',
			'faustwp_settings',
			'--format=json',
		]);

		// eslint-disable-next-line camelcase
		const parsedFaustWPsettings: { secret_key: string } = JSON.parse(faustWPsettings);
		const { secret_key: secretKey } = parsedFaustWPsettings;

		// Set the frontend_uri setting to the frontend service URL (this service).
		// This is required for post previewing to work in WordPress.
		await wpCli.run(this._site, [
			'option',
			'update',
			'faustwp_settings',
			// eslint-disable-next-line camelcase
			JSON.stringify({ ...parsedFaustWPsettings, frontend_uri: this._site.frontendUrl }),
			'--format=json', // Tell WordPress to serialize the JSON.
		]);

		// Write the required settings for the headless framework to `.env.local`.
		const environmentFile = `NEXT_PUBLIC_WORDPRESS_URL=${this._site.backendUrl}
# Plugin secret found in WordPress Settings->Headless
FAUST_SECRET_KEY=${secretKey}
`;
		await fs.writeFile(path.join(this.appNodePath, '.env.local'), environmentFile);

		// Next.js needs to be restarted after writing the env file.
		await siteProcessManager.restart(this._site);
	}

	get devEnvVars () {
		return {
			PORT: this.port!.toString(),
			WORDPRESS_URL: this._site.backendUrl,
			WORDPRESS_API_URL: `${this._site.backendUrl}/graphql`,
			/**
			 *  Do not prompt users for Faust Telemetry when running `npm run dev`
			 */
			FAUST_NO_INTERACTION: 'true',
		};
	}

	start (): IProcessOpts[] {
		return [
			{
				name: 'nodejs',
				binPath: path.resolve(nodeModulesPath, 'npm', 'bin', 'npm-cli.js'),
				args: ['run', 'dev'],
				cwd: path.join(this._site.longPath, headlessDirectoryName),
				env: {
					...this.defaultEnv,
					...this.devEnvVars,
				},
			},
		];
	}
}
