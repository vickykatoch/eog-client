import { type FC, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useShellContext } from '../../context';
import { Header } from '../Header';
import { LeftBar } from './LeftBar';

const Layout = () => (
	<div className="flex grow col">
		<Outlet />
	</div>
);

export const VanillaLayout: FC = () => {
	const { plugins } = useShellContext();
	return (
		<div className="flex col grow">
			<Header />
			<div className="flex row grow">
				<LeftBar />
				<div className="flex grow col wrap m-1">
					<Suspense fallback={<div>Loading plugin…</div>}>
						<Routes>
							<Route element={<Layout />}>
								<Route path="/" element={<Navigate to={plugins[0].route} replace />} />
							</Route>
							{plugins.map((p) => (
								<Route element={<Layout />} key={p.id}>
									<Route path={`${p.route}/*`} element={<p.Component />} />
								</Route>
							))}
							<Route element={<Layout />}>
								<Route path="*" element={<div>Not found</div>} />
							</Route>
						</Routes>
					</Suspense>
				</div>
			</div>
		</div>
	);
};
