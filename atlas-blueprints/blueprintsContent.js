import path from 'path';

const atlasBlueprints = [
	{
		id: 'portfolio-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/portfolio-blueprint.png',
		),
		title: 'Portfolio Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Select this Blueprint to start building your new portfolio. Get started with our existing theme as you focus on the content of your portfolio.',
		previewHref:
			'https://wpeng.in/atlas-blueprint-portfolio',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-portfolio',
	},
	{
		id: 'ecommerce-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/ecommerce-blueprint.png',
		),
		title: 'BigCommerce Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Build your headless store with WordPress content and BigCommerce product data. Install everything you need to get started quickly, including product and navigation pages. <br><a href="https://developers.wpengine.com/docs/atlas-commerce-connector/introduction">Set up BigCommerce</a>.',
		previewHref:
			'https://atlascommerce.wpengine.com/',
		repoHref: 'https://github.com/wpengine/atlas-commerce-blueprint',
	},
];

export default atlasBlueprints;
