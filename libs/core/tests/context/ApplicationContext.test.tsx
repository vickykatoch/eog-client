import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppProvider, useAppContext } from '../../src/context/ApplicationContext';

// Mock child component to test context
const MockChild = () => {
	const { themeSettings, updateThemeMode, toggleThemeMode } = useAppContext();

	return (
		<div>
			<span data-testid="mode">{themeSettings.mode}</span>
			{/** biome-ignore lint/a11y/useButtonType: false positive */}
			<button data-testid="update-theme" onClick={() => updateThemeMode('dark')}>
				Update Theme
			</button>
			{/** biome-ignore lint/a11y/useButtonType: false positive */}
			<button data-testid="toggle-theme" onClick={toggleThemeMode}>
				Toggle Theme
			</button>
		</div>
	);
};

describe('ApplicationContext', () => {
	it('should provide default theme settings', () => {
		render(
			<AppProvider>
				<MockChild />
			</AppProvider>,
		);

		expect(screen.getByTestId('mode').textContent).toBe('dark'); // Default mode
	});

	it('should update theme mode', () => {
		render(
			<AppProvider>
				<MockChild />
			</AppProvider>,
		);

		const updateButton = screen.getByTestId('update-theme');
		updateButton.click();

		expect(screen.getByTestId('mode').textContent).toBe('dark');
	});

	it('should toggle theme mode', () => {
		render(
			<AppProvider>
				<MockChild />
			</AppProvider>,
		);

		const toggleButton = screen.getByTestId('toggle-theme');
		toggleButton.click();

		expect(screen.getByTestId('mode').textContent).toBe('dark'); // Toggled from light to dark
	});
});
