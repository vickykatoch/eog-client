import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
	vi.resetAllMocks();
	vi.restoreAllMocks();
});
