import * as LocalMain from '@getflywheel/local/main';

import * as Local from '@getflywheel/local';
import { IPC_EVENTS } from './constants';
// import { Preferences } from './types';
import * as Electron from 'electron';
import { IPC_EVENTS } from './constants';
import NodeJSService from './NodeJSService';

let headlessSelected = false;

export default function (context: { electron: typeof Electron }): void {
	const { electron } = context;
	const { ipcMain } = electron;

	LocalMain.registerLightningService(NodeJSService, 'php', '8.0.0');

	ipcMain.addListener(IPC_EVENTS.HEADLESS_CHECKED , (isChecked) => {
		headlessSelected = isChecked;
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
