import { type Mode, SaltProviderNext } from '@salt-ds/core';
import { createContext, type ReactNode, useCallback, useContext, useReducer } from 'react';
import { DEFAULT_STATE, reducer } from './reducer';
import type { ApplicationState } from './types';

interface AppContextType extends ApplicationState {
	updateThemeMode: (mode: Mode) => void;
	toggleThemeMode: () => void;
	updateThemeSettings?: (settings: Partial<ApplicationState['themeSettings']>) => void;
}
export const ApplicationContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(ApplicationContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
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

	return (
		<SaltProviderNext
			accent="teal"
			corner="rounded"
			headingFont="Amplitude"
			actionFont="Amplitude"
			mode={appState.themeSettings.mode}
			applyClassesTo="root"
			density="medium"
		>
			<ApplicationContext.Provider
				value={{ ...appState, updateThemeMode, toggleThemeMode, updateThemeSettings }}
			>
				{children}
			</ApplicationContext.Provider>
		</SaltProviderNext>
	);
};
