import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';

// セマンティックトークン定義（bg/fg/borderの各バリアント）
const BG_TOKENS = [
  'bg',
  'bg.subtle',
  'bg.muted',
  'bg.emphasized',
  'bg.inverted',
  'bg.panel',
  'bg.error',
  'bg.warning',
  'bg.success',
  'bg.info',
];

const FG_TOKENS = [
  'fg',
  'fg.muted',
  'fg.subtle',
  'fg.inverted',
  'fg.error',
  'fg.warning',
  'fg.success',
  'fg.info',
];

const BORDER_TOKENS = [
  'border',
  'border.subtle',
  'border.muted',
  'border.emphasized',
  'border.inverted',
  'border.error',
  'border.warning',
  'border.success',
  'border.info',
];

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
];

const COLOR_VARIANTS = ['solid', 'contrast', 'fg', 'subtle', 'muted', 'emphasized', 'focusRing'];

/** 背景セマンティックトークン */
function BgTokens() {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Background (bg)
      </Text>
      <Grid templateColumns="repeat(5, 1fr)" gap="3">
        {BG_TOKENS.map((token) => (
          <Flex key={token} direction="column" align="center" gap="1">
            <Box
              width="80px"
              height="56px"
              borderRadius="md"
              bg={token}
              border="1px solid"
              borderColor="border.subtle"
            />
            <Text fontSize="xs" color="fg.muted" textAlign="center">
              {token}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
}

/** 前景セマンティックトークン */
function FgTokens() {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Foreground (fg)
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap="3">
        {FG_TOKENS.map((token) => (
          <Flex key={token} direction="column" align="center" gap="1">
            <Box
              width="80px"
              height="56px"
              borderRadius="md"
              bg="bg.panel"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderColor="border.subtle"
            >
              <Text fontSize="lg" fontWeight="bold" color={token}>
                Aa
              </Text>
            </Box>
            <Text fontSize="xs" color="fg.muted" textAlign="center">
              {token}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
}

/** ボーダーセマンティックトークン */
function BorderTokens() {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Border
      </Text>
      <Grid templateColumns="repeat(5, 1fr)" gap="3">
        {BORDER_TOKENS.map((token) => (
          <Flex key={token} direction="column" align="center" gap="1">
            <Box
              width="80px"
              height="56px"
              borderRadius="md"
              bg="bg.panel"
              border="2px solid"
              borderColor={token}
            />
            <Text fontSize="xs" color="fg.muted" textAlign="center">
              {token}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
}

/** 各色のセマンティックトークン */
function PerColorTokens() {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Per-Color Semantic Tokens
      </Text>
      <Grid templateColumns="auto repeat(7, 1fr)" gap="3" alignItems="center">
        {/* ヘッダー行 */}
        <Box />
        {COLOR_VARIANTS.map((variant) => (
          <Text key={variant} fontSize="xs" color="fg.muted" textAlign="center">
            {variant}
          </Text>
        ))}
        {/* 各色の行 */}
        {COLOR_NAMES.map((name) => (
          <>
            <Text key={`${name}-label`} fontSize="sm" fontWeight="bold" textTransform="capitalize">
              {name}
            </Text>
            {COLOR_VARIANTS.map((variant) => {
              const token = `${name}.${variant}`;
              return (
                <Box
                  key={token}
                  width="48px"
                  height="32px"
                  borderRadius="sm"
                  bg={`colorPalette.${variant}`}
                  colorPalette={name}
                  border="1px solid"
                  borderColor="border.subtle"
                  mx="auto"
                  title={token}
                />
              );
            })}
          </>
        ))}
      </Grid>
    </Box>
  );
}

/** セマンティックトークン全体 */
function SemanticTokens() {
  return (
    <Flex direction="column" gap="12" p="4">
      <BgTokens />
      <FgTokens />
      <BorderTokens />
      <PerColorTokens />
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Semantic Tokens',
  component: SemanticTokens,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SemanticTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
