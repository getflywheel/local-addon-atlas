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
	setBlueprintOption: (option) => void;
}

const AtlasFromBlueprints: React.FC<IProps> = (props) => {
	const result = atlasBlueprints.reduce((prev, current) => ({
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
			},
		},
	}), {});

	const onChange = (option: string) => {
		props.setBlueprintOption({ 'bpName': option, 'atlasUrl': result[option].key });
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
