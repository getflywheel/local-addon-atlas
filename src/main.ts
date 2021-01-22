import * as LocalMain from '@getflywheel/local/main';
import { IPC_EVENTS } from './constants';
// import { Preferences } from './types';
import * as Electron from 'electron';


export default function (context: { electron: typeof Electron }): void {
	const { electron } = context;
	const { ipcMain } = electron;

}
