import { HomeIcon } from '@salt-ds/icons';
import { Link } from 'react-router';
import { useShellContext } from '../../context';

export const LeftBar = () => {
	const { plugins } = useShellContext();

	return (
		<div className="flex no-shrink  gap-sm px-1 bar-1 lr col justify-center-v">
			{plugins.map((p) => (
				<Link
					key={p.id}
					to={p.route}
					className="flex justify-center-v no-shrink gap-sm px-1 bar-1 lr col"
				>
					<HomeIcon size={2} />
					<span>{p.label}</span>
				</Link>
			))}
		</div>
	);
};
