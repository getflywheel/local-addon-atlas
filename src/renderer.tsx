import path from 'path';
import * as Local from '@getflywheel/local';
import { HeadlessEnvironmentSelect } from './renderer/HeadlessEnvironmentSelect';
import HeadlessBlueprints from './renderer/HeadlessBlueprints';
import HeadlessFromBlueprints from './renderer/HeadlessFromBlueprints';
import SiteOverviewAddonSection from './renderer/SiteOverviewAddonSection';
import type { Site } from '@getflywheel/local';
import { sendIPCEvent } from '@getflywheel/local/renderer';
import { HeadlessAddWordPress } from './renderer/HeadlessAddWordPress';
import { TextButtonExternal } from '@getflywheel/local-components';
import blueprintsContent from '../headless-blueprints/blueprintsContent';

const stylesheetPath = path.resolve(__dirname, '../style.css');
const title = `Front-end Node.js`;

export const headlessDocsUrl = `https://wpengine.com/builders/headless`;
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
			href={headlessDocsUrl}
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
		if (siteSettings?.customOptions?.useHeadlessFramework === 'on') {
			sendIPCEvent('goToRoute', '/main/create-site/from-blueprint/add-wordpress');
		}
	});

	/**
	 * Add Blueprints as an option when creating a new site
	 */
	hooks.addFilter('CreateSite:Steps', (steps) => {
		const headlessBlueprintSteps = [
			{
				key: 'add-headless-blueprint-add-wordpress',
				path: '/main/create-site/from-blueprint/add-wordpress',
				name: 'Add WordPress',
				component: HeadlessAddWordPress,
			},
		];
		return [...steps, ...headlessBlueprintSteps];
	});

	hooks.addFilter(
		'Blueprints_FromBlueprintsContinue',
		(siteSettings: Local.NewSiteInfo) => {
			const headlessBlueprint = blueprintsContent.find((blueprint) => blueprint.id === siteSettings.blueprint);

			if (headlessBlueprint) {
				const customOptions = {
					bpId: siteSettings.blueprint,
					headlessUrl: headlessBlueprint.repoHref,
					additionalPlugins: headlessBlueprint.additionalPlugins,
					installCommand: headlessBlueprint.installCommand,
					useHeadlessFramework: 'on',
				};

				return { ...siteSettings, customOptions };
			}

			return { ...siteSettings };
		},
	);

	hooks.addContent('stylesheets', () => (
		<link
			rel="stylesheet"
			key="local-headless-addon-stylesheet"
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
		<HeadlessBlueprints key="headless-blueprints" />
	));

	hooks.addContent(
		'Blueprints_FromBlueprints:after',
		(bpId, setBpId, setDisabled) => (
			<HeadlessFromBlueprints key="headless-from-blueprints" bpId={bpId} setBpId={setBpId} setDisabled={setDisabled} />
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
