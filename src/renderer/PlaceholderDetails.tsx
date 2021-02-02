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

interface Props {
	xtermOptions: ITerminalOptions
	ipcChannel: string
}

export const Xterm = () => {
	const xtermContainer:React.RefObject<HTMLDivElement> = createRef();

	let term:Terminal;
	let termFitAddon: FitAddon;

	useEffect(() => {
		term = new Terminal();

		termFitAddon = new FitAddon();

		term.loadAddon(termFitAddon);
		term.open(xtermContainer.current!);

		termFitAddon.fit();

		ipcRenderer.on(IPC_EVENTS.WRITE_XTERM, (event, data: string) => {
			term.write(data.replace(/\n/g, '\n\r'));
		});

		return function cleanup() {
			term.dispose();
			termFitAddon.dispose();
		};
	}, [IPC_EVENTS.WRITE_XTERM]);

	return <div style={{ flex: 1, overflow: 'hidden' }} ref={xtermContainer} />;
};

export const PlaceholderDetails = () => {

	//const state = useStoreSelector(selectors.selectHeadlessEnvironmentData);

	return (
		<div>
			<Button onClick={() => LocalRenderer.ipcAsync(IPC_EVENTS.OPEN_XTERM)}>
				Details
			</Button>
			<Button onClick={() => LocalRenderer.ipcAsync(IPC_EVENTS.CLICK_XTERM)}>
				Test Click
			</Button>


		</div>
	);
};
