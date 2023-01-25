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
			'Show off your craft and share your thoughts with this Blueprint. Includes pages to list your projects, and also a blog.',
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
		title: 'Ecommerce Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Build your headless store with WordPress content and BigCommerce product data. Install everything you need to get started quickly, including product and navigation pages.',
		previewHref:
			'https://atlascommerce.wpengine.com/',
		repoHref: 'https://github.com/wpengine/atlas-commerce-blueprint',
	},
];

export default atlasBlueprints;
