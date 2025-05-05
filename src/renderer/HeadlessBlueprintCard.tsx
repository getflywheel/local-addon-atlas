import React from 'react';
import {
	Card,
	Container,
	// Divider,
	IReactComponentProps,
	// TextButton,
	TextButtonExternal,
} from '@getflywheel/local-components';
import { sendIPCEvent } from '@getflywheel/local/renderer';
import { IPC_EVENTS } from '../constants';

interface HeadlessBlueprintCardProps extends IReactComponentProps {
	thumbnailSrc: string;
	title: string;
	byline: string;
	excerpt: string;
	previewHref: string;
	repoHref: string;
	detailsHref: string;
}

const HeadlessBlueprintCard: React.FC<HeadlessBlueprintCardProps> = ({
	thumbnailSrc,
	title,
	byline,
	excerpt,
	previewHref,
	repoHref,
	// detailsHref,
	...otherProps
}) => (
	<Card
		className="HeadlessBlueprintCard"
		headerIconContainerClassName="HeadlessBlueprintCard_HeaderIconContainer"
		headerIconPath={thumbnailSrc}
		contentClassName="HeadlessBlueprintCard_Content"
		contentDescriptionClassName="HeadlessBlueprintCard_Description"
		contentTitle={title}
		contentSub={byline}
		contentDescription={<span dangerouslySetInnerHTML={{ '__html': excerpt }}></span>}
		{...otherProps}
		content={
			<Container className="HeadlessBlueprintCard_Links">
				<TextButtonExternal
					inline
					href={previewHref}
					onClick={(e) => {
						e.stopPropagation();
						sendIPCEvent(IPC_EVENTS.TRACK_EVENT, 'v2_blueprint_headless_preview', { title });
					}}
					privateOptions={{ fontWeight: 'medium' }}
					style={{ marginBottom: '10px' }}
				>
					Preview site
				</TextButtonExternal>
				<br />
				<TextButtonExternal
					inline
					href={repoHref}
					onClick={(e) => {
						e.stopPropagation();
						sendIPCEvent(IPC_EVENTS.TRACK_EVENT, 'v2_blueprint_headless_code', { title });
					}}
					privateOptions={{ fontWeight: 'medium' }}
				>
					Open the code on GitHub
				</TextButtonExternal>
				{/* <Divider />
				<TextButton
					privateOptions={{ fontWeight: 'medium', padding: 'none' }}
					onClick={(e) => {
						e.stopPropagation();
						alert(`Headless Blueprint Details: ${detailsHref}`);
					}}
				>
						Show more details
				</TextButton> */}
			</Container>
		}
	/>
);

export default HeadlessBlueprintCard;
