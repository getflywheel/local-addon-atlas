import React from 'react';
import {
	Container,
	Title,
	Text,
	RadioBlock,
	TextButtonExternal,
} from '@getflywheel/local-components';
import AtlasBlueprintCard from './AtlasBlueprintCard';
import atlasBlueprints from '../../atlas-blueprints/blueprintsContent';

interface IProps {
	bpName: string;
	setBpName: (bpName: string) => void;
	setDisabled: (val: boolean) => void;
}

const AtlasFromBlueprints = (props: IProps): JSX.Element => {
	const atlasBlueprintOptions = atlasBlueprints.reduce((prev, current) => ({
		...prev,
		[current.title]: {
			key: current.repoHref,
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
					style={{ height: '100%', margin: '0' }}
				/>,
			style: {
				height: '100%',
				marginRight: '15px',
				textAlign: 'unset',
				borderRadius: '4px',
			},
		},
	}), {});

	const onChange = async (option: string) => {
		props.setBpName(option);
		props.setDisabled(false);
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
				<Text container={{ marginBottom: '10' }}>
					Blueprints come with starter code, plugins, content models, and
					page structure to get your Atlas app off the ground faster.
				</Text>
				<TextButtonExternal
					href={'https://localwp.com/help-docs'}
				>
					Learn more about headless WordPress development
				</TextButtonExternal>
			</Container>
			<Container className="AtlasBlueprintList">
				<RadioBlock
					centerContent={false}
					default={props.bpName}
					onChange={(option) => onChange(option)}
					heightSize='none'
					options={atlasBlueprintOptions}
				/>
			</Container>
		</Container>
	);
};

export default AtlasFromBlueprints;
