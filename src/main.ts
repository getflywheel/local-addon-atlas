import * as LocalMain from '@getflywheel/local/main';
import { IPC_EVENTS } from './constants';
import { Preferences } from './types';
import * as Electron from 'electron';


export default function (context: { electron: typeof Electron }): void {
	const { electron } = context;
	const { ipcMain } = electron;

	// LocalMain.HooksMain.addAction('siteDeleted', (siteID: string) => {
	// 	deleteSiteData(siteID);

	// 	LocalMain.sendIPCEvent(
	// 		IPC_EVENTS.SITE_DELETED,
	// 		siteID,
	// 	);
	// });

	/**
	 * Scan a site for images and return the list of all images found
	 */
	// ipcMain.on(
	// 	IPC_EVENTS.SCAN_FOR_IMAGES,
	// 	async (_, siteID: string) => scanImages(siteID),
	// );


}
