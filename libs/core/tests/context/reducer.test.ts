import { User } from '../../src';
import { DEFAULT_STATE, reducer } from '../../src/context/reducer';
import type { AppAction, AppInfo, ApplicationState } from '../../src/context/types';

describe('reducer', () => {
	let initialState: ApplicationState;

	beforeEach(() => {
		initialState = { ...DEFAULT_STATE };
	});

	it('should handle SET_USER action', () => {
		const action: AppAction = {
			type: 'SET_USER',
			payload: new User(),
		};
		const newState = reducer(initialState, action);
		expect(newState.user).toEqual(action.payload);
	});

	it('should handle SET_APP_INFO action', () => {
		const appInfo = { platform: 'mobile', version: '2.0.0', env: 'production' };
		const action: AppAction = {
			type: 'SET_APP_INFO',
			payload: appInfo as AppInfo,
		};
		const newState = reducer(initialState, action);
		expect(newState.appInfo).toEqual(appInfo);
	});

	it('should handle SET_THEME_SETTINGS action', () => {
		const themeSettings = { mode: 'dark', density: 'high' };

		const newState = reducer(initialState, {
			type: 'SET_THEME_SETTINGS',
			payload: themeSettings,
		} as AppAction);
		expect(newState.themeSettings).toEqual({
			...initialState.themeSettings,
			...themeSettings,
		});
	});

	it('should handle TOGGLE_THEME_MODE action', () => {
		const action: AppAction = { type: 'TOGGLE_THEME_MODE' };
		const newState = reducer(initialState, action);
		expect(newState.themeSettings.mode).toBe(
			initialState.themeSettings.mode === 'light' ? 'dark' : 'light',
		);
	});

	it('should handle SET_MODE action', () => {
		const action: AppAction = { type: 'SET_MODE', payload: 'dark' };
		const newState = reducer(initialState, action);
		expect(newState.themeSettings.mode).toBe('dark');
	});

	it('should return the current state for unknown actions', () => {
		// biome-ignore lint/suspicious/noExplicitAny: false positive
		const newState = reducer(initialState, { type: 'UNKNOWN_ACTION' } as any);
		expect(newState).toBe(initialState);
	});
});
