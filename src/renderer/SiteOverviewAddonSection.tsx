import React from 'react';
import { TableList, TableListRow, TextButton } from '@getflywheel/local-components';

interface Props {
	localUrl: string;
	siteStatus: string;
}

const showTerminalOutput = () => console.log('COMING SOON =)');

const SiteOverview = (props: Props) => {
	const { localUrl, siteStatus } = props;

	return (
		<TableList>
			<TableListRow label="Status" selectable>
				<div style={{ flex: 1, display: 'flex', alignContent: 'center' }}>
					<p style={{ textTransform: 'capitalize' }}>{siteStatus}</p>
					<TextButton size="tiny" onClick={() => showTerminalOutput()}>
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
