import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';

const SHADOW_TOKENS = [
  { token: 'xs', label: 'Extra Small' },
  { token: 'sm', label: 'Small' },
  { token: 'md', label: 'Medium' },
  { token: 'lg', label: 'Large' },
  { token: 'xl', label: 'Extra Large' },
  { token: '2xl', label: '2X Large' },
  { token: 'inner', label: 'Inner' },
  { token: 'inset', label: 'Inset' },
];

/** シャドウ一覧 */
function Shadows() {
  return (
    <Flex direction="column" gap="6" p="4">
      <Text fontSize="xl" fontWeight="bold">
        Shadows
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {SHADOW_TOKENS.map(({ token, label }) => (
          <Flex key={token} direction="column" align="center" gap="3">
            <Box width="120px" height="80px" borderRadius="lg" bg="bg.panel" shadow={token} />
            <Box textAlign="center">
              <Text fontSize="sm" fontWeight="bold">
                {token}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {label}
              </Text>
            </Box>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Shadows',
  component: Shadows,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Shadows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
