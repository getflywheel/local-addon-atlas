import path from 'path';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import { withStoreProvider } from './helpers/WithStoreProviderHOC';
import { Xterm } from './renderer/PlaceholderDetails';
import type { Site } from '@getflywheel/local';
import SiteOverviewRow from './renderer/SiteOverviewRow';
import { terminalIpcChannel } from './constants';

const stylesheetPath = path.resolve(__dirname, '../style.css');

const nodeJSSiteOverviewRowHook = (hooks) => {
	const SiteOverviewRowHOC = withStoreProvider(SiteOverviewRow);
	if (global.localhostRouting) {
		hooks.addContent('SiteInfoOverview_TableList', (site: Site) => {
			const hasNodeJSHeadlessSite = site?.services?.nodejs?.ports?.HTTP[0];
			const nodeJSHeadlessLocalUrl = `localhost:${site?.services?.nodejs?.ports?.HTTP[0]}`;

			return (hasNodeJSHeadlessSite && <SiteOverviewRowHOC
				key={nodeJSHeadlessLocalUrl}
				localUrl={nodeJSHeadlessLocalUrl}
				site={site}
			/>);
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

	const XtermHOC = withStoreProvider(Xterm);

	// Create the additional selection option to be displayed during site creation
	hooks.addContent('NewSiteEnvironment_EnvironmentDetails', ({ siteInfo }) => <NewSiteEnvironmentHOC siteInfo={siteInfo} />);

	nodeJSSiteOverviewRowHook(hooks);

	// @todo-tyler create a store to hold terminal output
	// create a new slice for each site, set up IPC listener for the store, store output in slice, connect store to React component
	hooks.addContent('SiteInfoOverview_TableList', (site) => <XtermHOC ipcChannel={terminalIpcChannel(site.id)}/>);
}
