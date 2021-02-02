// import React, { createRef, useEffect } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';
import { IPC_EVENTS } from '../../constants';

	const term = new Terminal();

	const termFitAddon = new FitAddon();

	term.loadAddon(termFitAddon);
	term.open(document.getElementById('terminal'));

	termFitAddon.fit();

	ipcRenderer.on(IPC_EVENTS.WRITE_XTERM, (event, data) => {
		term.write(data.replace(/\n/g, '\n\r'));
	});

	// const term = new Terminal();
	// term.open(document.getElementById('terminal'));
	// term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

	// useEffect(() => {




		// return function cleanup() {
		// 	term.dispose();
		// 	termFitAddon.dispose();
		// };
	// }, [ipcChannel]);
