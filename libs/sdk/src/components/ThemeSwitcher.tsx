import { DarkSolidIcon, LightSolidIcon } from '@salt-ds/icons';
import { useAppContext } from '../context';

export const ThemeSwitcher = () => {
	const {
		themeSettings: { mode },
		toggleThemeMode,
	} = useAppContext();

	return (
		<div className="flex no-shrink">
			{mode === 'light' ? (
				<DarkSolidIcon onClick={toggleThemeMode} />
			) : (
				<LightSolidIcon onClick={toggleThemeMode} />
			)}
		</div>
	);
};
