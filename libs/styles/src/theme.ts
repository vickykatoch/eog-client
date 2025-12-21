export const theme = {
	radius: 10,
	space: {
		2: 8,
		3: 12,
		4: 16,
	},
	classNames: {
		card: 'hx-card',
		nav: 'hx-nav',
	},
} as const;

export type HeliosTheme = typeof theme;
