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
		previewHref:
			'https://hrly1qc4xu3d1wdkjaeo89ig8.js.wpenginepowered.com/',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-basic',
	},
	{
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/blog-blueprint.png',
		),

		title: 'Blog Blueprint',
		byline: 'Headless WordPress',
		excerpt: 'A standard blog built to run on headless WordPress.',
		previewHref:
			'https://hrly1qc4xu3d1wdkjaeo89ig8.js.wpenginepowered.com/',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-blog',
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
		previewHref:
			'https://hrly1qc4xu3d1wdkjaeo89ig8.js.wpenginepowered.com/',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-portfolio',
	},
];

export default atlasBlueprints;
