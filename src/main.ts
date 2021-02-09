import * as LocalMain from '@getflywheel/local/main';
import * as Local from '@getflywheel/local';
import { IPC_EVENTS } from './constants';
import NodeJSService from './NodeJSService';

const OPTIONS_GROUP = 'local-headless';
let headlessSelected = false;

export default function (): void {

	LocalMain.registerLightningService(NodeJSService, 'nodejs', '1.0.0');

	// TODO: We need a way for addons to get the values of fields added to site creation.
	// One option is to modify Local to grab the values of all named inputs during site creation
	// and pass them to the siteAdded hook.
	LocalMain.addIpcAsyncListener(IPC_EVENTS.HEADLESS_CHECKED , (isChecked) => {
		headlessSelected = isChecked;
	});

	LocalMain.HooksMain.addFilter('defaultSiteServices', (services) => {
		if (headlessSelected) {
			services.nodejs = {
				version: '1.0.0',
				type: Local.SiteServiceType.LIGHTNING,
				role: Local.SiteServiceRole.FRONTEND,
			};
		}

		return services;
	});
}
