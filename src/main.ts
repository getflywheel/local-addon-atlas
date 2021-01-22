import * as LocalMain from '@getflywheel/local/main';
import * as Electron from 'electron';
import { IPC_EVENTS } from './constants';
import NodeJSService from './NodeJSService';


export default function (context: { electron: typeof Electron }): void {
	const { electron } = context;
	const { ipcMain } = electron;

	LocalMain.registerLightningService(NodeJSService, 'php', '8.0.0');
}
