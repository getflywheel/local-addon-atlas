import * as LocalMain from '@getflywheel/local/main';
import { IPC_EVENTS } from '../constants';
import { BrowserWindow } from 'electron';
import path from 'path';

let terminalWindows: {[key: string]: BrowserWindow} = {};

// @todo-tyler update the type from 'any' to 'child process' here
let childProcesses: {[key: string]: any} = {};

export const registerBrowserWindowBySiteID = (siteID: string, window: BrowserWindow): void => {
	if (terminalWindows[siteID]) {
		return;
	}

	terminalWindows = {
		...terminalWindows,
		[siteID]: window,
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

export const createNewTerminalWindow = () => {
	const terminalWindow = new BrowserWindow({
		acceptFirstMouse: true,
		show: false,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	terminalWindow.webContents.on('will-navigate', (event) => {
		event.preventDefault();
	});

	terminalWindow.webContents.on('new-window', (event) => {
		event.preventDefault();
	});

	terminalWindow.loadFile(path.resolve(__dirname, '../../src/renderer/_browserWindows/xterm.html'));

	return terminalWindow;
};

export const connectTerminalOutput = (siteID: string, processes: LocalMain.Process[]): void => {

	for (const process of processes) {
		if (process.name === 'nodejs') {
			const win = createNewTerminalWindow();
			registerBrowserWindowBySiteID(siteID, win);
			registerNodeProcess(siteID, process);
		}
	}

	if (terminalWindows[siteID]) {

		childProcesses[siteID].stdout?.on('data', (data) => {
			terminalWindows[siteID].webContents.send(IPC_EVENTS.WRITE_XTERM, data.toString());
		});

		childProcesses[siteID].stderr?.on('data', (data) => {
			terminalWindows[siteID].webContents.send(IPC_EVENTS.WRITE_XTERM, data.toString());
		});
	}
};

export const openTerminal = (siteID: string) => {

	if (!terminalWindows[siteID]) {
		return;
	}

	const win = terminalWindows[siteID];

	win.show();
};
