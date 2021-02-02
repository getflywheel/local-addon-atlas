import path from 'path';
import * as LocalMain from '@getflywheel/local/main';
import * as Local from '@getflywheel/local';
import NodeJSService from './NodeJSService';
import { BrowserWindow } from 'electron';
import type { Site } from '@getflywheel/local';

export default function (): void {

	LocalMain.registerLightningService(NodeJSService, 'nodejs', '1.0.0');

	// TODO: We need a way for addons to get the values of fields added to site creation.
	// One option is to modify Local to grab the values of all named inputs during site creation
	// and pass them to the siteAdded hook.
	LocalMain.addIpcAsyncListener(IPC_EVENTS.HEADLESS_CHECKED , (isChecked) => {
		headlessSelected = isChecked;
	});

	LocalMain.addIpcAsyncListener(IPC_EVENTS.OPEN_XTERM , () => {
		const win = new BrowserWindow({
			width: 765,
			height: 408,
		});
		win.loadFile(path.resolve(__dirname, '../src/renderer/_browserWindows/xterm.html'));
	});

	LocalMain.addIpcAsyncListener(IPC_EVENTS.CLICK_XTERM , () => {
		LocalMain.sendIPCEvent(
			IPC_EVENTS.WRITE_XTERM,
			'hahahahah',
		);
	});

	LocalMain.HooksMain.addFilter('defaultSiteServices', (services) => {
		if (headlessSelected) {
			services.nodejs = {
				version: '1.0.0',
				type: Local.SiteServiceType.LIGHTNING,
				role: Local.SiteServiceRole.FRONTEND,
			};
		}

		return services;
	});

	LocalMain.HooksMain.addAction('processStarted', (process) => {
		process.childProcess?.stdout?.on('data', (data) => {
			if (process.name === 'nodejs') {
				LocalMain.sendIPCEvent(IPC_EVENTS.WRITE_XTERM, data.toString());
			}
		});

		process.childProcess?.stderr?.on('data', (data) => {
			if (process.name === 'nodejs') {
				LocalMain.sendIPCEvent(IPC_EVENTS.WRITE_XTERM, data.toString());
			}
		});
	});
}
