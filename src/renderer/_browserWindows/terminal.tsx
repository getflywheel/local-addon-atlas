import React, { createRef, useEffect } from 'react';
import { render } from 'react-dom';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';
import { IPC_EVENTS } from '../../constants';

export const Xterm = () => {
	const xtermContainer:React.RefObject<HTMLDivElement> = createRef();

	useEffect(() => {
		const term = new Terminal();

		const termFitAddon = new FitAddon();

		term.loadAddon(termFitAddon);
		term.open(xtermContainer.current);
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

		return function cleanup () {
			term.dispose();
			termFitAddon.dispose();
		};
	},[IPC_EVENTS.WRITE_XTERM, IPC_EVENTS.CLEAR_XTERM, IPC_EVENTS.RESIZE_XTERM]);

	return <div id='xtermComponent' ref={xtermContainer} />;
};

render(
	<Xterm />,
	document.getElementById('terminal'),
);
