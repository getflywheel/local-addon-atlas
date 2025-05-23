import path from 'path';

const headlessBlueprints = [
	{
		id: 'faust-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../headless-blueprints/faust-boilerplate-blueprint.png',
		),
		title: 'Faust.js Scaffolding',
		byline: 'Headless WordPress',
		excerpt:
			'Start a new Faust.js site from the beginning and craft it to your project. This blueprint is a basic project scaffold designed to get experienced developers moving quickly on new Faust.js projects.',
		previewHref:
			'https://wpeng.in/faust-scaffold',
		repoHref: 'https://github.com/wpengine/faust-scaffold',
		additionalPlugins: [
			'https://www.advancedcustomfields.com/latest/',
			'https://github.com/wp-graphql/wpgraphql-acf/releases/latest/download/wpgraphql-acf.zip',
			'https://wp-product-info.wpesvc.net/v1/plugins/wpe-atlas-headless-extension?download',
			'atlas-search',
		],
		installCommand:
			'wp atlas blueprint import https://github.com/wpengine/faust-scaffold/raw/main/atlas-blueprint.zip',
	},
	{
		id: 'portfolio-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../headless-blueprints/portfolio-blueprint.png',
		),
		title: 'Faust.js Portfolio Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Select this Blueprint to start building your new portfolio. Get started with our existing theme as you focus on the content of your portfolio.',
		previewHref:
			'https://wpeng.in/atlas-blueprint-portfolio',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-portfolio',
		additionalPlugins: [
			'https://www.advancedcustomfields.com/latest/',
			'https://github.com/wp-graphql/wpgraphql-acf/releases/latest/download/wpgraphql-acf.zip',
			'https://wp-product-info.wpesvc.net/v1/plugins/wpe-atlas-headless-extension?download',
			'atlas-search',
		],
		installCommand:
			'wp atlas blueprint import https://github.com/wpengine/atlas-blueprint-portfolio/raw/main/atlas-blueprint-portfolio.zip',
	},
	{
		id: 'shopify-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../headless-blueprints/shopify-blueprint.png',
		),
		title: 'Shopify Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Build your headless store with WordPress content and Shopify product data. Install everything you need to get started quickly, including product and navigation pages. <br><a href="https://developers.wpengine.com/docs/atlas-shopify-blueprint/introduction">Set up Shopify</a>.',
		previewHref:
			'https://atlasshopify.wpengine.com/ ',
		repoHref: 'https://github.com/wpengine/atlas-shopify-blueprint',
		additionalPlugins: [
			'atlas-content-modeler',
			'atlas-search',
		],
		installCommand:
			'wp acm blueprint import https://github.com/wpengine/atlas-shopify-blueprint/raw/main/acm-blueprint.zip',
	},
];

export default headlessBlueprints;
