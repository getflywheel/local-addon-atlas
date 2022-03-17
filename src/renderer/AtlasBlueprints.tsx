import React from 'react';
import {
	Container,
	Title,
	Text,
	TextButton,
} from '@getflywheel/local-components';
import AtlasBlueprintCard from './AtlasBlueprintCard';
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

const AtlasBlueprints: React.FC = () => (
	<Container margin="l" className="AtlasBlueprints">
		<Title size="l" tag="h2">
			Atlas Bluprints
		</Title>
		<Text tag="p">
			Blueprints come with starter code, plugins, content models, and page
			structure to get your Atlas app off the ground faster.{' '}
			<TextButton
				privateOptions={{
					textDecoration: 'underline',
				}}
			>
				Learn more
			</TextButton>
		</Text>
		<Container className="AtlasBlueprintList">
			{atlasBlueprints.map((bp) => (
				<AtlasBlueprintCard
					thumbnailSrc={bp.thumbnail}
					title={bp.title}
					byline={bp.byline}
					excerpt={bp.excerpt}
					previewHref={bp.previewHref}
					repoHref={bp.repoHref}
					detailsHref={bp.detailsHref}
				/>
			))}
		</Container>
	</Container>
);

export default AtlasBlueprints;
