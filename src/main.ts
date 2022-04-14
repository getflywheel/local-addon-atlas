import * as LocalMain from '@getflywheel/local/main';
import * as Local from '@getflywheel/local';
import NodeJSService from './NodeJSService';
import {
	connectTerminalOutput,
	openTerminal,
	deregisterNodeProcess,
	clearTerminal,
} from './helpers/terminalWindowManager';
import type { Site } from '@getflywheel/local';
import { IPC_EVENTS, ANALYTIC_EVENTS, headlessDirectoryName } from './constants';

const serviceContainer = LocalMain.getServiceContainer();

export default function (): void {
	LocalMain.registerLightningService(NodeJSService, 'nodejs', '1.0.0');

	LocalMain.addIpcAsyncListener(IPC_EVENTS.OPEN_XTERM, (site: Site) => {
		openTerminal(site);

		LocalMain.sendIPCEvent(IPC_EVENTS.TRACK_EVENT, ANALYTIC_EVENTS.OPEN_XTERM);
	});

	LocalMain.HooksMain.addFilter('defaultSiteServices', (services, siteSettings) => {
		if (siteSettings?.customOptions?.useAtlasFramework === 'on') {
			services.nodejs = {
				version: '1.0.0',
				type: Local.SiteServiceType.LIGHTNING,
				role: Local.SiteServiceRole.FRONTEND,
			};
		}

		return services;
	});

	LocalMain.HooksMain.addFilter(
		'modifyAddSiteObjectBeforeCreation',
		(site: Site, newSiteInfo) => {
			if (newSiteInfo?.customOptions?.useAtlasFramework === 'on') {
				site.customOptions = { ...newSiteInfo.customOptions };
			}
		},
	);

	LocalMain.HooksMain.addFilter('importSiteManifest', (manifest: LocalMain.IImportSiteSettings, site: Site) => {
		const modifiedManifest = { ...manifest };

		if (site.getSiteServiceByRole(Local.SiteServiceRole.FRONTEND)) {
			modifiedManifest.customOptions.useAtlasFramework = 'on';
		}

		return modifiedManifest;
	});

	LocalMain.HooksMain.addFilter('exportSiteFileFilter', (allowFile, file, pathInArchive) => {
		// exclude node modules from being exported on headless sites
		if (pathInArchive.indexOf(`/${headlessDirectoryName}/node_modules`) === 0) {
			allowFile = false;
		}

		return allowFile;
	});

	LocalMain.HooksMain.addAction('importSiteChangeDomain', async (site: Site) => {
		const { wpCli, localLogger } = serviceContainer.cradle;

		if (site.getSiteServiceByRole(Local.SiteServiceRole.FRONTEND)) {
			try {
				const faustWPsettings = await wpCli.run(site, [
					'option',
					'get',
					'faustwp_settings',
					'--format=json',
				]);

				const parsedFaustWPsettings = JSON.parse(faustWPsettings);

				if (parsedFaustWPsettings.frontend_uri !== site.frontendUrl) {
					// update the frontend_uri to match the new site frontendUrl
					await wpCli.run(site, [
						'option',
						'update',
						'faustwp_settings',
						// eslint-disable-next-line camelcase
						JSON.stringify({ ...parsedFaustWPsettings, frontend_uri: site.frontendUrl }),
						'--format=json', // Tell WordPress to seralize the JSON.
					]);
				}
			} catch (error) {
				localLogger.error(`Atlas addon: importSiteChangeDomain hook: ${error.message}`);
			}
		}

		return null;
	});

	LocalMain.HooksMain.addAction('siteStarted', (site: Site, processes: LocalMain.Process[]) => {
		connectTerminalOutput(site.id, processes);
	});

	LocalMain.HooksMain.addAction('siteStopped', (site: Site) => {
		deregisterNodeProcess(site.id);
		clearTerminal(site.id);
	});
}
