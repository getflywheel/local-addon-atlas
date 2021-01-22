import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { createSlice, PayloadAction, current, configureStore } from '@reduxjs/toolkit';
import { addHeadlessEnvironmentData, HeadlessFrameworkTypes } from '../../types';

export { selectors } from './selectors';

export const addHeadlessEnvironmentSlice = createSlice({
	name: 'addHeadlessEnvironment',
	initialState: { HeadlessFrameworkValue: HeadlessFrameworkTypes.NONE, requiresSourceUrl: false } as addHeadlessEnvironmentData,
	reducers: {
		addHeadlessEnvironment: (state, action: PayloadAction<HeadlessFrameworkTypes>) => {
			state.requiresSourceUrl = false;

			state.HeadlessFrameworkValue = action.payload;

			if (action.payload === HeadlessFrameworkTypes.OTHER) {
				state.requiresSourceUrl = true;
			}

			return state;
		},
	},
});

export const actions = {
	...addHeadlessEnvironmentSlice.actions,
};

export const store = configureStore({
	reducer: {
		addHeadlessEnvironment: addHeadlessEnvironmentSlice.reducer,
	},
});

export type State = ReturnType<typeof store.getState>;

export const useStoreSelector = useSelector as TypedUseSelectorHook<State>;
