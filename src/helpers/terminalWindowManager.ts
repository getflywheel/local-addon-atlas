import * as LocalMain from '@getflywheel/local/main';
import { terminalIpcChannel } from '../constants';

let terminalWindows: {[key: string]: string} = {};

export const registerTerminalChannel = (siteID: string): void => {
	if (terminalWindows[siteID]) {
		return;
	}

	terminalWindows = {
		...terminalWindows,
		[siteID]: terminalIpcChannel(siteID),
	};
};

export const connectTerminalChannel = (siteID: string, processes: LocalMain.Process[]): void => {
	// @todo-tyler create an object of childProcesses and register/deregister like the IPC channels.
	let childProcess;

	for (const process of processes) {
		if (process.name === 'nodejs') {
			registerTerminalChannel(siteID);
			childProcess = process.childProcess;
		}
	}

	if (terminalWindows[siteID]) {
		childProcess.stdout?.on('data', (data) => {
			LocalMain.sendIPCEvent(terminalWindows[siteID], data.toString());
		});

		childProcess.stderr?.on('data', (data) => {
			LocalMain.sendIPCEvent(terminalWindows[siteID], data.toString());
		});
	}
};
