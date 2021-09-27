import React, { useState } from 'react';
import { Checkbox, Text } from '@getflywheel/local-components';
import { faustJsDocsUrl } from '../renderer';
import { useObserver } from 'mobx-react';
import { $offline } from '@getflywheel/local/renderer';

type Props = {
	disableButton: (value: boolean) => void;
}

export const HeadlessEnvironmentSelect: React.FC<Props> = (props) => useObserver(() => {
	const [checked, setChecked] = useState(false);

	const { offline } = $offline;

	const onChange = (value: boolean) => {
		setChecked(value);
		props.disableButton(value && offline);
	};

	return (
		<div>
			<div className="FormRow FormRow__Center AtlasCheckboxSelect" style={{ marginTop: 30 }}>
				<div>
					<Checkbox
						name="useAtlasFramework"
						style={{ marginTop: 10 }}
						checked={checked}
						label="Enable Atlas Add-on on this site."
						onChange={(checked) => onChange(checked)}
					/>
					<div className="AtlasTextLink">
						<Text>
							(Site will be built with a Node.js front-end powered <br/>
							by <a href={faustJsDocsUrl} style={{ fontWeight: 'bold' }}>WP Engine's Headless WordPress framework, Faust.js</a>)
						</Text>
					</div>
				</div>
			</div>
		</div>
	);
});
