import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@salt-ds/theme/index.css';
import '@salt-ds/theme/css/theme-next.css';
import '@helios/styles/global.css';
import './index.css';
import { AppProvider } from '@helios/core';
import App from './App.tsx';

// biome-ignore lint/style/noNonNullAssertion: false positive
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AppProvider>
				<App />
			</AppProvider>
		</BrowserRouter>
	</StrictMode>,
);
