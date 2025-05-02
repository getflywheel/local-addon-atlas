import React from 'react';
import {
	Container,
} from '@getflywheel/local-components';
import HeadlessBlueprintCard from './HeadlessBlueprintCard';
import headlessBlueprints from '../../headless-blueprints/blueprintsContent';
import { HeadlessBlueprintsOverview } from './HeadlessBlueprintsOverview';

const HeadlessBlueprints: React.FC = () => (
	<Container margin="l" className="HeadlessBlueprints">
		<HeadlessBlueprintsOverview />
		<Container className="HeadlessBlueprintList">
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

export default HeadlessBlueprints;
