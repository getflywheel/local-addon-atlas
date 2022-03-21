import path from 'path';

const atlasBlueprints = [
	{
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/basic-blueprint.png',
		),
		title: 'Basic Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'A bare-bones headless site with enough scaffolding to get you started.',
		previewHref: 'http://example.com',
		repoHref: 'http://example.com',
		detailsHref: 'http://example.com',
	},
	{
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/blog-blueprint.png',
		),

		title: 'Blog Blueprint',
		byline: 'Headless WordPress',
		excerpt: 'A standard blog built to run on headless WordPress.',
		previewHref: 'http://example.com',
		repoHref: 'http://example.com',
		detailsHref: 'http://example.com',
	},
	{
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/portfolio-blueprint.png',
		),
		title: 'Portfolio Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Showcase your skills and blog about them with this Blueprint.',
		previewHref: 'https://example.com',
		repoHref: 'https://example.com',
		detailsHref: 'https://example.com',
	},
];

export default atlasBlueprints;
