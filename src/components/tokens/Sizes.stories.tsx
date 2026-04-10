import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';

const SPACING_TOKENS = [
  { token: '0', value: '0' },
  { token: '0.5', value: '0.125rem' },
  { token: '1', value: '0.25rem' },
  { token: '1.5', value: '0.375rem' },
  { token: '2', value: '0.5rem' },
  { token: '2.5', value: '0.625rem' },
  { token: '3', value: '0.75rem' },
  { token: '3.5', value: '0.875rem' },
  { token: '4', value: '1rem' },
  { token: '5', value: '1.25rem' },
  { token: '6', value: '1.5rem' },
  { token: '7', value: '1.75rem' },
  { token: '8', value: '2rem' },
  { token: '9', value: '2.25rem' },
  { token: '10', value: '2.5rem' },
  { token: '12', value: '3rem' },
  { token: '14', value: '3.5rem' },
  { token: '16', value: '4rem' },
  { token: '20', value: '5rem' },
  { token: '24', value: '6rem' },
  { token: '28', value: '7rem' },
  { token: '32', value: '8rem' },
];

const BREAKPOINTS = [
  { token: 'sm', value: '480px' },
  { token: 'md', value: '768px' },
  { token: 'lg', value: '1024px' },
  { token: 'xl', value: '1280px' },
  { token: '2xl', value: '1536px' },
];

/** スペーシング一覧 */
function Spacing() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Spacing
      </Text>
      <Flex direction="column" gap="2">
        {SPACING_TOKENS.map(({ token, value }) => (
          <Flex key={token} align="center" gap="4">
            <Box width="60px" flexShrink={0}>
              <Text fontSize="sm" color="fg.muted">
                {token}
              </Text>
            </Box>
            <Box width="60px" flexShrink={0}>
              <Text fontSize="xs" color="fg.subtle">
                {value}
              </Text>
            </Box>
            <Box height="16px" width={value} bg="blue.solid" borderRadius="sm" />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

/** ブレイクポイント一覧 */
function Breakpoints() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Breakpoints
      </Text>
      <Grid templateColumns="auto auto 1fr" gap="3" alignItems="center">
        {BREAKPOINTS.map(({ token, value }) => (
          <>
            <Text key={`${token}-name`} fontSize="sm" fontWeight="bold">
              {token}
            </Text>
            <Text key={`${token}-val`} fontSize="sm" color="fg.muted">
              {value}
            </Text>
            <Box
              key={`${token}-bar`}
              height="24px"
              width={value}
              maxWidth="100%"
              bg="teal.solid"
              borderRadius="sm"
            />
          </>
        ))}
      </Grid>
    </Box>
  );
}

/** サイズ・スペーシング全体 */
function Sizes() {
  return (
    <Flex direction="column" gap="12" p="4">
      <Spacing />
      <Breakpoints />
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Sizes & Spacing',
  component: Sizes,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Sizes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
