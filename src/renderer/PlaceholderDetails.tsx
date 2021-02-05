// import React from 'react';
import { Button } from '@getflywheel/local-components';
import * as LocalRenderer from '@getflywheel/local/renderer';
import { IPC_EVENTS } from './../constants';

// interface IProps {
// 	siteInfo: Partial<Local.NewSiteInfo>;
// }

import React, { createRef, useEffect } from 'react';
import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';
import { Site } from '@getflywheel/local';

interface Props {
	xtermOptions?: ITerminalOptions
	ipcChannel: string
}

export const Xterm = (props: Props) => {
	const xtermContainer:React.RefObject<HTMLDivElement> = createRef();

	let term:Terminal;
	let termFitAddon: FitAddon;

	useEffect(() => {
		term = new Terminal();

		termFitAddon = new FitAddon();

		term.loadAddon(termFitAddon);
		term.open(xtermContainer.current!);

		termFitAddon.fit();

		// ipcRenderer.on(props.ipcChannel, (event, data: string) => {
		// 	term.write(data.replace(/\n/g, '\n\r'));
		// });

		return function cleanup() {
			term.dispose();
			termFitAddon.dispose();
		};
	}, [props.ipcChannel]);

	return <div style={{ flex: 1, overflow: 'hidden' }} ref={xtermContainer} />;
};
