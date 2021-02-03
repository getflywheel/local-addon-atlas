import * as LocalMain from '@getflywheel/local/main';

export let terminalWindows: {[key: string]: string} = {};

export const registerTerminalChannel = (siteID: string): void => {
	if (terminalWindows[siteID]) {
		return;
	}

	terminalWindows = {
		...terminalWindows,
		[siteID]: `ipc_event_headless:${siteID}`,
	};
};

export const connectTerminalChannel = (siteID: string, processes: LocalMain.Process[]): void => {
	let childProcess;

	for (const process of processes) {
		if (process.name === 'nodejs') {
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
