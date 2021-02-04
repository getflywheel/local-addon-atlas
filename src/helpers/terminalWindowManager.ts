import * as LocalMain from '@getflywheel/local/main';
import { terminalIpcChannel } from '../constants';

let terminalWindows: {[key: string]: string} = {};

// @todo-tyler update the type from 'any' to 'child process' here
let childProcesses: {[key: string]: any} = {};

export const registerTerminalChannel = (siteID: string): void => {
	if (terminalWindows[siteID]) {
		return;
	}

	terminalWindows = {
		...terminalWindows,
		[siteID]: terminalIpcChannel(siteID),
	};
};

export const registerNodeProcess = (siteID: string, process: LocalMain.Process): void => {
	if (childProcesses[siteID]) {
		return;
	}

	childProcesses = {
		...childProcesses,
		[siteID]: process.childProcess,
	};
};

export const connectTerminalChannel = (siteID: string, processes: LocalMain.Process[]): void => {

	for (const process of processes) {
		if (process.name === 'nodejs') {
			registerTerminalChannel(siteID);
			registerNodeProcess(siteID, process);
		}
	}

	if (terminalWindows[siteID]) {
		childProcesses[siteID].stdout?.on('data', (data) => {
			LocalMain.sendIPCEvent(terminalWindows[siteID], data.toString());
		});

		childProcesses[siteID].stderr?.on('data', (data) => {
			LocalMain.sendIPCEvent(terminalWindows[siteID], data.toString());
		});
	}
};
