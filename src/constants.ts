export const IPC_EVENTS = {
	OPEN_XTERM: 'localHeadless:openXterm',
	WRITE_XTERM: 'localHeadless:writeXterm',
	CLICK_XTERM: 'localHeadless:clickXterm',
};

// returns a string to be used for IPC channels that will always be the same based on the siteID input
export const terminalIpcChannel = (siteID: string): string => `ipc_event_headless:${siteID}`;
