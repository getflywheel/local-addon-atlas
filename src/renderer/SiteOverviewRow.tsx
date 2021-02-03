import React from 'react';
import { TableListRow, TextButton } from '@getflywheel/local-components';
import * as LocalRenderer from '@getflywheel/local/renderer';
import { IPC_EVENTS } from './../constants';
import type { Site } from '@getflywheel/local';

interface Props {
	localUrl: string;
	site: Site;
}

const SiteOverviewRow = (props: Props) => {
	const { localUrl, site } = props;
	return (
		<TableListRow
			label="Node.js host"
			selectable
		>
			<a href={`http://${localUrl}`}>{localUrl}</a>
			<TextButton size="tiny" onClick={() => LocalRenderer.ipcAsync(
				IPC_EVENTS.OPEN_XTERM,
				site,
			)}>
				Show Output
			</TextButton>
		</TableListRow>
	);
};

export default SiteOverviewRow;
