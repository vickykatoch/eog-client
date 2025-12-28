import type { ShellAction, ShellState } from './types';

export function shellReducer(state: ShellState, action: ShellAction): ShellState {
	switch (action.type) {
		case 'SET_LAYOUT':
			return { ...state, layout: action.payload };
		case 'SET_PLUGINS':
			return { ...state, loading: false, plugins: action.payload };
		case 'SET_ERROR':
			return { ...state, loading: false };
		default:
			return state;
	}
}
