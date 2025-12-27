import type { Density, Mode } from '@salt-ds/core';
import type { User } from './User';

export interface ApplicationState {
	user: User;
	appInfo: AppInfo;
	themeSettings: ThemeSettings;
}

export interface AppInfo {
	platform: 'web' | 'mobile' | 'desktop';
	version: string;
	env: string;
	region?: string;
}

export interface ThemeSettings {
	mode: Mode;
	density: Density;
}

export type AppAction =
	| { type: 'SET_USER'; payload: User }
	| { type: 'SET_APP_INFO'; payload: AppInfo }
	| { type: 'SET_THEME_SETTINGS'; payload: Partial<ThemeSettings> }
	| { type: 'SET_MODE'; payload: Mode }
	| { type: 'TOGGLE_THEME_MODE' };
