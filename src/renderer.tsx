import path from 'path';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import { withStoreProvider } from './helpers/WithStoreProviderHOC';

const stylesheetPath = path.resolve(__dirname, '../style.css');

export default function (context) {
	const { React, hooks } = context;

	hooks.addContent('stylesheets', () => (
		<link
			rel="stylesheet"
			key="localAtlas-addon-stylesheet"
			href={stylesheetPath}
		/>
	));

	const NewSiteEnvironmentHOC = withStoreProvider(HeadlessEnvironmentSelect);

	// Create the additional selection option to be displayed during site creation
	hooks.addContent('NewSiteEnvironment_ EnvironmentDetails', ({ siteInfo }) => <NewSiteEnvironmentHOC siteInfo = { siteInfo } />);
}
