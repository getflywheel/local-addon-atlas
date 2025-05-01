import React from 'react';
import {
	Container,
	Title,
	Text,
	TextButtonExternal,
} from '@getflywheel/local-components';
import HeadlessBlueprintCard from './HeadlessBlueprintCard';
import headlessBlueprints from '../../headless-blueprints/blueprintsContent';

const AtlasBlueprints: React.FC = () => (
	<Container margin="l" className="AtlasBlueprints">
		<Title size="l" tag="h2">
			Atlas Blueprints
		</Title>
		<Container
			marginTop="m"
			marginBottom="l"
			className="AtlasBlueprintsDescription"
		>
			<Text container={{ marginBottom: '10' }}>
				Blueprints come with starter code, plugins, content models, and
				page structure to get your Atlas app off the ground faster.
			</Text>
			<TextButtonExternal
				href={'https://developers.wpengine.com/roadmap'}
			>
				Learn more about headless WordPress development
			</TextButtonExternal>
		</Container>
		<Container className="AtlasBlueprintList">
			{headlessBlueprints.map((bp) => (
				<HeadlessBlueprintCard
					key={bp.title}
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
