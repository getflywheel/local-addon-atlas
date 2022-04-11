import React, { useState } from 'react';
import {
	AdvancedToggle,
	FlySelect,
	PrimaryButton,
	TextButton,
	Title,
	InputPasswordToggle,
	BasicInput,
} from '@getflywheel/local-components';
import { MultiSite, NewSiteInfo } from '@getflywheel/local';
import { sendIPCEvent } from '@getflywheel/local/renderer';

interface IProps {
	siteSettings: NewSiteInfo
	localHistory;
}

export const AtlasAddWordPress = (props: IProps): JSX.Element => {
	const [adminUsername, setUsername] = useState('');
	const [adminPassword, setPassword] = useState('');
	const [adminEmail, setEmail] = useState('');
	const [multisite, setMultisite] = useState<MultiSite | 'no'>('no');

	const createSiteFromBlueprint = () => {
		sendIPCEvent('addSite', {
			newSiteInfo: props.siteSettings,
			wpCredentials: {
				adminUsername,
				adminPassword,
				adminEmail,
			},
			goToSite: true,
		});
	};

	return (
		<div className="AddSiteContent">
			<Title size="l" container={{ margin: 'l 0' }}>Set up WordPress</Title>

			<div className="Inner">
				<div className="AtlasAddWordPress_Inputs">
					<div>
						<label htmlFor="adminUsername">WordPress username</label>
						<BasicInput
							id="adminUsername"
							value={adminUsername}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor='adminPassword'>WordPress password</label>
						<InputPasswordToggle
							className="TID_AddSiteWordPress_PasswordToggle_AdminPassword"
							id="adminPassword"
							value={adminPassword}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="adminEmail">WordPress email</label>
						<BasicInput
							id="adminEmail"
							value={adminEmail}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				<AdvancedToggle className="TID_AddSiteWordPress_AdvancedToggle_AdvancedOptions">
					<div className="FormRow FormRow__Third FormRow__Center">
						<div className="FormField">
							<label>Is this a WordPress Multisite?</label>
							<FlySelect
								value={multisite}
								options={{
									'no': 'No',
									'ms-subdir': 'Yes – Subdirectory',
									'ms-subdomain': 'Yes – Subdomain',
								}}
								onChange={setMultisite}
							/>
						</div>
					</div>
				</AdvancedToggle>
			</div>

			<PrimaryButton
				className="TID_AddSiteWordPress_Button_Continue Continue"
				onClick={createSiteFromBlueprint}
			>
				Create site from Blueprint
			</PrimaryButton>
			<TextButton
				className="GoBack"
				onClick={() => props.localHistory.goBack()}
			>
				Go back
			</TextButton>
		</div>
	);
};
