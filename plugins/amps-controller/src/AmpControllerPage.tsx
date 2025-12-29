import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import './spin-animation.css';
import { lazy, Suspense } from 'react';
import { AmpsControllerContextProvider } from './context';

const QueryBuilder = lazy(() => import('./query-builder/QueryBuilder'));

function Layout() {
	return (
		<AmpsControllerContextProvider>
			<div className="flex grow col">
				<nav className="flex no-shrink gap-md mg-b bar-1 py-1 px-2 justify-center-v">
					{/* <nav className="flex gap-md"> */}
					<NavLink to="querybuilder">Query Builder</NavLink>
					<NavLink to="connections">Connections</NavLink>
					<NavLink to="subscriptions">Subscriptions</NavLink>
					{/* </nav> */}
				</nav>
				<div className="flex grow col gap-sm">
					<Outlet />
				</div>
			</div>
		</AmpsControllerContextProvider>
	);
}

function Connections() {
	return <div>Connections (TODO)</div>;
}
function Subscriptions() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
			<h2>Subscriptions</h2>
			<img
				src="/helios.svg"
				alt="Helios Logo"
				className="spinning-logo"
				style={{ width: 100, height: 100 }}
			/>
		</div>
	);
}

export default function AmpControllerPage() {
	return (
		<Suspense fallback={<div>Loading Amp Controller...</div>}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="querybuilder" replace />} />
					<Route path="querybuilder" element={<QueryBuilder />} />
					<Route path="connections" element={<Connections />} />
					<Route path="subscriptions" element={<Subscriptions />} />
				</Route>
			</Routes>
		</Suspense>
	);
}
