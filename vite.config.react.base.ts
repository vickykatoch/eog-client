// vite.config.react.base.ts
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export const basePlugins = [react(), tsconfigPaths()];
