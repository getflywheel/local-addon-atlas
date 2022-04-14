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

export const regexPatterns = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	hostname: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
	ipv4: /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/,
};
