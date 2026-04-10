import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';

// テーマから定義したタイポグラフィトークン
const FONT_SIZES = [
  { token: 'xs', value: '0.75rem' },
  { token: 'sm', value: '0.875rem' },
  { token: 'md', value: '1rem' },
  { token: 'lg', value: '1.125rem' },
  { token: 'xl', value: '1.25rem' },
  { token: '2xl', value: '1.5rem' },
  { token: '3xl', value: '1.875rem' },
  { token: '4xl', value: '2.25rem' },
  { token: '5xl', value: '3rem' },
  { token: '6xl', value: '3.75rem' },
  { token: '7xl', value: '4.5rem' },
];

const LINE_HEIGHTS = [
  { token: 'xs', value: '1.333' },
  { token: 'sm', value: '1.429' },
  { token: 'md', value: '1.5' },
  { token: 'lg', value: '1.556' },
  { token: 'xl', value: '1.5' },
  { token: '2xl', value: '1.333' },
  { token: '3xl', value: '1.267' },
  { token: '4xl', value: '1.222' },
  { token: '5xl', value: '1.25' },
  { token: '6xl', value: '1.2' },
  { token: '7xl', value: '1.278' },
];

const LETTER_SPACINGS = [
  { token: 'normal', value: '0' },
  { token: '4xl', value: '-0.011em' },
  { token: '5xl', value: '-0.008em' },
  { token: '6xl', value: '-0.007em' },
  { token: '7xl', value: '-0.006em' },
];

const SAMPLE_TEXT = 'いろはにほへと散りぬるを ABCDabcd 1234';

/** フォントサイズ一覧 */
function FontSizes() {
  return (
    <Flex direction="column" gap="6">
      <Text fontSize="xl" fontWeight="bold">
        Font: Sawarabi Gothic
      </Text>
      {FONT_SIZES.map(({ token, value }) => (
        <Flex key={token} align="baseline" gap="4">
          <Box width="80px" flexShrink={0}>
            <Text fontSize="sm" color="fg.muted">
              {token}
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              {value}
            </Text>
          </Box>
          <Text fontSize={token}>{SAMPLE_TEXT}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

/** 行間一覧 */
function LineHeights() {
  return (
    <Flex direction="column" gap="6">
      <Text fontSize="xl" fontWeight="bold">
        Line Heights
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        {LINE_HEIGHTS.map(({ token, value }) => (
          <Box key={token} p="3" border="1px solid" borderColor="border.subtle" borderRadius="md">
            <Text fontSize="xs" color="fg.muted" mb="1">
              {token} ({value})
            </Text>
            <Text fontSize="md" lineHeight={value}>
              短歌は五・七・五・七・七の三十一音で構成される日本の伝統的な詩形です。
            </Text>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

/** 字間一覧 */
function LetterSpacings() {
  return (
    <Flex direction="column" gap="6">
      <Text fontSize="xl" fontWeight="bold">
        Letter Spacings
      </Text>
      {LETTER_SPACINGS.map(({ token, value }) => (
        <Flex key={token} align="baseline" gap="4">
          <Box width="100px" flexShrink={0}>
            <Text fontSize="sm" color="fg.muted">
              {token}
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              {value}
            </Text>
          </Box>
          <Text fontSize="2xl" letterSpacing={value}>
            {SAMPLE_TEXT}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

/** タイポグラフィトークン全体 */
function Typography() {
  return (
    <Flex direction="column" gap="12">
      <FontSizes />
      <LineHeights />
      <LetterSpacings />
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
