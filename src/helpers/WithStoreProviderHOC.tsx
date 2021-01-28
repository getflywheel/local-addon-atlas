import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../renderer/store/store';

export const withStoreProvider = (Component) => (props) => (
	<Provider store={store}>
		<Component {...props} />
	</Provider>
);
