import React from 'react';
import { store, actions, useStoreSelector, selectors } from './store/store';

export const SiteOverviewDisplayTestData = () => {

	const state = useStoreSelector(selectors.selectHeadlessEnvironmentData);

	return (
		<div>
			<p>{state.addHeadlessEnvironment.requiresSourceUrl && 'test'}</p>
			<p>{state.addHeadlessEnvironment.HeadlessFrameworkValue}</p>
		</div>
	);
};
