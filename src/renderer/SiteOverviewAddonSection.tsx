import React from 'react';
import { TableList, TableListRow, TextButton } from '@getflywheel/local-components';
import * as LocalRenderer from '@getflywheel/local/renderer';
import { IPC_EVENTS } from './../constants';
import type { Site } from '@getflywheel/local';

interface Props {
	localUrl: string;
	siteStatus: string;
	site: Site;
}

const showTerminalOutput = (site: Site) => LocalRenderer.ipcAsync(
	IPC_EVENTS.OPEN_XTERM,
	site,
);

const SiteOverview = (props: Props) => {
	const { localUrl, siteStatus, site } = props;

	return (
		<TableList>
			<TableListRow label="Status" selectable>
				<div style={{ flex: 1, display: 'flex', alignContent: 'center' }}>
					<p style={{ textTransform: 'capitalize' }}>{siteStatus}</p>
					<TextButton size="tiny" onClick={() => showTerminalOutput(site)}>
						Show Output
					</TextButton>
				</div>
			</TableListRow>
			<TableListRow
				label="Node.js host"
				selectable
			>
				<a href={`http://${localUrl}`}>{localUrl}</a>

			</TableListRow>
		</TableList>
	);
};

export default SiteOverview;
