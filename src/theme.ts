import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Figmaから抽出したデザイントークン
 * @see https://www.figma.com/design/E5EL7sYy7EgkHicdsN51Zo/TankaPic?node-id=12-184
 */
const config = defineConfig({
  theme: {
    tokens: {
      // カラートークン
      colors: {
        gray: {
          50: { value: '#fafafa' },
          100: { value: '#f4f4f5' },
          200: { value: '#e4e4e7' },
          300: { value: '#d4d4d8' },
          400: { value: '#a1a1aa' },
          500: { value: '#71717a' },
          600: { value: '#52525b' },
          700: { value: '#3f3f46' },
          800: { value: '#27272a' },
          900: { value: '#18181b' },
          950: { value: '#111111' },
        },
        red: {
          50: { value: '#fef2f2' },
          100: { value: '#fee2e2' },
          200: { value: '#fecaca' },
          300: { value: '#fca5a5' },
          400: { value: '#f87171' },
          500: { value: '#ef4444' },
          600: { value: '#dc2626' },
          700: { value: '#991919' },
          800: { value: '#511111' },
          900: { value: '#300c0c' },
          950: { value: '#1f0808' },
        },
        pink: {
          50: { value: '#FDF5F2' },
          100: { value: '#FBEDE8' },
          200: { value: '#F6DCD4' },
          300: { value: '#F0C0B1' },
          400: { value: '#E69880' },
          500: { value: '#DE7656' },
          600: { value: '#D5542D' },
          700: { value: '#9C3C1F' },
          800: { value: '#672814' },
          900: { value: '#3F180C' },
          950: { value: '#2B1008' },
        },
        purple: {
          50: { value: '#faf5ff' },
          100: { value: '#f3e8ff' },
          200: { value: '#e9d5ff' },
          300: { value: '#d8b4fe' },
          400: { value: '#c084fc' },
          500: { value: '#a855f7' },
          600: { value: '#9333ea' },
          700: { value: '#641ba3' },
          800: { value: '#4a1772' },
          900: { value: '#2f0553' },
          950: { value: '#1a032e' },
        },
        cyan: {
          50: { value: '#ecfeff' },
          100: { value: '#cffafe' },
          200: { value: '#a5f3fc' },
          300: { value: '#67e8f9' },
          400: { value: '#22d3ee' },
          500: { value: '#06b6d4' },
          600: { value: '#0891b2' },
          700: { value: '#0c5c72' },
          800: { value: '#134152' },
          900: { value: '#072a38' },
          950: { value: '#051b24' },
        },
        blue: {
          50: { value: '#EFFAFF' },
          100: { value: '#DBF2FE' },
          200: { value: '#BFE9FE' },
          300: { value: '#A5E0FD' },
          400: { value: '#5EC7FC' },
          500: { value: '#36B9FB' },
          600: { value: '#16AEFA' },
          700: { value: '#047DB9' },
          800: { value: '#03608F' },
          900: { value: '#023E5C' },
          950: { value: '#012639' },
        },
        teal: {
          50: { value: '#f0fdfa' },
          100: { value: '#ccfbf1' },
          200: { value: '#99f6e4' },
          300: { value: '#5eead4' },
          400: { value: '#2dd4bf' },
          500: { value: '#14b8a6' },
          600: { value: '#0d9488' },
          700: { value: '#0c5d56' },
          800: { value: '#114240' },
          900: { value: '#032726' },
          950: { value: '#021716' },
        },
        green: {
          50: { value: '#F2FBF5' },
          100: { value: '#E3F5E8' },
          200: { value: '#C6ECD0' },
          300: { value: '#98DDAB' },
          400: { value: '#4FC46E' },
          500: { value: '#3AAD59' },
          600: { value: '#2B8142' },
          700: { value: '#1F5C2F' },
          800: { value: '#174523' },
          900: { value: '#0B2010' },
          950: { value: '#07150B' },
        },
        yellow: {
          50: { value: '#F5F5F1' },
          100: { value: '#E6E5DB' },
          200: { value: '#CFCCB9' },
          300: { value: '#FFDD54' },
          400: { value: '#FFD00F' },
          500: { value: '#F2C200' },
          600: { value: '#CEA500' },
          700: { value: '#8D7100' },
          800: { value: '#4E4A35' },
          900: { value: '#312E21' },
          950: { value: '#1A1912' },
        },
        orange: {
          50: { value: '#FEF0EE' },
          100: { value: '#FEDDD6' },
          200: { value: '#FB8C76' },
          300: { value: '#FB8C76' },
          400: { value: '#F95D3E' },
          500: { value: '#F83D17' },
          600: { value: '#F95C3B' },
          700: { value: '#971D05' },
          800: { value: '#781704' },
          900: { value: '#3F0C02' },
          950: { value: '#250701' },
        },
      },

      // タイポグラフィトークン
      fonts: {
        body: { value: '"Noto Sans JP", sans-serif' },
        heading: { value: '"Noto Sans JP", sans-serif' },
      },
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '1.875rem' },
        '4xl': { value: '2.25rem' },
        '5xl': { value: '3rem' },
        '6xl': { value: '3.75rem' },
        '7xl': { value: '4.5rem' },
      },
      fontWeights: {
        normal: { value: '400' },
      },
      lineHeights: {
        xs: { value: '1.333' },
        sm: { value: '1.429' },
        md: { value: '1.5' },
        lg: { value: '1.556' },
        xl: { value: '1.5' },
        '2xl': { value: '1.333' },
        '3xl': { value: '1.267' },
        '4xl': { value: '1.222' },
        '5xl': { value: '1.25' },
        '6xl': { value: '1.2' },
        '7xl': { value: '1.278' },
      },
      letterSpacings: {
        normal: { value: '0' },
        '4xl': { value: '-0.011em' },
        '5xl': { value: '-0.008em' },
        '6xl': { value: '-0.007em' },
        '7xl': { value: '-0.006em' },
      },

      // サイズトークン
      sizes: {
        '0': { value: '0' },
        '0.5': { value: '0.125rem' },
        '1': { value: '0.25rem' },
        '1.5': { value: '0.375rem' },
        '2': { value: '0.5rem' },
        '2.5': { value: '0.625rem' },
        '3': { value: '0.75rem' },
        '3.5': { value: '0.875rem' },
        '4': { value: '1rem' },
        '4.5': { value: '1.125rem' },
        '5': { value: '1.25rem' },
        '6': { value: '1.5rem' },
        '7': { value: '1.75rem' },
        '8': { value: '2rem' },
        '9': { value: '2.25rem' },
        '10': { value: '2.5rem' },
        '11': { value: '2.75rem' },
        '12': { value: '3rem' },
        '14': { value: '3.5rem' },
        '16': { value: '4rem' },
        '20': { value: '5rem' },
        '24': { value: '6rem' },
        '28': { value: '7rem' },
        '32': { value: '8rem' },
        '36': { value: '9rem' },
        '40': { value: '10rem' },
        '44': { value: '11rem' },
        '48': { value: '12rem' },
        '52': { value: '13rem' },
        '56': { value: '14rem' },
        '60': { value: '15rem' },
        '64': { value: '16rem' },
        '72': { value: '18rem' },
        '80': { value: '20rem' },
        '96': { value: '24rem' },
      },
      spacing: {
        '0': { value: '0' },
        '0.5': { value: '0.125rem' },
        '1': { value: '0.25rem' },
        '1.5': { value: '0.375rem' },
        '2': { value: '0.5rem' },
        '2.5': { value: '0.625rem' },
        '3': { value: '0.75rem' },
        '3.5': { value: '0.875rem' },
        '4': { value: '1rem' },
        '4.5': { value: '1.125rem' },
        '5': { value: '1.25rem' },
        '6': { value: '1.5rem' },
        '7': { value: '1.75rem' },
        '8': { value: '2rem' },
        '9': { value: '2.25rem' },
        '10': { value: '2.5rem' },
        '11': { value: '2.75rem' },
        '12': { value: '3rem' },
        '14': { value: '3.5rem' },
        '16': { value: '4rem' },
        '20': { value: '5rem' },
        '24': { value: '6rem' },
        '28': { value: '7rem' },
        '32': { value: '8rem' },
        '36': { value: '9rem' },
        '40': { value: '10rem' },
        '44': { value: '11rem' },
        '48': { value: '12rem' },
        '52': { value: '13rem' },
        '56': { value: '14rem' },
        '60': { value: '15rem' },
        '64': { value: '16rem' },
        '72': { value: '18rem' },
        '80': { value: '20rem' },
        '96': { value: '24rem' },
      },

      // シャドウトークン
      shadows: {
        xs: {
          value: '0px 1px 2px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.2)',
        },
        sm: {
          value: '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
        },
        md: {
          value: '0px 4px 8px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
        },
        lg: {
          value: '0px 8px 16px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
        },
        xl: {
          value: '0px 16px 24px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
        },
        '2xl': {
          value: '0px 24px 40px 0px rgba(24, 24, 27, 0.16), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
        },
        inner: {
          value: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
        },
        inset: {
          value: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.05)',
        },
      },

      // 角丸トークン
      radii: {
        none: { value: '0' },
        '2xs': { value: '1px' },
        xs: { value: '2px' },
        sm: { value: '4px' },
        md: { value: '12px' },
        lg: { value: '16px' },
        xl: { value: '24px' },
        '2xl': { value: '32px' },
        '3xl': { value: '36px' },
        '4xl': { value: '40px' },
        full: { value: '9999px' },
      },
    },

    // ブレイクポイントトークン
    breakpoints: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    // セマンティックトークン（ライト/ダーク対応）
    semanticTokens: {
      colors: {
        // 背景
        bg: {
          DEFAULT: {
            value: {
              _light: '{colors.yellow.50}',
              _dark: '{colors.yellow.900}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.yellow.100}',
              _dark: '{colors.yellow.800}',
            },
          },
          muted: {
            value: {
              _light: '{colors.yellow.200}',
              _dark: '{colors.yellow.700}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.yellow.300}',
              _dark: '{colors.yellow.600}',
            },
          },
          inverted: {
            value: {
              _light: '{colors.yellow.800}',
              _dark: '{colors.yellow.50}',
            },
          },
          panel: {
            value: { _light: '#FFFFFF', _dark: '{colors.gray.900}' },
          },
          error: {
            value: { _light: '{colors.red.50}', _dark: '{colors.red.950}' },
          },
          warning: {
            value: {
              _light: '{colors.orange.50}',
              _dark: '{colors.orange.950}',
            },
          },
          success: {
            value: {
              _light: '{colors.green.50}',
              _dark: '{colors.green.950}',
            },
          },
          info: {
            value: { _light: '{colors.blue.50}', _dark: '{colors.blue.950}' },
          },
        },
        // 前景（テキスト）
        fg: {
          DEFAULT: {
            value: {
              _light: '{colors.gray.800}',
              _dark: '{colors.gray.100}',
            },
          },
          muted: {
            value: {
              _light: '{colors.gray.600}',
              _dark: '{colors.gray.400}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.gray.400}',
              _dark: '{colors.gray.500}',
            },
          },
          inverted: {
            value: {
              _light: '{colors.gray.50}',
              _dark: '{colors.gray.900}',
            },
          },
          error: {
            value: { _light: '{colors.red.500}', _dark: '{colors.red.400}' },
          },
          warning: {
            value: {
              _light: '{colors.orange.600}',
              _dark: '{colors.orange.400}',
            },
          },
          success: {
            value: {
              _light: '{colors.green.600}',
              _dark: '{colors.green.400}',
            },
          },
          info: {
            value: {
              _light: '{colors.blue.600}',
              _dark: '{colors.blue.400}',
            },
          },
        },
        // ボーダー
        border: {
          DEFAULT: {
            value: {
              _light: '{colors.yellow.200}',
              _dark: '{colors.yellow.700}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.yellow.100}',
              _dark: '{colors.yellow.800}',
            },
          },
          muted: {
            value: {
              _light: '{colors.yellow.200}',
              _dark: '{colors.yellow.700}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.yellow.300}',
              _dark: '{colors.yellow.600}',
            },
          },
          inverted: {
            value: {
              _light: '{colors.yellow.800}',
              _dark: '{colors.yellow.100}',
            },
          },
          error: {
            value: { _light: '{colors.red.500}', _dark: '{colors.red.400}' },
          },
          warning: {
            value: {
              _light: '{colors.orange.500}',
              _dark: '{colors.orange.400}',
            },
          },
          success: {
            value: {
              _light: '{colors.green.500}',
              _dark: '{colors.green.400}',
            },
          },
          info: {
            value: {
              _light: '{colors.blue.500}',
              _dark: '{colors.blue.400}',
            },
          },
        },
        // 各色のセマンティックトークン
        gray: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.gray.800}',
              _dark: '{colors.gray.200}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.gray.100}',
              _dark: '{colors.gray.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.gray.200}',
              _dark: '{colors.gray.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.gray.300}',
              _dark: '{colors.gray.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.gray.900}',
              _dark: '{colors.gray.100}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.gray.800}',
              _dark: '{colors.gray.200}',
            },
          },
        },
        red: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.red.700}',
              _dark: '{colors.red.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.red.100}',
              _dark: '{colors.red.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.red.200}',
              _dark: '{colors.red.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.red.300}',
              _dark: '{colors.red.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.red.600}',
              _dark: '{colors.red.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.red.600}',
              _dark: '{colors.red.500}',
            },
          },
        },
        pink: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.pink.700}',
              _dark: '{colors.pink.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.pink.100}',
              _dark: '{colors.pink.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.pink.200}',
              _dark: '{colors.pink.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.pink.300}',
              _dark: '{colors.pink.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.pink.600}',
              _dark: '{colors.pink.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.pink.600}',
              _dark: '{colors.pink.500}',
            },
          },
        },
        purple: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.purple.700}',
              _dark: '{colors.purple.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.purple.100}',
              _dark: '{colors.purple.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.purple.200}',
              _dark: '{colors.purple.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.purple.300}',
              _dark: '{colors.purple.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.purple.600}',
              _dark: '{colors.purple.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.purple.600}',
              _dark: '{colors.purple.500}',
            },
          },
        },
        cyan: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.cyan.700}',
              _dark: '{colors.cyan.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.cyan.100}',
              _dark: '{colors.cyan.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.cyan.200}',
              _dark: '{colors.cyan.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.cyan.300}',
              _dark: '{colors.cyan.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.cyan.600}',
              _dark: '{colors.cyan.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.cyan.600}',
              _dark: '{colors.cyan.500}',
            },
          },
        },
        blue: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.blue.700}',
              _dark: '{colors.blue.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.blue.100}',
              _dark: '{colors.blue.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.blue.200}',
              _dark: '{colors.blue.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.blue.300}',
              _dark: '{colors.blue.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.blue.600}',
              _dark: '{colors.blue.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.blue.600}',
              _dark: '{colors.blue.500}',
            },
          },
        },
        teal: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.teal.700}',
              _dark: '{colors.teal.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.teal.100}',
              _dark: '{colors.teal.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.teal.200}',
              _dark: '{colors.teal.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.teal.300}',
              _dark: '{colors.teal.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.teal.600}',
              _dark: '{colors.teal.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.teal.600}',
              _dark: '{colors.teal.500}',
            },
          },
        },
        green: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.green.700}',
              _dark: '{colors.green.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.green.100}',
              _dark: '{colors.green.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.green.200}',
              _dark: '{colors.green.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.green.300}',
              _dark: '{colors.green.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.green.600}',
              _dark: '{colors.green.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.green.600}',
              _dark: '{colors.green.500}',
            },
          },
        },
        yellow: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.yellow.700}',
              _dark: '{colors.yellow.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.yellow.100}',
              _dark: '{colors.yellow.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.yellow.200}',
              _dark: '{colors.yellow.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.yellow.300}',
              _dark: '{colors.yellow.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.yellow.600}',
              _dark: '{colors.yellow.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.yellow.600}',
              _dark: '{colors.yellow.500}',
            },
          },
        },
        orange: {
          contrast: { value: { _light: '#FFFFFF', _dark: '#FFFFFF' } },
          fg: {
            value: {
              _light: '{colors.orange.700}',
              _dark: '{colors.orange.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.orange.100}',
              _dark: '{colors.orange.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.orange.200}',
              _dark: '{colors.orange.800}',
            },
          },
          emphasized: {
            value: {
              _light: '{colors.orange.300}',
              _dark: '{colors.orange.700}',
            },
          },
          solid: {
            value: {
              _light: '{colors.orange.600}',
              _dark: '{colors.orange.500}',
            },
          },
          focusRing: {
            value: {
              _light: '{colors.orange.600}',
              _dark: '{colors.orange.500}',
            },
          },
        },
      },
      // 角丸セマンティックトークン
      radii: {
        l1: { value: '{radii.none}' },
        l2: { value: '{radii.none}' },
        l3: { value: '{radii.xs}' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
