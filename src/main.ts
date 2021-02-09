import * as LocalMain from '@getflywheel/local/main';
import * as Local from '@getflywheel/local';
import NodeJSService from './NodeJSService';

export default function (): void {

	LocalMain.registerLightningService(NodeJSService, 'nodejs', '1.0.0');

	LocalMain.HooksMain.addFilter('defaultSiteServices', (services, siteSettings) => {
		if (siteSettings?.customOptions?.useAtlasFramework === 'on') {
			services.nodejs = {
				version: '1.0.0',
				type: Local.SiteServiceType.LIGHTNING,
				role: Local.SiteServiceRole.OTHER,
			};
		}

		return services;
	});
}
