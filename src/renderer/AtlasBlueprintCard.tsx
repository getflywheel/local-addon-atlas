import React from 'react';
import { Card, Divider, Text, TextButton } from '@getflywheel/local-components';

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
						<TextButton tag="a" tagProps={{ href: previewHref }}>
							Preview Site
						</TextButton>
					</Text>
					<Text tag="p">
						<TextButton tag="a" tagProps={{ href: repoHref }}>
							Open the code on Github
						</TextButton>
					</Text>
					<Divider />
					<Text tag="p">
						<TextButton
							tag="a"
							onClick={() => {
								alert('Atlas Blueprint Details');
							}}
						>
							Show more details
						</TextButton>
					</Text>
				</>
			}
		/>
	</>
);

export default AtlasBlueprintCard;
