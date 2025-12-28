import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeSwitcher } from '../../src/components/ThemeSwitcher';
import { useAppContext } from '../../src/context';

// Mock the `useAppContext` hook
vi.mock('../../src/context', () => ({
	useAppContext: vi.fn(),
}));

describe('ThemeSwitcher', () => {
	const mockToggleThemeMode = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render the DarkSolidIcon when mode is light', () => {
		(useAppContext as ReturnType<typeof vi.fn>).mockReturnValue({
			themeSettings: { mode: 'light' },
			toggleThemeMode: mockToggleThemeMode,
		});

		render(<ThemeSwitcher />);

		expect(screen.getByRole('img', { name: /dark/i })).toBeInTheDocument();
	});

	it('should render the LightSolidIcon when mode is dark', () => {
		(useAppContext as ReturnType<typeof vi.fn>).mockReturnValue({
			themeSettings: { mode: 'dark' },
			toggleThemeMode: mockToggleThemeMode,
		});

		render(<ThemeSwitcher />);

		expect(screen.getByRole('img', { name: /light/i })).toBeInTheDocument();
	});

	it('should call toggleThemeMode when the icon is clicked', () => {
		(useAppContext as ReturnType<typeof vi.fn>).mockReturnValue({
			themeSettings: { mode: 'light' },
			toggleThemeMode: mockToggleThemeMode,
		});

		render(<ThemeSwitcher />);

		const darkIcon = screen.getByRole('img', { name: /dark/i });
		fireEvent.click(darkIcon);

		expect(mockToggleThemeMode).toHaveBeenCalledTimes(1);
	});
});
