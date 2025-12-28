import type { HeliosPlugin } from '@helios/core';

export interface ShellError {
	type: string;
	message: string;
}
export interface ShellState {
	loading?: boolean;
	layout: 'vanilla';
	plugins: HeliosPlugin[];
	error?: ShellError;
}

export type ShellAction =
	| { type: 'SET_LAYOUT'; payload: 'vanilla' }
	| { type: 'SET_PLUGINS'; payload: HeliosPlugin[] }
	| { type: 'SET_ERROR'; payload: ShellError };
