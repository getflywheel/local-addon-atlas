import React from 'react';
import {
	Card,
	Container,
	Divider,
	TextButton,
} from '@getflywheel/local-components';

type AtlasBlueprintCardProps = {
	thumbnailSrc: string;
	title: string;
	byline: string;
	excerpt: string;
	previewHref: string;
	repoHref: string;
	detailsHref: string;
};

const AtlasBlueprintCard: React.FC<AtlasBlueprintCardProps> = ({
	thumbnailSrc,
	title,
	byline,
	excerpt,
	previewHref,
	repoHref,
}) => (
	<Card
		className="AtlasBlueprintCard"
		headerIconContainerClassName="AtlasBlueprintCard_HeaderIconContainer"
		headerIconPath={thumbnailSrc}
		contentClassName="AtlasBlueprintCard_Content"
		contentDescriptionClassName="AtlasBlueprintCard_Description"
		contentTitle={title}
		contentSub={byline}
		contentDescription={excerpt}
		content={
			<Container className="AtlasBlueprintCard_Links">
				<TextButton tag="a" tagProps={{ href: previewHref }}>
					Preview Site
				</TextButton>
				<TextButton tag="a" tagProps={{ href: repoHref }}>
					Open the code on GitHub
				</TextButton>
				<Divider />
				<TextButton
					tag="a"
					onClick={() => {
						alert('Atlas Blueprint Details');
					}}
				>
						Show more details
				</TextButton>
			</Container>
		}
	/>
);

export default AtlasBlueprintCard;
