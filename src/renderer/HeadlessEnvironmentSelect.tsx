import React from 'react';
import {
	Checkbox
} from '@getflywheel/local-components';
import { HeadlessFrameworkTypes } from '../types';
import { store, actions, useStoreSelector, selectors } from './store/store';
import * as Local from '@getflywheel/local';

interface IProps {
	siteInfo: Partial<Local.NewSiteInfo>;
}

export const HeadlessEnvironmentSelect = (props: IProps) => {

	console.log(props);

	const state = useStoreSelector(selectors.selectHeadlessEnvironmentData);

	console.log(state);

	return (
		<div className="FormRow FormRow__Third FormRow__Half" style={{ marginTop: 20 }}>
			<Checkbox
				checked={state[props.siteInfo.siteName]}
				label="Use Atlas Framework?"
				onChange={(checked) => store.dispatch(actions.addHeadlessEnvironment({ siteName: props.siteInfo.siteName, isChecked: checked }))}
			/>
		</div>
	);
};
