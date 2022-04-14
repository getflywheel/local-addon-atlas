import path from 'path';
import * as Local from '@getflywheel/local';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import AtlasBlueprints from './renderer/AtlasBlueprints';
import AtlasFromBlueprints from './renderer/AtlasFromBlueprints';
import SiteOverviewAddonSection from './renderer/SiteOverviewAddonSection';
import type { Site } from '@getflywheel/local';
import { sendIPCEvent } from '@getflywheel/local/renderer';
import { AtlasAddWordPress } from './renderer/AtlasAddWordPress';
import { TextButtonExternal } from '@getflywheel/local-components';

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
		<TextButtonExternal
			href={atlasDocsUrl}
			inline={false}
			style={{ paddingTop: '7px' }}
		>
			Go to docs
		</TextButtonExternal>
	</div>
);

export default function (context) {
	const { React, hooks } = context;

	hooks.addAction('FromBlueprintSiteDetails:OnContinue', (siteSettings: Local.NewSiteInfo) => {
		if (siteSettings?.customOptions?.useAtlasFramework === 'on') {
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

	hooks.addFilter(
		'Blueprints_FromBlueprintsContinue',
		(siteSettings: Local.NewSiteInfo) => {
			const bpUrls = {
				'Basic Blueprint': 'atlas-blueprint-basic',
				'Blog Blueprint': 'atlas-blueprint-blog',
				'Portfolio Blueprint': 'atlas-blueprint-portfolio',
			};
			const isAtlas = Object.keys(bpUrls).includes(siteSettings.blueprint);

			if (isAtlas) {
				const customOptions = {
					bpName: siteSettings.blueprint,
					atlasUrl: bpUrls[siteSettings.blueprint],
					useAtlasFramework: 'on',
				};

				return { ...siteSettings, customOptions };
			}

			return { ...siteSettings };
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
		(bpName, setBpName, setDisabled) => (
			<AtlasFromBlueprints key="atlas-from-blueprints" bpName={bpName} setBpName={setBpName} setDisabled={setDisabled} />
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
