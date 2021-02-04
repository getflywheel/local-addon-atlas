import React from 'react';
import { Checkbox, Text } from '@getflywheel/local-components';
import { store, actions, useStoreSelector, selectors } from './store/store';
import * as Local from '@getflywheel/local';

interface IProps {
	siteInfo: Partial<Local.NewSiteInfo>;
}

export const HeadlessEnvironmentSelect = (props: IProps) => {

	const state = useStoreSelector(selectors.selectHeadlessEnvironmentData);

	return (
		<div>
			<div className="FormRow FormRow__Center AtlasCheckboxSelect" style={{ marginTop: 30 }}>
				<div>
					<Checkbox
						name="useAtlasFramework"
						style={{ marginTop: 10 }}
						checked={state[props.siteInfo.siteName]}
						label="Enable Node.js frontend powered by WP Engine Atlas Framework"
						onChange={(checked) => store.dispatch(actions.addHeadlessEnvironment({ siteName: props.siteInfo.siteName, isChecked: checked }))}
					/>
					<Text className="AtlasTextLink">(Use Atlas Add-on to create a <a href="#">Headless WordPress</a> site.)</Text>
				</div>
			</div>
		</div>
	);
};
