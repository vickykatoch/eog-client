import type { ComponentType } from 'react';
export type HeliosPlugin = {
	id: string;
	label: string;
	// route: `/${string}`;
	route: string;
	order?: number;
	icon?: string;
	Component: ComponentType;
};

export type HeliosPluginModule = {
	plugin: HeliosPlugin;
	default?: HeliosPlugin;
};

export type PluginsManifest = {
	plugins: Array<{
		module: string;
		route?: string;
		label?: string;
		order?: number;
	}>;
};
