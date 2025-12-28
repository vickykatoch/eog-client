import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_STATE } from '../../src/context/reducer';
import { useStateHandler } from '../../src/context/useContextState';

describe('useStateHandler', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return the default state', () => {
		const { result } = renderHook(() => useStateHandler());

		expect(result.current.themeSettings).toEqual(DEFAULT_STATE.themeSettings);
		expect(result.current.user).toEqual(DEFAULT_STATE.user);
		expect(result.current.appInfo).toEqual(DEFAULT_STATE.appInfo);
	});

	it('should update the theme mode', () => {
		const { result } = renderHook(() => useStateHandler());

		act(() => {
			result.current.updateThemeMode('dark');
		});

		expect(result.current.themeSettings.mode).toBe('dark');
	});

	it('should toggle the theme mode', () => {
		const { result } = renderHook(() => useStateHandler());
		const initialMode = result.current.themeSettings.mode;

		act(() => {
			result.current.toggleThemeMode();
		});

		expect(result.current.themeSettings.mode).toBe(initialMode === 'light' ? 'dark' : 'light');

		act(() => {
			result.current.toggleThemeMode();
		});

		expect(result.current.themeSettings.mode).toBe(initialMode);
	});

	it('should update theme settings', () => {
		const { result } = renderHook(() => useStateHandler());

		act(() => {
			result.current.updateThemeSettings?.({ density: 'high' });
		});

		expect(result.current.themeSettings.density).toBe('high');
	});
});
