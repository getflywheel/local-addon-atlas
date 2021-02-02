import path from 'path';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import { withStoreProvider } from './helpers/WithStoreProviderHOC';
import { PlaceholderDetails, Xterm } from './renderer/PlaceholderDetails';
import type { Site } from '@getflywheel/local';
import SiteOverviewRow from './renderer/SiteOverviewRow';

const stylesheetPath = path.resolve(__dirname, '../style.css');

const nodeJSSiteOverviewRowHook = (hooks) => {
	const SiteOverviewRowHOC = withStoreProvider(SiteOverviewRow);
	if (global.localhostRouting) {
		hooks.addContent('SiteInfoOverview_TableList', (site: Site) => {
			const hasNodeJSHeadlessSite = site?.services?.nodejs?.ports?.HTTP[0];
			const nodeJSHeadlessLocalUrl = `localhost:${site?.services?.nodejs?.ports?.HTTP[0]}`;

			return (hasNodeJSHeadlessSite && <SiteOverviewRowHOC key={nodeJSHeadlessLocalUrl} localUrl={nodeJSHeadlessLocalUrl} />);
		});
	}
};

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

	const PlaceholderDetailsHOC = withStoreProvider(PlaceholderDetails);

	const XtermHOC = withStoreProvider(Xterm);

	// Create the additional selection option to be displayed during site creation
	hooks.addContent('NewSiteEnvironment_EnvironmentDetails', ({ siteInfo }) => <NewSiteEnvironmentHOC siteInfo={siteInfo} />);

	hooks.addContent('SiteInfoOverview_TableList', () => <PlaceholderDetailsHOC/>);
	hooks.addContent('SiteInfoOverview_TableList', () => <XtermHOC/>);
	nodeJSSiteOverviewRowHook(hooks);
}
