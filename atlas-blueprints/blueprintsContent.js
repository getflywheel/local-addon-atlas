import path from 'path';

const atlasBlueprints = [
	{
		id: 'basic-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/basic-blueprint.png',
		),
		title: 'Basic Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'A bare-bones headless site with enough scaffolding to get you started.',
		previewHref:
			'https://wpeng.in/atlas-blueprint-basic',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-portfolio',
	},
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
		id: 'blog-blueprint-atlas-1',
		thumbnail: path.resolve(
			__dirname,
			'../atlas-blueprints/blog-blueprint.png',
		),

		title: 'Blog Blueprint',
		byline: 'Headless WordPress',
		excerpt: 'Spin up this Blueprint if you want a classic WordPress-style blog. Share your thoughts with individual blog posts and navigation pages.',
		previewHref:
			'https://wpeng.in/atlas-blueprint-blog',
		repoHref: 'https://github.com/wpengine/atlas-blueprint-portfolio',
	},
];

export default atlasBlueprints;
