import type { HeliosPlugin } from '@helios/sdk';
import { useEffect, useState } from 'react';
// import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { VanillaLayout } from './layouts';
import { loadEnabledPlugins } from './utils/plugins-catalog';

export default function App() {
	const [plugins, setPlugins] = useState<HeliosPlugin[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadEnabledPlugins()
			.then(setPlugins)
			.catch((e) => setError(String(e)));
	}, []);

	if (error) return <div style={{ padding: 16 }}>Failed to load plugins: {error}</div>;
	if (!plugins.length) return <div style={{ padding: 16 }}>Loading…</div>;

	return <VanillaLayout />;
	/*
	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			<aside style={{ width: 220, padding: 12, borderRight: '1px solid #ddd' }}>
				<h3>Helios</h3>
				<img src="/logo.svg" alt="Helios Logo" style={{ width: '100%', marginBottom: 16 }} />
				<nav style={{ display: 'grid', gap: 8 }}>
					{plugins.map((p) => (
						<Link key={p.id} to={p.route}>
							{p.label}
						</Link>
					))}
				</nav>
			</aside>

			<main style={{ flex: 1, padding: 12 }}>
				<Suspense fallback={<div>Loading plugin…</div>}>
					<Routes>
						<Route path="/" element={<Navigate to={plugins[0].route} replace />} />
						{plugins.map((p) => (
							<Route key={p.id} path={`${p.route}/*`} element={<p.Component />} />
						))}
						<Route path="*" element={<div>Not found</div>} />
					</Routes>
				</Suspense>
			</main>
		</div>
	);
	*/
}
