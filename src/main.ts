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
import { IPC_EVENTS } from './constants';

export default function (): void {

	LocalMain.registerLightningService(NodeJSService, 'nodejs', '1.0.0');

	LocalMain.addIpcAsyncListener(IPC_EVENTS.OPEN_XTERM, (site: Site) => {
		openTerminal(site);
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

	LocalMain.HooksMain.addAction('siteStarted', (site: Site, processes: LocalMain.Process[]) => {
		connectTerminalOutput(site.id, processes);
	});

	LocalMain.HooksMain.addAction('siteStopped', (site: Site) => {
		deregisterNodeProcess(site.id);
		clearTerminal(site.id);
	});
}
