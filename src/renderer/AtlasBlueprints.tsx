import React from 'react';
import {
	Container,
	Divider,
	Title,
	Text,
	TextButton,
} from '@getflywheel/local-components';

const atlasBlueprints = [
	{
		thumbnail: 'http://example.com',
		title: 'Basic Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'A bare-bones headless site with enough scaffolding to get you started.',
		links: {
			preview: { text: 'Preview Site', href: 'http://example.com' },
			repo: {
				text: 'Open the code on Github',
				href: 'http://example.com',
			},
			details: { text: 'Show more details', href: 'http://example.com' },
		},
	},
	{
		thumbnail: 'http://example.com',
		title: 'Blog Blueprint',
		byline: 'Headless WordPress',
		excerpt: 'A standard blog built to run on headless WordPress.',
		links: {
			preview: { text: 'Preview Site', href: 'http://example.com' },
			repo: {
				text: 'Open the code on Github',
				href: 'http://example.com',
			},
			details: { text: 'Show more details', href: 'http://example.com' },
		},
	},
	{
		thumbnail: 'http://example.com',
		title: 'Portfolio Blueprint',
		byline: 'Headless WordPress',
		excerpt:
			'Showcase your skills and blog about them with this Blueprint.',
		links: {
			preview: { text: 'Preview Site', href: 'https://example.com' },
			repo: {
				text: 'Open the code on Github',
				href: 'https://example.com',
			},
			details: { text: 'Show more details', href: 'https://example.com' },
		},
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
				<Container className="AtlasBlueprint">
					<img
						src={bp.thumbnail}
						alt={`Preview of the ${bp.title}`}
					/>
					<Container margin="m">
						{' '}
						<Title>{bp.title}</Title>
						<Text>{bp.byline}</Text>
						<Container marginBottom="l">
							<Text tag="p">{bp.excerpt}</Text>
						</Container>
						<Text tag="p">
							<a href={bp.links.preview.href}>
								{bp.links.preview.text}
							</a>
						</Text>
						<Text tag="p">
							<a href={bp.links.repo.href}>
								{bp.links.repo.text}
							</a>
						</Text>
						<Divider />
						<Text tag="p">
							<a href={bp.links.details.href}>
								{bp.links.details.text}
							</a>
						</Text>
					</Container>{' '}
				</Container>
			))}
		</Container>
	</Container>
);

export default AtlasBlueprints;
