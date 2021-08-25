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
						label="Enable Atlas Add-on on this site."
						onChange={(checked) => setChecked(checked)}
					/>
					<div className="AtlasTextLink">
						<Text>
							(Site will be built with a Node.js front-end powered <br/>
							by <a href={atlasDocsUrl} style={{ fontWeight: 'bold' }}>WP Engine's Headless WordPress framework, Faust.js</a>)
						</Text>
					</div>
				</div>
			</div>
		</div>
	);
};
