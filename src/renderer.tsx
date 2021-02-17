import path from 'path';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import SiteOverviewAddonSection from './renderer/SiteOverviewAddonSection';
import type { Site } from '@getflywheel/local';
const stylesheetPath = path.resolve(__dirname, '../style.css');

const title = `Front-end Node.js`;
export const atlasDocsUrl = `https://developers.wpengine.com`;

const nodeJSSiteOverviewHook = (site: Site, siteStatus: string) => {
	const hasNodeJSHeadlessSite = site?.services?.nodejs?.ports?.NODEJS[0];
	const nodeJSHeadlessLocalUrl = `localhost:${site?.services?.nodejs?.ports?.NODEJS[0]}`;

	return (hasNodeJSHeadlessSite
		&& <SiteOverviewAddonSection
			key={nodeJSHeadlessLocalUrl}
			localUrl={nodeJSHeadlessLocalUrl}
			siteStatus={siteStatus}
			site={site}
		/>);
};

const renderTooltip = () => (
	<div className="SiteOverviewAddonSectionTooltip">
		Learn more about WP Engine Headless framework.
		<div className="SiteOverviewAddonSectionTooltipLink">
			<a href={atlasDocsUrl}>GO TO DOCS</a>
		</div>
	</div>
);

export default function (context) {
	const { React, hooks } = context;

	hooks.addContent('stylesheets', () => (
		<link
			rel="stylesheet"
			key="localAtlas-addon-stylesheet"
			href={stylesheetPath}
		/>
	));

	// Create the additional selection option to be displayed during site creation
	hooks.addContent('NewSiteEnvironment_EnvironmentDetails', () => <HeadlessEnvironmentSelect />);

	hooks.addFilter('SiteInfoOverview_Addon_Section', (content, site: Site, siteStatus: string) => {

		const nodeJSSection = {
			title,
			tooltip: renderTooltip(),
			component: (nodeJSSiteOverviewHook(site, siteStatus)),
		};
		content.push(nodeJSSection);
		return content;
	});
}
