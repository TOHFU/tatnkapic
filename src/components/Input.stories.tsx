import type { Meta, StoryObj } from '@storybook/react';
import type { InputProps } from '@chakra-ui/react';
import { Badge, Box, Field, Flex, Input, InputGroup, Stack, Text } from '@chakra-ui/react';
import { LuMail, LuSearch, LuChevronDown } from 'react-icons/lu';

/** Inputコンポーネントの全バリエーション */
function InputShowcase() {
  return (
    <Stack gap="12" maxW="480px">
      {/* バリアント */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Variants
        </Text>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Outline（デフォルト）</Field.Label>
            <Input variant="outline" placeholder="example@chakraui" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Subtle</Field.Label>
            <Input variant="subtle" placeholder="example@chakraui" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Flushed</Field.Label>
            <Input variant="flushed" placeholder="example@chakraui" />
          </Field.Root>
        </Stack>
      </Box>

      {/* サイズ */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Sizes
        </Text>
        <Stack gap="3">
          {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
            <Input key={size} size={size} placeholder={`Size: ${size}`} />
          ))}
        </Stack>
      </Box>

      {/* ステート */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          States
        </Text>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Default</Field.Label>
            <Input placeholder="example@chakraui" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Filled</Field.Label>
            <Input defaultValue="john@example.com" />
          </Field.Root>
          <Field.Root disabled>
            <Field.Label>Disabled</Field.Label>
            <Input placeholder="example@chakraui" />
          </Field.Root>
          <Field.Root invalid>
            <Field.Label>Invalid</Field.Label>
            <Input placeholder="example@chakraui" />
            <Field.ErrorText>This is an error text</Field.ErrorText>
          </Field.Root>
        </Stack>
      </Box>

      {/* ラベル付きフィールド */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Field with Label
        </Text>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input placeholder="example@chakraui" />
            <Field.HelperText>This is a helper text to help user.</Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Email
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="example@chakraui" />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Email
              <Field.RequiredIndicator
                fallback={
                  <Badge size="xs" variant="surface">
                    optional
                  </Badge>
                }
              />
            </Field.Label>
            <Input placeholder="example@chakraui" />
          </Field.Root>
        </Stack>
      </Box>

      {/* アドオン */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Addons
        </Text>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Left Addon</Field.Label>
            <InputGroup startAddon="https://">
              <Input placeholder="yoursite.com" />
            </InputGroup>
          </Field.Root>
          <Field.Root>
            <Field.Label>Right Addon</Field.Label>
            <InputGroup endAddon=".com">
              <Input placeholder="yoursite" />
            </InputGroup>
          </Field.Root>
        </Stack>
      </Box>

      {/* エレメント（アイコン付き） */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          With Elements
        </Text>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Left Element</Field.Label>
            <InputGroup startElement={<LuMail />}>
              <Input placeholder="example@chakraui" />
            </InputGroup>
          </Field.Root>
          <Field.Root>
            <Field.Label>Right Element</Field.Label>
            <InputGroup endElement={<LuChevronDown />}>
              <Input placeholder="Select country" />
            </InputGroup>
          </Field.Root>
          <Field.Root>
            <Field.Label>Search</Field.Label>
            <InputGroup startElement={<LuSearch />}>
              <Input placeholder="Search..." />
            </InputGroup>
          </Field.Root>
        </Stack>
      </Box>
    </Stack>
  );
}

const meta = {
  title: 'Components/Input',
  component: InputShowcase,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 全バリエーション一覧 */
export const Overview: Story = {};

/** バリアント別（Controlsでpropsを操作可能） */
export const Variants: StoryObj<InputProps> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'subtle', 'flushed'],
      description: 'The variant of the component',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the component',
    },
    colorPalette: {
      control: 'select',
      options: [
        'gray',
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'cyan',
        'purple',
        'pink',
      ],
      description: 'The color palette of the component',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  args: {
    variant: 'outline',
    size: 'md',
    colorPalette: 'gray',
    placeholder: 'example@chakraui',
    disabled: false,
  },
  render: (args) => (
    <Box maxW="320px">
      <Input {...args} />
    </Box>
  ),
};

/** サイズ別 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="3" maxW="320px">
      {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Input key={size} size={size} placeholder={`Size: ${size}`} />
      ))}
    </Stack>
  ),
};

/** ステート別 */
export const States: Story = {
  render: () => (
    <Stack gap="4" maxW="320px">
      <Field.Root>
        <Field.Label>Default</Field.Label>
        <Input placeholder="example@chakraui" />
      </Field.Root>
      <Field.Root disabled>
        <Field.Label>Disabled</Field.Label>
        <Input placeholder="example@chakraui" />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>Invalid</Field.Label>
        <Input placeholder="example@chakraui" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
    </Stack>
  ),
};

/** アドオン付き */
export const WithAddons: Story = {
  render: () => (
    <Stack gap="4" maxW="400px">
      <InputGroup startAddon="https://">
        <Input placeholder="yoursite.com" />
      </InputGroup>
      <InputGroup endAddon=".com">
        <Input placeholder="yoursite" />
      </InputGroup>
      <InputGroup startAddon="$" endAddon="USD">
        <Input placeholder="0.00" />
      </InputGroup>
    </Stack>
  ),
};

/** エレメント付き */
export const WithElements: Story = {
  render: () => (
    <Stack gap="4" maxW="320px">
      <InputGroup startElement={<LuMail />}>
        <Input placeholder="example@chakraui" />
      </InputGroup>
      <InputGroup endElement={<LuChevronDown />}>
        <Input placeholder="Select country" />
      </InputGroup>
      <InputGroup startElement={<LuSearch />}>
        <Input placeholder="Search..." />
      </InputGroup>
    </Stack>
  ),
};

/** フィールドラベル付き */
export const WithField: Story = {
  render: () => (
    <Stack gap="4" maxW="320px">
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input placeholder="example@chakraui" />
        <Field.HelperText>This is a helper text to help user.</Field.HelperText>
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="example@chakraui" />
      </Field.Root>
      <Field.Root>
        <Field.Label>
          Email
          <Field.RequiredIndicator
            fallback={
              <Badge size="xs" variant="surface">
                optional
              </Badge>
            }
          />
        </Field.Label>
        <Input placeholder="example@chakraui" />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input placeholder="example@chakraui" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
    </Stack>
  ),
};

/** バリアント × ステート マトリクス */
export const VariantStateMatrix: Story = {
  render: () => {
    const variants = ['outline', 'subtle', 'flushed'] as const;
    const states = ['default', 'focus', 'disabled', 'invalid'] as const;
    return (
      <Stack gap="8">
        <Flex gap="4">
          <Box width="100px" />
          {states.map((state) => (
            <Box key={state} width="200px">
              <Text fontSize="sm" fontWeight="bold" textTransform="capitalize">
                {state}
              </Text>
            </Box>
          ))}
        </Flex>
        {variants.map((variant) => (
          <Flex key={variant} gap="4" align="center">
            <Box width="100px">
              <Text fontSize="sm" fontWeight="bold" textTransform="capitalize">
                {variant}
              </Text>
            </Box>
            <Box width="200px">
              <Input variant={variant} placeholder="example@chakraui" />
            </Box>
            <Box width="200px">
              <Input
                variant={variant}
                placeholder="example@chakraui"
                autoFocus={variant === 'outline'}
              />
            </Box>
            <Box width="200px">
              <Field.Root disabled>
                <Input variant={variant} placeholder="example@chakraui" />
              </Field.Root>
            </Box>
            <Box width="200px">
              <Field.Root invalid>
                <Input variant={variant} placeholder="example@chakraui" />
              </Field.Root>
            </Box>
          </Flex>
        ))}
      </Stack>
    );
  },
};
