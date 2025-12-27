import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

// import App from '../src/App';

describe('App', () => {
	it('renders without crashing', () => {
		render(<App />);
		expect(document.body).toBeTruthy();
	});
});
