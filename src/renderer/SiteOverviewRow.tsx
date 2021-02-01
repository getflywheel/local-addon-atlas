import React from 'react';
import { TableListRow } from '@getflywheel/local-components';

interface Props {
	localUrl: string;
}

const SiteOverviewRow = (props: Props) => {
	const { localUrl } = props;
	return (
		<TableListRow
			label="Node.js host"
			selectable
		>
			<a href={`http://${localUrl}`}>{localUrl}</a>

		</TableListRow>
	);
};

export default SiteOverviewRow;
