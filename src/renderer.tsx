import path from 'path';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import { withStoreProvider } from './helpers/WithStoreProviderHOC';
import SiteOverviewRow from './renderer/SiteOverview';
import type { Site } from '@getflywheel/local';
const stylesheetPath = path.resolve(__dirname, '../style.css');

const nodeJSSiteOverviewRowHook = (hooks) => {
	const SiteOverviewHOC = withStoreProvider(SiteOverviewRow);
	if (global.localhostRouting) {
		hooks.addContent('SiteInfoOverview_TableList', (site: Site, siteStatus: string) => {
			const hasNodeJSHeadlessSite = site?.services?.nodejs?.ports?.NODEJS[0];
			const nodeJSHeadlessLocalUrl = `localhost:${site?.services?.nodejs?.ports?.NODEJS[0]}`;

			return (hasNodeJSHeadlessSite
				&& <SiteOverviewHOC
					key={nodeJSHeadlessLocalUrl}
					localUrl={nodeJSHeadlessLocalUrl}
					siteStatus={siteStatus}
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

	// Create the additional selection option to be displayed during site creation
	hooks.addContent('NewSiteEnvironment_EnvironmentDetails', ({ siteInfo }) => <NewSiteEnvironmentHOC siteInfo={siteInfo} />);

	nodeJSSiteOverviewRowHook(hooks);
}
