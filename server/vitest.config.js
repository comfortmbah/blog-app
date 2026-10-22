import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',

    // Test files must use the .test.js or .spec.js suffix
    include: ['src/**/*.test.js', 'tests/**/*.test.js'],

    // Allow time for database-backed integration tests
    testTimeout: 10000,

    // Restore mocks between tests
    clearMocks: true,
    restoreMocks: true,

  },
});
