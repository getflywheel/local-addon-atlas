import * as LocalMain from '@getflywheel/local/main';

import * as Local from '@getflywheel/local';
import { IPC_EVENTS } from './constants';
// import { Preferences } from './types';
import NodeJSService from './NodeJSService';

const OPTIONS_GROUP = 'local-headless';
let headlessSelected = false;

export default function (): void {

	LocalMain.registerLightningService(NodeJSService, 'nodejs', '1.0.0');

	// TODO: We need a way for addons to get the values of fields added to site creation.
	// One option is to modify Local to grab the values of all named inputs during site creation
	// and pass them to the beforeFinalize hook below.
	LocalMain.addIpcAsyncListener(IPC_EVENTS.HEADLESS_CHECKED , (isChecked) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', isChecked);
		headlessSelected = isChecked;
	});

	LocalMain.HooksMain.addAction('beforeFinalize', (site) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', `beforeFinalize: ${headlessSelected}`);
		if (headlessSelected) {
			// Store the current headlessFramework without erasing existing site's options.
			const currentOptions = LocalMain.getServiceContainer().cradle.userData.get(OPTIONS_GROUP);
			LocalMain.getServiceContainer().cradle.userData.set(
				OPTIONS_GROUP,
				{
					...currentOptions,
					[site.id]: {
						headlessFramework: 'atlas',
					},
				},
			);
		}
	});

	LocalMain.HooksMain.addFilter('siteServices', (services) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', `headless selected: ${headlessSelected}`);
		if (headlessSelected) {
			services.nodejs = {
				version: '1.0.0',
				type: Local.SiteServiceType.LIGHTNING,
				role: Local.SiteServiceRole.OTHER,
			};
		}

		return services;
	});
}
