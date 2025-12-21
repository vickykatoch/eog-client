import { NavLink, Outlet, Route, Routes, useResolvedPath } from 'react-router-dom';

function Layout() {
	const base = useResolvedPath('').pathname.replace(/\/$/, '');

	return (
		<div style={{ padding: 12 }}>
			<h3>AMPS Controller</h3>

			<nav style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
				<NavLink to="./">Overview</NavLink>
				<NavLink to={`${base}/connections`}>Connections</NavLink>
				<NavLink to={`${base}/subscriptions`}>Subscriptions</NavLink>
			</nav>

			<Outlet />
		</div>
	);
}

function Overview() {
	return <div>Overview (TODO)</div>;
}
function Connections() {
	return <div>Connections (TODO)</div>;
}
function Subscriptions() {
	return <div>Subscriptions (TODO)</div>;
}

export default function AmpControllerPage() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Overview />} />
				<Route path="connections" element={<Connections />} />
				<Route path="subscriptions" element={<Subscriptions />} />
			</Route>
		</Routes>
	);
}
