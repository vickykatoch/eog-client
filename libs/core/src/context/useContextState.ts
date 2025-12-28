import type { Mode } from '@salt-ds/core';
import { useCallback, useReducer } from 'react';
import { DEFAULT_STATE, reducer } from './reducer';
import type { ApplicationState } from './types';

export interface AppContextType extends ApplicationState {
	updateThemeMode: (mode: Mode) => void;
	toggleThemeMode: () => void;
	updateThemeSettings?: (settings: Partial<ApplicationState['themeSettings']>) => void;
}

export function useStateHandler(): AppContextType {
	const [appState, dispatch] = useReducer(reducer, DEFAULT_STATE);

	const updateThemeMode = useCallback(
		(mode: Mode) =>
			dispatch({
				type: 'SET_MODE',
				payload: mode === 'light' ? 'dark' : 'light',
			}),
		[],
	);
	const toggleThemeMode = useCallback(() => {
		dispatch({
			type: 'TOGGLE_THEME_MODE',
		});
	}, []);

	const updateThemeSettings = useCallback(
		(settings: Partial<ApplicationState['themeSettings']>) =>
			dispatch({
				type: 'SET_THEME_SETTINGS',
				payload: settings,
			}),
		[],
	);

	return {
		...appState,
		updateThemeMode,
		toggleThemeMode,
		updateThemeSettings,
	};
}
