import path from 'path';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import AtlasBlueprints from './renderer/AtlasBlueprints';
import AtlasFromBlueprints from './renderer/AtlasFromBlueprints';
import SiteOverviewAddonSection from './renderer/SiteOverviewAddonSection';
import type { Site } from '@getflywheel/local';
import { sendIPCEvent } from '@getflywheel/local/renderer';
import { AtlasAddWordPress } from './renderer/AtlasAddWordPress';
const stylesheetPath = path.resolve(__dirname, '../style.css');

const title = `Front-end Node.js`;
export const atlasDocsUrl = `https://developers.wpengine.com`;
export const faustJsDocsUrl = `https://github.com/wpengine/faustjs`;

const nodeJSSiteOverviewHook = (site: Site, siteStatus: string) => {
	const hasNodeJSHeadlessSite = site?.services?.nodejs?.role;
	const nodeJSHeadlessLocalUrl = `localhost:${site?.services?.nodejs?.ports?.HTTP[0]}`;

	return (
		hasNodeJSHeadlessSite && (
			<SiteOverviewAddonSection
				key={nodeJSHeadlessLocalUrl}
				localUrl={nodeJSHeadlessLocalUrl}
				siteStatus={siteStatus}
				site={site}
			/>
		)
	);
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

	hooks.addAction('FromBlueprintSiteDetails:OnContinue', (props) => {
		if (props.siteSettings.customOptions.useAtlasFramework === 'on') {
			sendIPCEvent('goToRoute', '/main/create-site/from-blueprint/add-wordpress');
		}
	});

	/**
	 * Add AtlasBlueprints as an option when creating a new site
	 */
	hooks.addFilter('CreateSite:Routes', (routes) => {
		const atlasBlueprintRoutes = [
			{
				key: 'add-atlas-blueprint-add-wordpress',
				path: '/main/create-site/from-blueprint/add-wordpress',
				stepName: 'Add WordPress',
				component: AtlasAddWordPress,
			},
		];
		return [...routes, ...atlasBlueprintRoutes];
	});

	hooks.addAction(
		'Blueprints_FromBlueprintsContinue',
		async ({ props, bpName, atlasUrl }) => {
			const isAtlas = (name) => ['Basic Blueprint', 'Blog Blueprint', 'Portfolio Blueprint'].includes(name);

			await props.updateSiteSettings({
				...props.siteSettings,
				customOptions: {
					bpName,
					atlasUrl,
					useAtlasFramework: isAtlas(bpName) ? 'on' : 'off',
				},
			});
		},
	);

	hooks.addContent('stylesheets', () => (
		<link
			rel="stylesheet"
			key="localAtlas-addon-stylesheet"
			href={stylesheetPath}
		/>
	));

	// Create the additional selection option to be displayed during site creation
	hooks.addContent(
		'NewSiteEnvironment_EnvironmentDetails',
		({ disableButton }) => (
			<HeadlessEnvironmentSelect disableButton={disableButton} />
		),
	);

	hooks.addContent('Blueprints_BlueprintsList:after', () => (
		<AtlasBlueprints key="atlas-blueprints" />
	));

	hooks.addContent(
		'Blueprints_FromBlueprints:after',
		({ setBlueprintOption }) => (
			<AtlasFromBlueprints key="atlas-from-blueprints" setBlueprintOption={setBlueprintOption} />
		),
	);

	hooks.addFilter(
		'SiteInfoOverview_Addon_Section',
		(content, site: Site, siteStatus: string) => {
			const nodeJSSection = {
				title,
				tooltip: renderTooltip(),
				component: nodeJSSiteOverviewHook(site, siteStatus),
			};
			content.push(nodeJSSection);
			return content;
		},
	);
}
