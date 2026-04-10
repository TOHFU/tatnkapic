import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';

// カラーパレット名一覧
const COLOR_NAMES = [
  'gray',
  'red',
  'pink',
  'purple',
  'cyan',
  'blue',
  'teal',
  'green',
  'yellow',
  'orange',
] as const;

const SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;

/** 色見本スウォッチ */
function ColorSwatch({ token, color }: { token: string; color: string }) {
  return (
    <Flex direction="column" align="center" gap="1">
      <Box
        width="64px"
        height="64px"
        borderRadius="md"
        bg={color}
        border="1px solid"
        borderColor="gray.200"
      />
      <Text fontSize="xs" color="fg.muted" textAlign="center">
        {token}
      </Text>
    </Flex>
  );
}

/** カラーパレット一覧 */
function ColorPalette() {
  return (
    <Flex direction="column" gap="8">
      {COLOR_NAMES.map((name) => (
        <Box key={name}>
          <Text fontSize="lg" fontWeight="bold" mb="3" textTransform="capitalize">
            {name}
          </Text>
          <Grid templateColumns="repeat(11, 1fr)" gap="3">
            {SHADES.map((shade) => (
              <ColorSwatch key={shade} token={shade} color={`${name}.${shade}`} />
            ))}
          </Grid>
        </Box>
      ))}
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
