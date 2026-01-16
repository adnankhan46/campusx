import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/tests/setup.js'],
    testTimeout: 120 * 1000, // 2 minutes for database operations
    hookTimeout: 120 * 1000,
  },
});
