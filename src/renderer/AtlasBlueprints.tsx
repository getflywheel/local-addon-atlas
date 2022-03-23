import React from 'react';
import {
	Container,
	Title,
	Text,
	TextButton,
} from '@getflywheel/local-components';
import AtlasBlueprintCard from './AtlasBlueprintCard';
import atlasBlueprints from '../../atlas-blueprints/blueprintsContent';

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
			<Text tag="p">
				Blueprints come with starter code, plugins, content models, and
				page structure to get your Atlas app off the ground faster.
				<br />
				<TextButton
					tag="a"
					tagProps={{ href: 'https://localwp.com/help-docs' }}
					privateOptions={{
						textDecoration: 'underline',
					}}
				>
					Learn more about headless WordPress development
				</TextButton>
			</Text>
		</Container>
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
