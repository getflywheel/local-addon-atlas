import React from 'react';
import { Card, Divider, Text } from '@getflywheel/local-components';

const AtlasBlueprintCard: React.FC = ({
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
			headerIconContainerClassName="AtlasBluprintCard_HeaderIconContainer"
			headerIconPath={thumbnailSrc}
			contentClassName="AtlasBluprintCard_Content"
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
