export const IPC_EVENTS = {
	OPEN_XTERM: 'localHeadless:openXterm',
	WRITE_XTERM: 'localHeadless:writeDataToXterm',
	CLEAR_XTERM: 'localHeadless:clearXterm',
	RESIZE_XTERM: 'localHeadless:resizeXterm',
	TRACK_EVENT: 'analyticsV2:trackEvent',
};

export const ANALYTIC_EVENTS = {
	OPEN_XTERM: 'v2_atlas_console_open',
	SITE_PROVISIONED: 'v2_atlas_site_provisioned',
};

export const headlessDirectoryName = 'app-node';
