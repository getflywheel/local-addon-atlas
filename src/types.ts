export interface addHeadlessEnvironmentData {
	HeadlessFrameworkValue: HeadlessFrameworkTypes | undefined;
	requiresSourceUrl: boolean;
}

export enum HeadlessFrameworkTypes {
	NONE = 'none',
	ATLAS = 'atlas',
	OTHER = 'other',
}
