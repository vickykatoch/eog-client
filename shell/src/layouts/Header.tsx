import { ThemeSwitcher } from '@helios/sdk';
import { Logo } from './Logo';

export const Header = () => {
	return (
		<header className={`flex no-shrink justify-center-v gap-sm px-1 py-sm-1 bar-1`}>
			<Logo height={40} width={40} />
			<h1>Helios</h1>
			<div className="grow">&nbsp;</div>
			<div className="flex no-shrink">
				<ThemeSwitcher />
			</div>
		</header>
	);
};
