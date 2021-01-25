import { Provider } from 'react-redux';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import { store } from './renderer/store/store';

export default function (context) {
	const { React, hooks } = context;

	const withStoreProvider = (Component) => (props) => (
		<Provider store={store}>
			<Component {...props} />
		</Provider>
	);

	const NewSiteEnvironmentHOC = withStoreProvider(HeadlessEnvironmentSelect);

	// Create the additional selection option to be displayed during site creation
	hooks.addContent('NewSiteEnvironment_FlySelect', ({ siteInfo }) => <NewSiteEnvironmentHOC siteInfo = { siteInfo } />);
}
