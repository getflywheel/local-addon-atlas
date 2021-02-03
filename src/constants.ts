export const IPC_EVENTS = {
	OPEN_XTERM: 'localHeadless:openXterm',
	WRITE_XTERM: 'localHeadless:writeXterm',
	CLICK_XTERM: 'localHeadless:clickXterm',
};

export const terminalIpcChannel = (siteID: string): string => `ipc_event_headless:${siteID}`;
