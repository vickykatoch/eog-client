import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AmpControllerPage from './AmpControllerPage';

describe('AmpControllerPage', () => {
	it('renders without crashing', () => {
		render(
			<MemoryRouter>
				<AmpControllerPage />
			</MemoryRouter>,
		);
		expect(screen.getByText('AMPS Controller')).toBeInTheDocument();
	});

	it('renders overview by default', () => {
		render(
			<MemoryRouter>
				<AmpControllerPage />
			</MemoryRouter>,
		);
		expect(screen.getByText('Overview (TODO)')).toBeInTheDocument();
	});

	it('renders navigation links', () => {
		render(
			<MemoryRouter>
				<AmpControllerPage />
			</MemoryRouter>,
		);
		expect(screen.getByText('Overview')).toBeInTheDocument();
		expect(screen.getByText('Connections')).toBeInTheDocument();
		expect(screen.getByText('Subscriptions')).toBeInTheDocument();
	});

	it('renders connections page when navigating', () => {
		render(
			<MemoryRouter initialEntries={['/connections']}>
				<AmpControllerPage />
			</MemoryRouter>,
		);
		expect(screen.getByText('Connections (TODO)')).toBeInTheDocument();
	});

	it('renders subscriptions page when navigating', () => {
		render(
			<MemoryRouter initialEntries={['/subscriptions']}>
				<AmpControllerPage />
			</MemoryRouter>,
		);
		expect(screen.getByText('Subscriptions (TODO)')).toBeInTheDocument();
	});
});
