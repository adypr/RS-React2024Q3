import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: [...configDefaults.exclude, 'src/tests/*'],
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'vite.config.ts',
        'vitest.config.ts',
        '**/*.cjs',
        'src/main.tsx',
        'dist',
        'src/tests/**/*',
      ],
    },
  },
});
