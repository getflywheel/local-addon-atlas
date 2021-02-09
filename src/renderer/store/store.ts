import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { SiteEnvironmentData } from '../../types';

export { selectors } from './selectors';

export const addHeadlessEnvironmentSlice = createSlice({
	name: 'addHeadlessEnvironment',
	initialState: {} as SiteEnvironmentData,
	reducers: {
		addHeadlessEnvironment: (state, action: PayloadAction<{siteName: string, isChecked: boolean}>) => {
			const { isChecked, siteName } = action.payload;
			state[siteName] = isChecked;
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
