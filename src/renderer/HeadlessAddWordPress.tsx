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
import { MultiSite, NewSiteInfo, NewSiteDefaults } from '@getflywheel/local';
import { sendIPCEvent, RouteComponentProps } from '@getflywheel/local/renderer';
import { regexPatterns } from '../constants';

interface IProps extends RouteComponentProps {
	siteSettings: NewSiteInfo;
	defaults: NewSiteDefaults;
}

export const HeadlessAddWordPress = (props: IProps): JSX.Element => {
	const [adminUsername, setUsername] = useState('');
	const [adminPassword, setPassword] = useState('');
	const [adminEmail, setEmail] = useState(props.defaults.adminEmail);
	const [multisite, setMultisite] = useState<MultiSite | 'no'>('no');
	const [isValid, setIsValid] = useState({ user: true, pass: true, email: !!adminEmail.match(regexPatterns.email) });

	const validInputs = adminUsername && adminPassword && adminEmail.match(regexPatterns.email);

	const createSiteFromBlueprint = () => {
		if (validInputs) {
			sendIPCEvent('addSite', {
				newSiteInfo: props.siteSettings,
				wpCredentials: {
					adminUsername,
					adminPassword,
					adminEmail,
				},
				goToSite: true,
			});
		}
	};

	return (
		<div className="AddSiteContent">
			<Title size="l" container={{ margin: 'l 0' }}>Set up WordPress</Title>

			<div className="Inner">
				<div className="HeadlessAddWordPress_Inputs">
					<div className="HeadlessAddWordPress_Inputs_FormField">
						<label htmlFor="adminUsername">WordPress username</label>
						<BasicInput
							invalid={!isValid.user}
							invalidMessage={'WordPress admin username is invalid.'}
							id="adminUsername"
							value={adminUsername}
							onChange={(e) => {
								setUsername(e.target.value);
								setIsValid({ ...isValid, user: !!e.target.value });
							}}
						/>
					</div>

					<div className="HeadlessAddWordPress_Inputs_FormField">
						<label htmlFor='adminPassword'>WordPress password</label>
						<InputPasswordToggle
							invalid={!isValid.pass}
							invalidMessage={'WordPress admin password is invalid.'}
							className="TID_AddSiteWordPress_PasswordToggle_AdminPassword"
							id="adminPassword"
							value={adminPassword}
							onChange={(e) => {
								setPassword(e.target.value);
								setIsValid({ ...isValid, pass: !!e.target.value });
							}}
						/>
					</div>

					<div className="HeadlessAddWordPress_Inputs_FormField">
						<label htmlFor="adminEmail">WordPress email</label>
						<BasicInput
							invalid={!isValid.email}
							invalidMessage={'WordPress admin email is invalid.'}
							id="adminEmail"
							value={adminEmail}
							onChange={(e) => {
								setEmail(e.target.value);
								setIsValid({ ...isValid, email: !!e.target.value.match(regexPatterns.email) });
							}}
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
				disabled={!validInputs}
				className="TID_AddSiteWordPress_Button_Continue Continue"
				onClick={createSiteFromBlueprint}
			>
				Create site from Blueprint
			</PrimaryButton>
			<TextButton
				className="GoBack"
				onClick={props.history.goBack}
			>
				Go back
			</TextButton>
		</div>
	);
};
