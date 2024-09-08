import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'vite.config.ts',
        'vitest.config.ts',
        '**/*.cjs',
        'next.config.js',
        'dist',
        'src/tests/**/*',
        '.next',
        'src/models/data.interface.ts',
        'next-env.d.ts',
        'next.config.mjs'
      ],
    },
  },
});
