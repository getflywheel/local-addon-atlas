import { ipcRenderer } from 'electron';

export const IPC_EVENTS = {
	OPEN_XTERM: 'localHeadless:openXterm',
	REGISTER_RENDER_CHANNEL: 'localHeadless:registerRenderIPCChannel',
	CLICK_XTERM: 'localHeadless:clickXterm',
};

// returns a string to be used for IPC channels that will always be the same based on the siteID input
export const terminalIpcChannel = (siteID: string): string => `ipc_event_headless:${siteID}`;

export const registerRendererChannel = (siteID: string): void => {
	const channelName = terminalIpcChannel(siteID);

	if (!ipcRenderer.listenerCount(channelName)) {
		console.log('ipc listener setup for ', channelName);
		ipcRenderer.on(channelName, (_, data: string) => {
			console.log(data);
		});
	}
};
