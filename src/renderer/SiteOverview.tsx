import React from 'react';
import { TableListRow, TextButton } from '@getflywheel/local-components';
import { SITE_STATUS } from '../constants';

interface Props {
	localUrl: string;
	siteStatus: string;
}

const getSiteStatus = siteStatus => {
	const STATUS = {
		STOPPING: 'Stopping',
		STOPPED: 'Stopped',
		STARTING: 'Starting',
		STARTED: 'Started',
	};

	switch (siteStatus) {
		case SITE_STATUS.STOPPING:
			return STATUS.STOPPING;
		case SITE_STATUS.HALTED:
			return STATUS.STOPPED;
		case SITE_STATUS.RUNNING:
			return STATUS.STARTED;
		case SITE_STATUS.STARTING:
			return STATUS.STARTING;
		default:
			return STATUS.STOPPED;
	}
};

const showTerminalOutput = () => console.log('COMING SOON =)');


const SiteOverview = (props: Props) => {
	const { localUrl, siteStatus } = props;

	return (
		<>
			<TableListRow label="Status" selectable>
				<div style={{ flex: 1, display: 'flex', alignContent: 'center' }}>
					<p>{getSiteStatus(siteStatus)}</p>
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
		</>
	);
};

export default SiteOverview;
