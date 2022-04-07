import React from 'react';
import {
	Card,
	Container,
	Divider,
	IReactComponentProps,
	TextButton,
	TextButtonExternal,
} from '@getflywheel/local-components';

interface AtlasBlueprintCardProps extends IReactComponentProps {
	thumbnailSrc: string;
	title: string;
	byline: string;
	excerpt: string;
	previewHref: string;
	repoHref: string;
	detailsHref: string;
}

const AtlasBlueprintCard: React.FC<AtlasBlueprintCardProps> = ({
	thumbnailSrc,
	title,
	byline,
	excerpt,
	previewHref,
	repoHref,
	detailsHref,
	...otherProps
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
		{...otherProps}
		content={
			<Container className="AtlasBlueprintCard_Links">
				<TextButtonExternal href={previewHref} onClick={(e) => e.stopPropagation()}>
					Preview Site
				</TextButtonExternal>
				<TextButtonExternal href={repoHref} onClick={(e) => e.stopPropagation()}>
					Open the code on GitHub
				</TextButtonExternal>
				<Divider />
				<TextButton
					onClick={(e) => {
						e.stopPropagation();
						alert(`Atlas Blueprint Details: ${detailsHref}`);
					}}
				>
						Show more details
				</TextButton>
			</Container>
		}
	/>
);

export default AtlasBlueprintCard;
