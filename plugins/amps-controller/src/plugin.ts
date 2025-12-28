import type { HeliosPlugin } from '@helios/core';
import AmpControllerPage from './AmpControllerPage';

export const plugin: HeliosPlugin = {
	id: 'amps-controller',
	label: 'AMPS',
	route: '/amps-controller',
	order: 1,
	Component: AmpControllerPage,
};

export default plugin;
