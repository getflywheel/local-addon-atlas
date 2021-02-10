import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';
import { IPC_EVENTS } from '../../constants';
import os from 'os';

const term = new Terminal();

const termFitAddon = new FitAddon();

term.loadAddon(termFitAddon);
term.open(document.getElementById('terminal'));
termFitAddon.fit();

// listener for incoming data
if (!ipcRenderer.listenerCount(IPC_EVENTS.WRITE_XTERM)) {
	ipcRenderer.on(IPC_EVENTS.WRITE_XTERM, (event, data: string) => {
		term.write(data.replace(/\n/g, '\n\r'));
	});
}

// listener for clear terminal event
if (!ipcRenderer.listenerCount(IPC_EVENTS.CLEAR_XTERM)) {
	ipcRenderer.on(IPC_EVENTS.CLEAR_XTERM, () => {
		term.clear();
	});
}

// listener for resize event
if (!ipcRenderer.listenerCount(IPC_EVENTS.RESIZE_XTERM)) {
	ipcRenderer.on(IPC_EVENTS.RESIZE_XTERM, () => {
		termFitAddon.fit();
	});
}
