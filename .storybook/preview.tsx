import type { Preview, ReactRenderer } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../src/theme';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ChakraProvider value={system}>
        <Story />
      </ChakraProvider>
    ),
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: { light: '', dark: 'dark' },
    }),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
