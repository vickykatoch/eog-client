import type { AppAction, ApplicationState } from './types';
import { User } from './User';

export function reducer(state: ApplicationState, action: AppAction): ApplicationState {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_APP_INFO':
			return { ...state, appInfo: action.payload };
		case 'SET_THEME_SETTINGS':
			return { ...state, themeSettings: { ...state.themeSettings, ...action.payload } };
		case 'TOGGLE_THEME_MODE':
			return {
				...state,
				themeSettings: {
					...state.themeSettings,
					mode: state.themeSettings.mode === 'light' ? 'dark' : 'light',
				},
			};
		case 'SET_MODE':
			return {
				...state,
				themeSettings: {
					...state.themeSettings,
					mode: action.payload,
				},
			};
		default:
			return state;
	}
}

export const DEFAULT_STATE: ApplicationState = {
	user: new User(),
	appInfo: {
		platform: 'web',
		version: '1.0.0',
		env: 'development',
	},
	themeSettings: {
		mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
		density: 'low',
	},
};
