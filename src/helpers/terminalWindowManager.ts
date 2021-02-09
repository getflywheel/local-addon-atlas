import * as LocalMain from '@getflywheel/local/main';
import { IPC_EVENTS } from '../constants';
import { BrowserWindow } from 'electron';
import path from 'path';
import { Site } from '@getflywheel/local';

let terminalWindows: {[key: string]: BrowserWindow} = {};

let terminalOutput: {[key: string]: string[]} = {};

// @todo-tyler update the type from 'any' to 'child process' here
let childProcesses: {[key: string]: any} = {};

/*
 * logs all terminal output to string array in the terminalOutput object
 */
export const logTerminalOutputBySiteID = (siteID: string, data: string): void => {
	if (!terminalOutput[siteID]) {
		terminalOutput = {
			...terminalOutput,
			[siteID]: [],
		};
	}

	if (terminalWindows[siteID]) {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.WRITE_XTERM, data.toString());
	}

	terminalOutput[siteID].push(data.toString());
};

/*
 * adds electron window by site id to terminalWindows object
 */
export const registerBrowserWindowBySiteID = (siteID: string, window: BrowserWindow): void => {
	if (terminalWindows[siteID]) {
		return;
	}

	terminalWindows = {
		...terminalWindows,
		[siteID]: window,
	};
};


/*
 * deletes browser window from terminalWindows object
 */
export const deregisterBrowserWindowBySiteID = (siteID: string): void => {
	if (!terminalWindows[siteID]) {
		return;
	}

	delete terminalWindows[siteID];
};

/*
 * adds node process by site id to childProcesses object
 */
export const registerNodeProcess = (siteID: string, process: LocalMain.Process): void => {
	if (childProcesses[siteID]) {
		return;
	}

	childProcesses = {
		...childProcesses,
		[siteID]: process.childProcess,
	};
};

/*
 * deletes node process from childProcesses object
 */
export const deregisterNodeProcess = (siteID: string): void => {
	if (!childProcesses[siteID]) {
		return;
	}

	delete childProcesses[siteID];
};

/*
 * creates a new electron window to display xterm component
 * returns an existing browser window object if one already exists for the site
 * otherwise creates and returns a new browser window object
 */
export const createNewTerminalWindow = (site: Site): BrowserWindow => {
	const siteID = site.id;
	const siteName = site.name;

	// if window already exists, bring it to focus and return
	if (terminalWindows[siteID]) {
		terminalWindows[siteID].focus();
		return terminalWindows[siteID];
	}

	const terminalWindow = new BrowserWindow({
		acceptFirstMouse: true,
		show: false,
		title: `Local - Atlas - ${siteName}`,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	// save reference to window in terminalWindows object
	registerBrowserWindowBySiteID(siteID, terminalWindow);

	terminalWindow.webContents.on('will-navigate', (event) => {
		event.preventDefault();
	});

	terminalWindow.webContents.on('new-window', (event) => {
		event.preventDefault();
	});

	// wait to show window
	terminalWindow.once('ready-to-show', () => {
		terminalWindow.show();
	});

	// once window is ready, populate with data from terminalOutput
	terminalWindow.once('show', () => {
		terminalOutput[siteID].forEach((element) => {
			terminalWindows[siteID].webContents.send(IPC_EVENTS.WRITE_XTERM, element);
		});
	});

	// resize xterm to fit window
	terminalWindow.on('will-resize', () => {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.RESIZE_XTERM);
	});

	// resize xterm to fit window
	terminalWindow.on('maximize', () => {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.RESIZE_XTERM);
	});

	// resize xterm to fit window
	terminalWindow.on('unmaximize', () => {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.RESIZE_XTERM);
	});

	// delete window reference from terminalWindows object
	terminalWindow.on('close', () => {
		deregisterBrowserWindowBySiteID(siteID);
	});

	terminalWindow.loadFile(path.resolve(__dirname, '../../src/renderer/_browserWindows/xterm.html'));

	return terminalWindow;
};

/*
 *
 * connects terminal window to node process output
 */
export const connectTerminalOutput = (siteID: string, processes: LocalMain.Process[]): void => {

	for (const process of processes) {
		if (process.name === 'nodejs') {
			registerNodeProcess(siteID, process);
		}
	}

	if (childProcesses[siteID]) {
		childProcesses[siteID].stdout?.on('data', (data) => {
			logTerminalOutputBySiteID(siteID, data);
		});

		childProcesses[siteID].stderr?.on('data', (data) => {
			logTerminalOutputBySiteID(siteID, data);
		});
	}
};

/*
 *
 * connects terminal window to node process output
 */
export const openTerminal = (site: Site): void => {

	if (!childProcesses[site.id]) {
		return;
	}

	createNewTerminalWindow(site);
};

/*
 * clears specific terminal window of all output
 */
export const clearTerminal = (siteID: string): void => {
	// clear terminal output array contents
	delete terminalOutput[siteID];

	if (!terminalWindows[siteID]) {
		return;
	}
	// clear xterm window contents
	terminalWindows[siteID].webContents.send(IPC_EVENTS.CLEAR_XTERM);
};
