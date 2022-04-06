import React from 'react';
import {
	Container,
	Title,
	Text,
	TextButton,
	RadioBlock,
} from '@getflywheel/local-components';
import AtlasBlueprintCard from './AtlasBlueprintCard';
import atlasBlueprints from '../../atlas-blueprints/blueprintsContent';

interface IProps {
	setBlueprintOption: (option: string) => void;
}

const AtlasFromBlueprints: React.FC<IProps> = (props) => {
	const result = atlasBlueprints.reduce((prev, current) => ({
		...prev,
		[current.title]: {
			content:
				<AtlasBlueprintCard
					key={current.title}
					thumbnailSrc={current.thumbnail}
					title={current.title}
					byline={current.byline}
					excerpt={current.excerpt}
					previewHref={current.previewHref}
					repoHref={current.repoHref}
					detailsHref={current.detailsHref}
				/>,
			style: {
				textAlign: 'unset',
				boxShadow: 'none',
			},
		},
	}), {});

	const onChange = (option: string) => {
		props.setBlueprintOption(option);
	};

	return (
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
				<RadioBlock
					onChange={(option) => onChange(option)}
					heightSize='none'
					options={result}
				/>
			</Container>
		</Container>
	);
};

export default AtlasFromBlueprints;
