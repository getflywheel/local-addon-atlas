import { createSelector } from '@reduxjs/toolkit';
import { store, State } from './store';


const selectHeadlessEnvironmentData = createSelector(
	(state: State) => state,
	(state) => state.addHeadlessEnvironment,
);

export const selectors = {
	selectHeadlessEnvironmentData: () => selectHeadlessEnvironmentData(store.getState()),
};
