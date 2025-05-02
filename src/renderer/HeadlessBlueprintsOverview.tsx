import React from 'react';
import {
	Container,
	Title,
	Text,
	TextButtonExternal,
} from '@getflywheel/local-components';

export const HeadlessBlueprintsOverview: React.FC = () => (
	<>
		<Title size="l" tag="h2">
			WP Engine Headless Platform Blueprints
		</Title>
		<Container
			marginTop="m"
			marginBottom="l"
			className="HeadlessBlueprintsDescription"
		>
			<Text container={{ marginBottom: '10' }}>
				Blueprints come with starter code, plugins, content models, and
				page structure to get your Headless app off the ground faster.
			</Text>
			<TextButtonExternal
				href={'https://developers.wpengine.com/roadmap'}
			>
				Learn more about headless WordPress development
			</TextButtonExternal>
		</Container>
	</>
);
