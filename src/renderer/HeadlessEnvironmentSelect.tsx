import React from 'react';
import { Checkbox } from '@getflywheel/local-components';
import { store, actions, useStoreSelector, selectors } from './store/store';
import * as Local from '@getflywheel/local';

interface IProps {
	siteInfo: Partial<Local.NewSiteInfo>;
}

export const HeadlessEnvironmentSelect = (props: IProps) => {

	const state = useStoreSelector(selectors.selectHeadlessEnvironmentData);

	return (
		<div className="FormRow FormRow__Half" style={{ marginTop: 20 }}>
			<div>
				<label>Node.JS</label>
				<Checkbox
					style={{ marginTop: 10 }}
					checked={state[props.siteInfo.siteName]}
					label="Use Atlas Framework?"
					onChange={(checked) => store.dispatch(actions.addHeadlessEnvironment({ siteName: props.siteInfo.siteName, isChecked: checked }))}
				/>
			</div>
		</div>
	);
};
