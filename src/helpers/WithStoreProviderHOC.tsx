import { store } from '../renderer/store/store';
import { Provider } from 'react-redux';

export const withStoreProvider = (Component) => (props) => (
	<Provider store={store}>
		<Component {...props} />
	</Provider>
);
