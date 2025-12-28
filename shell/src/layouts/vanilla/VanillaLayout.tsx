import { type FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useShellContext } from '../../context';
import { Header } from '../Header';
import { LeftBar } from './LeftBar';

export const VanillaLayout: FC = () => {
	const { plugins } = useShellContext();
	return (
		<div className="flex col grow">
			<Header />
			<div className="flex row grow">
				<LeftBar />
				<div className="flex grow col wrap p-1">
					<Suspense fallback={<div>Loading plugin…</div>}>
						<Routes>
							<Route path="/" element={<Navigate to={plugins[0].route} replace />} />
							{plugins.map((p) => (
								<Route key={p.id} path={`${p.route}/*`} element={<p.Component />} />
							))}
							<Route path="*" element={<div>Not found</div>} />
						</Routes>
					</Suspense>
				</div>
			</div>
		</div>
	);
};
