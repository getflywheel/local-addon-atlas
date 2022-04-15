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

	get requiredPorts () {
		return {
			HTTP: 1,
		};
	}

	get appNodePath (): string {
		return path.join(this._site.longPath, headlessDirectoryName);
	}

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
				const atlasUrl = this._site?.customOptions?.atlasUrl ?? 'https://github.com/wpengine/faustjs/tree/main/examples/next/getting-started';

				await execFilePromise(this.bin!.electron, [
					path.resolve(nodeModulesPath, 'npm', 'bin', 'npx-cli.js'),
					'create-next-app',
					'--example',
					`${atlasUrl}`,
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

			/**
			 * @todo Next.js doesn't support an env var for the start port. This is a termpoary hack around it.
			 *
			 * @see https://github.com/vercel/next.js/issues/10338
			 */
			await LocalMain.replaceInFileAsync(path.join(this.appNodePath, 'package.json'), [
				['"dev": "next dev",', '"dev": "next dev -p $PORT",'],
			]);
		} catch (e) {
			// Report the error to the user, the Local log, and Sentry.
			errorHandler.handleError({
				error: e,
				message: 'error encounted during preprovision step',
				dialogTitle: 'Uh-oh! Local ran into an error.',
				dialogMessage: e.toString(),
			});

			// Halt provisioning and cleanup.
			throw new Error('error encounted during preprovision step');
		}
	}

	async finalizeNewSite (): Promise<void> {
		LocalMain.sendIPCEvent('updateSiteMessage', this._site.id, 'Installing headless WordPress plugins');
		const { wpCli, siteDatabase, siteProcessManager, errorHandler } = serviceContainer.cradle;

		try {
			// eslint-disable-next-line default-case
			await siteDatabase.waitForDB(this._site);

			// Add GraphQL server to WordPress.
			await wpCli.run(this._site, [
				'plugin',
				'install',
				'wp-graphql',
				'--activate',
			]);

			// Add the FaustWP plugin.
			await wpCli.run(this._site, [
				'plugin',
				'install',
				'faustwp',
				'--activate',
			]);

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (this._site.customOptions.atlasUrl) {
				// Add the atlas-content-modeler plugin.
				await wpCli.run(this._site, [
					'plugin',
					'install',
					'atlas-content-modeler',
					'--activate',
				]);
			}

			// Fetch the secret key generated by the FaustWP plugin on activation.
			const faustWPsettings = await wpCli.run(this._site, [
				'option',
				'get',
				'faustwp_settings',
				'--format=json',
			]);

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (this._site.customOptions.atlasUrl) {
				// Add the atlas-search plugin.
				await wpCli.run(this._site, [
					'plugin',
					'install',
					'atlas-search',
					'--activate',
				]);
			}

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
				'--format=json', // Tell WordPress to seralize the JSON.
			]);

			// Write the required settings for the headless framework to `.env.local`.
			const environmentFile = `NEXT_PUBLIC_WORDPRESS_URL=${this._site.backendUrl}
# Plugin secret found in WordPress Settings->Headless
FAUSTWP_SECRET_KEY=${secretKey}
`;
			await fs.writeFile(path.join(this.appNodePath, '.env.local'), environmentFile);

			// Next.js needs to be restarted after writing the env file.
			await siteProcessManager.restart(this._site);

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (this._site.customOptions.atlasUrl) {
				const rawZipUrl = '/raw/main/acm-blueprint.zip';
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const cmd = `wp acm blueprint import ${this._site.customOptions.atlasUrl}${rawZipUrl}`;
				const exit = os.platform() === 'win32' ? ' & exit' : '; exit';
				const customShellEntry = `${cmd}${exit}`;

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

	get devEnvVars () {
		return {
			PORT: this.port!.toString(),
			WORDPRESS_URL: this._site.backendUrl,
			WORDPRESS_API_URL: `${this._site.backendUrl}/graphql`,
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
