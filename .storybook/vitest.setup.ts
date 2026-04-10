import { getVitestConfig } from '@storybook/test';
import { mergeConfig } from 'vite';

export default mergeConfig(
  getVitestConfig(),
  {
    test: {
      globals: true,
      environment: 'jsdom',
    },
  }
);
