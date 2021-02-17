import React, { useState } from 'react';
import { Checkbox, Text } from '@getflywheel/local-components';
import { atlasDocsUrl } from '../renderer';


export const HeadlessEnvironmentSelect = () => {

	const [checked, setChecked] = useState();

	return (
		<div>
			<div className="FormRow FormRow__Center AtlasCheckboxSelect" style={{ marginTop: 30 }}>
				<div>
					<Checkbox
						name="useAtlasFramework"
						style={{ marginTop: 10 }}
						checked={checked}
						label="Enable Node.js frontend powered by WP Engine Atlas Framework"
						onChange={(checked) => setChecked(checked)}
					/>
					<Text className="AtlasTextLink">(Use Atlas Add-on to create a <a href={atlasDocsUrl}>Headless WordPress</a> site.)</Text>
				</div>
			</div>
		</div>
	);
};
