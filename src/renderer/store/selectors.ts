import { createSelector } from '@reduxjs/toolkit';
import { store, State } from './store';


const selectHeadlessEnvironmentData = createSelector(
	(state: State) => state,
	(state) => state,
);

export const selectors = {
	selectHeadlessEnvironmentData: () => selectHeadlessEnvironmentData(store.getState()),
};
