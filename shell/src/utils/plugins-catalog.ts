import type { HeliosPlugin, PluginsManifest } from '@helios/core';

export const pluginCatalog: Record<
	string,
	() => Promise<{ plugin?: HeliosPlugin; default?: HeliosPlugin }>
> = {
	'@helios/amps-controller': () => import('@helios/amps-controller'),
} as const;

export async function loadEnabledPlugins(): Promise<HeliosPlugin[]> {
	const manifest = {
		plugins: [
			{
				module: '@helios/amps-controller',
				route: '/amps-controller',
			},
		],
	} as PluginsManifest;

	const loaded: HeliosPlugin[] = [];

	for (const cfg of manifest.plugins) {
		const importer = pluginCatalog[cfg.module];
		if (!importer) {
			console.warn(`Plugin not found in catalog (skipping): ${cfg.module}`);
			continue;
		}

		const mod = await importer();
		const plugin = mod.plugin ?? mod.default;
		if (!plugin) {
			console.warn(`Plugin module did not export { plugin } or default (skipping): ${cfg.module}`);
			continue;
		}

		// Optional overrides from config server:
		loaded.push({
			...plugin,
			route: cfg.route ? (cfg.route.startsWith('/') ? cfg.route : `/${cfg.route}`) : plugin.route,
			// route: cfg.route ?? plugin.route,
			label: cfg.label ?? plugin.label,
			order: cfg.order ?? plugin.order,
		});
	}

	loaded.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
	return loaded;
}
