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

		if (!ipcRenderer.listenerCount(IPC_EVENTS.WRITE_XTERM)) {
			ipcRenderer.on(IPC_EVENTS.WRITE_XTERM, (event, data: string) => {
				term.write(data.replace(/\n/g, '\n\r'));
			});
		}
	},[IPC_EVENTS.WRITE_XTERM]);

	return <div ref={xtermContainer} />;
};

render(
	<Xterm />,
	document.getElementById('terminal'),
);
