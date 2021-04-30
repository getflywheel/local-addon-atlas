import * as LocalMain from '@getflywheel/local/main';
import { IPC_EVENTS } from '../constants';
import { BrowserWindow } from 'electron';
import path from 'path';
import { Site } from '@getflywheel/local';
import { ChildProcess } from 'child_process';


// stores reference to existing terminal windows by site id
export let terminalWindows: {[key: string]: BrowserWindow} = {};

// stores reference to nodejs process output data by site id
export let terminalOutput: {[key: string]: string[]} = {};

// stores reference to nodejs child process by site id
export let childProcesses: {[key: string]: ChildProcess} = {};

/**
 * Logs all terminal output to string array in the terminalOutput object
 * Will also attempt to send terminal output via ipc event to terminal window if it exists
 * @param {string} siteID arg 1: unique site ID hash
 * @param {string} data arg 2: data to be output to terminal window
 * @returns {void}
 */
export const logTerminalOutputBySiteID = (siteID: string, data: string): void => {
	if (!terminalOutput[siteID]) {
		terminalOutput[siteID] = [];
	}

	if (terminalWindows[siteID]) {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.WRITE_XTERM, data);
	}

	terminalOutput[siteID].push(data);
};

/**
 * Adds BrowserWindow to terminalWindows object by siteID
 * @param {string} siteID: unique site ID hash
 * @param {BrowserWindow} window: electron browser window for xterm
 * @returns {void}
 */
export const registerBrowserWindowBySiteID = (siteID: string, window: BrowserWindow): void => {
	if (terminalWindows[siteID]) {
		return;
	}

	terminalWindows[siteID] = window;
};

/**
 * Deletes browser window from terminalWindows object
 * @param {string} siteID: unique site ID hash
 * @returns {void}
 */
export const deregisterBrowserWindowBySiteID = (siteID: string): void => {
	if (!terminalWindows[siteID]) {
		return;
	}

	delete terminalWindows[siteID];
};

/**
 * Adds node process by site id to childProcesses object
 * @param {string} siteID arg 1: unique site ID hash
 * @param {LocalMain.Process} process arg 2: nodejs site process
 * @returns {void}
 */
export const registerNodeProcess = (siteID: string, process: LocalMain.Process): void => {
	if (childProcesses[siteID]) {
		return;
	}

	childProcesses[siteID] = process.childProcess;
};

/**
 * Deletes node process from childProcesses object
 * @param {string} siteID: unique site ID hash
 * @returns {void}
 */
export const deregisterNodeProcess = (siteID: string): void => {
	if (!childProcesses[siteID]) {
		return;
	}

	delete childProcesses[siteID];
};

/**
 * Creates a new electron window to display xterm component
 * @param {Site} site: Local site that this terminal is being created for
 * @returns {BrowserWindow}: returns an existing window if one exists, or creates and returns a new window
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
			contextIsolation: false,
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

	// resize xterm to fit window on m resize
	terminalWindow.on('will-resize', () => {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.RESIZE_XTERM);
	});

	// resize xterm to fit window on maximize
	terminalWindow.on('maximize', () => {
		terminalWindows[siteID].webContents.send(IPC_EVENTS.RESIZE_XTERM);
	});

	// resize xterm to fit window on unmaximize
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

/**
 * Registers node process
 * Connects node process output to terminalOutput object and terminal window
 * @param {string} siteID: arg 1 unique site ID hash
 * @param {LocalMain.Process[]} processes: arg 2 array of Process objects from Local site
 * @returns {void}
 */
export const connectTerminalOutput = (siteID: string, processes: LocalMain.Process[]): void => {

	for (const process of processes) {
		if (process.name === 'nodejs') {
			registerNodeProcess(siteID, process);
		}
	}

	if (childProcesses[siteID]) {
		childProcesses[siteID].stdout?.on('data', (data) => {
			logTerminalOutputBySiteID(siteID, data.toString());
		});

		childProcesses[siteID].stderr?.on('data', (data) => {
			logTerminalOutputBySiteID(siteID, data.toString());
		});
	}
};

/**
 * Creates and opens new terminal window
 * @param {Site} site: active Local site
 * @returns {void}
 */
export const openTerminal = (site: Site): void => {

	if (!childProcesses[site.id]) {
		return;
	}

	createNewTerminalWindow(site);
};

/**
 * Deletes terminal output from terminalOutput array
 * Clears specified terminal window of all output by siteID
 * @param {string} siteID: unique site ID hash
 * @returns {void}
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
