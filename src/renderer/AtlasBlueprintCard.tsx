import React from 'react';
import { Card, Divider, Text } from '@getflywheel/local-components';

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
	detailsHref,
}) => (
	<>
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
				<>
					<Text tag="p">
						<a href={previewHref}>Preview Site</a>
					</Text>
					<Text tag="p">
						<a href={repoHref}>Open the code on Github</a>
					</Text>
					<Divider />
					<Text tag="p">
						<a href={detailsHref}>Show more details</a>
					</Text>
				</>
			}
		/>
	</>
);

export default AtlasBlueprintCard;
