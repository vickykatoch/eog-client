import { resolve } from 'node:path';
import { mergeConfig } from 'vitest/config';
import { sharedTestConfig } from '../../vitest.shared';

export default mergeConfig(sharedTestConfig, {
	test: {
		include: ['tests/**/*.test.{ts,tsx}'],
		coverage: {
			...sharedTestConfig.test?.coverage,
			reportsDirectory: resolve(__dirname, '../../coverage/libs/filter-api'),
		},
	},
});
