import React from 'react';
import {
	FlySelect,
	BasicInput,
} from '@getflywheel/local-components';
import { HeadlessFrameworkTypes } from '../types';
import { store, actions, useStoreSelector, selectors } from './store/store';

export const HeadlessEnvironmentSelect = () => {

	const state = useStoreSelector(selectors.selectHeadlessEnvironmentData);

	return (
		<div className="FormRow FormRow__Half" style={{ marginTop: 20 }}>
			<div className="FormField" style={{ height: 99 }}>
				<label>Headless Framework</label>
				<FlySelect
					placeholder="Select Headless Framework"
					value={state.addHeadlessEnvironment.HeadlessFrameworkValue}
					options={{
						[HeadlessFrameworkTypes.NONE]: 'None',
						[HeadlessFrameworkTypes.ATLAS]: 'Atlas (Next.js)',
						[HeadlessFrameworkTypes.OTHER]: 'Bring your own',
					}}
					onChange={(value) => store.dispatch(actions.addHeadlessEnvironment(value))}
				/>
			</div>

			{state.addHeadlessEnvironment.requiresSourceUrl &&
			<div className="FormField">
				<label>Framework Source URL</label>
				<BasicInput />
			</div>
			}

		</div>
	);
};
