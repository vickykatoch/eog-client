import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import './spin-animation.css';
import QueryBuilder from './query-builder/QueryBuilder';

function Layout() {
	return (
		<div style={{ padding: 12 }}>
			<nav style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
				<NavLink to="querybuilder">Query Builder</NavLink>
				<NavLink to="connections">Connections</NavLink>
				<NavLink to="subscriptions">Subscriptions</NavLink>
			</nav>
			<Outlet />
		</div>
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
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Navigate to="querybuilder" replace />} />
				<Route path="querybuilder" element={<QueryBuilder />} />
				<Route path="connections" element={<Connections />} />
				<Route path="subscriptions" element={<Subscriptions />} />
			</Route>
		</Routes>
	);
}
