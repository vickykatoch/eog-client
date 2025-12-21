import { describe, expect, it } from 'vitest';
import { type HeliosTheme, theme } from './theme';

describe('theme', () => {
	it('should have correct radius value', () => {
		expect(theme.radius).toBe(10);
	});

	describe('space', () => {
		it('should have correct space values', () => {
			expect(theme.space[2]).toBe(8);
			expect(theme.space[3]).toBe(12);
			expect(theme.space[4]).toBe(16);
		});

		it('should have all expected space keys', () => {
			const spaceKeys = Object.keys(theme.space);
			expect(spaceKeys).toEqual(['2', '3', '4']);
		});
	});

	describe('classNames', () => {
		it('should have correct className values', () => {
			expect(theme.classNames.card).toBe('hx-card');
			expect(theme.classNames.nav).toBe('hx-nav');
		});

		it('should have all expected className keys', () => {
			const classNameKeys = Object.keys(theme.classNames);
			expect(classNameKeys).toEqual(['card', 'nav']);
		});
	});

	describe('theme structure', () => {
		// it('should be a frozen object (as const)', () => {
		// 	expect(() => {
		// 		// @ts-expect-error - testing immutability
		// 		theme.radius = 20;
		// 	}).toThrow();
		// });

		it('should have all required top-level properties', () => {
			expect(theme).toHaveProperty('radius');
			expect(theme).toHaveProperty('space');
			expect(theme).toHaveProperty('classNames');
		});
	});

	describe('HeliosTheme type', () => {
		it('should correctly type the theme object', () => {
			const testTheme: HeliosTheme = theme;
			expect(testTheme).toBe(theme);
		});
	});
});
