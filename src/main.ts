import * as LocalMain from '@getflywheel/local/main';

import * as Local from '@getflywheel/local';
import { IPC_EVENTS } from './constants';
// import { Preferences } from './types';
import * as Electron from 'electron';
import { IPC_EVENTS } from './constants';
import NodeJSService from './NodeJSService';

const OPTIONS_GROUP = 'local-headless';
let headlessSelected = false;

export default function (context: { electron: typeof Electron }): void {
	const { electron } = context;
	const { ipcMain } = electron;

	LocalMain.registerLightningService(NodeJSService, 'php', '8.0.0');

	ipcMain.addListener(IPC_EVENTS.HEADLESS_CHECKED , (isChecked) => {
		headlessSelected = isChecked;
	});

	LocalMain.HooksMain.addAction('beforeFinalize', (site) => {
		if (headlessSelected) {
			// Store the current headlessFramework without erasing existing site's options.
			const currentOptions = LocalMain.getServiceContainer().cradle.userData.get(OPTIONS_GROUP);
			LocalMain.getServiceContainer().cradle.userData.set(
				OPTIONS_GROUP,
				{
					...currentOptions,
					[site.id]: {
						headlessFramework: 'atlas',
					},
				},
			);
		}
	});

	LocalMain.HooksMain.addFilter('siteServices', (services) => {
		if (headlessSelected) {
			services.nodejs = {
				version: '1.0.0',
				type: Local.SiteServiceType.LIGHTNING,
				role: Local.SiteServiceRole.OTHER,
			};
		}
	});
}
