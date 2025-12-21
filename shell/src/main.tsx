import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@helios/styles/global.css';
import './index.css';
import App from './App.tsx';

// biome-ignore lint/style/noNonNullAssertion: false positive
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
