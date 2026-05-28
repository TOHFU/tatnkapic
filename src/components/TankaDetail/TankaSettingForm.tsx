// 短歌設定フォームコンポーネント
'use client';

import {
  Box,
  Button,
  ColorPicker,
  Combobox,
  Drawer,
  Field,
  HStack,
  Input,
  Portal,
  RadioGroup,
  SegmentGroup,
  Separator,
  Slider,
  TagsInput,
  Text,
  Textarea,
  VStack,
  parseColor,
  useCombobox,
  useFilter,
  useListCollection,
  useTagsInput,
} from '@chakra-ui/react';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuCheck,
  LuDownload,
  LuPalette,
  LuPipette,
  LuSave,
  LuTrash2,
  LuUndo2,
} from 'react-icons/lu';
import type {
  BackgroundType,
  FontColorType,
  FontFamily,
  TankaMenu,
  TankaSettings,
  TextAlignment,
} from '@/types/tanka';
import { useEffect, useId, useRef } from 'react';

const AspectIcons = {
  Auto: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.1514 20.056C15.1514 19.528 14.8581 19.264 14.2714 19.264C13.6847 19.264 13.2314 19.4133 12.9114 19.712L12.5114 19.328C12.9327 18.9067 13.5034 18.696 14.2234 18.696H14.2634C15.3141 18.696 15.8394 19.2667 15.8394 20.408V22.216C15.8394 22.4293 15.9194 22.696 16.0794 23.016L15.4954 23C15.2767 22.872 15.1567 22.6533 15.1354 22.344C14.8794 22.7867 14.5167 23.0347 14.0474 23.088C13.5301 23.088 13.1381 22.9707 12.8714 22.736C12.6047 22.5013 12.4714 22.2187 12.4714 21.888V21.864C12.4714 21.5227 12.5514 21.2187 12.7114 20.952C13.0261 20.456 13.8341 20.1947 15.1354 20.168L15.1514 20.056ZM13.3274 22.216C13.4021 22.3333 13.6021 22.392 13.9274 22.392C14.2474 22.392 14.4954 22.3307 14.6714 22.208C14.8527 22.0907 14.9887 21.88 15.0794 21.576C15.1167 21.4693 15.1354 21.3867 15.1354 21.328V20.696C14.5114 20.7173 14.0341 20.8293 13.7034 21.032C13.3727 21.2293 13.2074 21.4827 13.2074 21.792C13.2074 21.9627 13.2474 22.104 13.3274 22.216ZM17.5073 18.816V20.984C17.5073 21.96 17.7899 22.448 18.3553 22.448C19.1339 22.448 19.5233 21.928 19.5233 20.888V18.816H20.2673V23.024H19.5233V22.36C19.3206 22.8667 18.9099 23.12 18.2913 23.12C17.2726 23.1093 16.7633 22.4507 16.7633 21.144V18.816H17.5073ZM23.364 22.264L23.412 22.552C23.2893 22.888 22.964 23.056 22.436 23.056C21.7 23.056 21.332 22.68 21.332 21.928V19.48H20.748V18.896H21.332V17.656H22.06V18.896H23.252V19.48H22.06V21.816C22.06 22.2533 22.2813 22.472 22.724 22.472C23.012 22.472 23.2253 22.4027 23.364 22.264ZM27.0723 19.296C27.4616 19.7173 27.6563 20.2453 27.6563 20.88C27.6563 21.5147 27.4589 22.0533 27.0643 22.496C26.6749 22.9387 26.1949 23.16 25.6243 23.16C25.0536 23.16 24.5816 22.9387 24.2083 22.496C23.8349 22.0533 23.6483 21.5147 23.6483 20.88C23.6483 20.2453 23.8349 19.7173 24.2083 19.296C24.5816 18.8747 25.0563 18.664 25.6323 18.664C26.2029 18.664 26.6829 18.8747 27.0723 19.296ZM24.7123 19.736C24.4936 20.0507 24.3843 20.4293 24.3843 20.872C24.3843 21.3093 24.4909 21.6987 24.7043 22.04C24.9229 22.3867 25.2216 22.56 25.6003 22.56C25.9789 22.56 26.2829 22.3893 26.5123 22.048C26.7363 21.7013 26.8483 21.3067 26.8483 20.864C26.8483 20.4213 26.7363 20.0453 26.5123 19.736C26.2883 19.4213 25.9869 19.264 25.6083 19.264C25.2296 19.264 24.9309 19.4213 24.7123 19.736Z"
        fill="black"
      />
      <line x1="31.5" y1="7" x2="31.5" y2="34" stroke="black" />
      <line x1="8.5" y1="7" x2="8.5" y2="34" stroke="black" />
    </svg>
  ),
  Aspect9_16: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10.5" y="3.5" width="19" height="33" stroke="black" />
      <path
        d="M14.3803 23.136H14.2603C13.7909 23.136 13.3963 22.976 13.0763 22.656C12.8629 22.4427 12.7163 22.1787 12.6363 21.864L13.2923 21.624C13.3349 21.848 13.4389 22.0427 13.6043 22.208C13.7696 22.3733 13.9883 22.456 14.2603 22.456H14.3803C14.6736 22.456 14.9163 22.3467 15.1083 22.128C15.2949 21.9093 15.3883 21.624 15.3883 21.272V20.408C15.2976 20.5627 15.1563 20.6853 14.9643 20.776C14.7723 20.8613 14.5776 20.904 14.3803 20.904H14.2603C13.7589 20.904 13.3536 20.7173 13.0443 20.344C12.7349 19.9707 12.5803 19.56 12.5803 19.112V19.048C12.5803 18.5627 12.7456 18.1387 13.0763 17.776C13.4069 17.4293 13.8016 17.256 14.2603 17.256H14.3803C14.8496 17.256 15.2496 17.432 15.5803 17.784C15.9109 18.1467 16.0763 18.568 16.0763 19.048V21.272C16.0763 21.8267 15.9109 22.2747 15.5803 22.616C15.2549 22.9627 14.8549 23.136 14.3803 23.136ZM14.3803 17.936H14.2603C13.9936 17.936 13.7616 18.0427 13.5643 18.256C13.3669 18.4693 13.2683 18.7333 13.2683 19.048V19.112C13.2683 19.384 13.3616 19.6347 13.5483 19.864C13.7296 20.0987 13.9669 20.216 14.2603 20.216H14.3803C14.6683 20.216 14.9083 20.0987 15.1003 19.864C15.2923 19.6293 15.3883 19.3787 15.3883 19.112V19.048C15.3883 18.7333 15.2896 18.4693 15.0923 18.256C14.8949 18.0427 14.6576 17.936 14.3803 17.936ZM17.3147 19.856V18.872H18.2907V19.856H17.3147ZM17.3147 23.024V22.04H18.2907V23.024H17.3147ZM21.1109 23.024V18.416C20.8122 18.832 20.4629 19.04 20.0629 19.04H19.8629V18.456C20.0975 18.4293 20.3109 18.3733 20.5029 18.288C20.7695 18.16 20.9535 17.7973 21.0549 17.2H21.7989V23.024H21.1109ZM25.5653 17.248H25.6853C26.1546 17.248 26.5493 17.408 26.8693 17.728C27.088 17.9467 27.2346 18.2107 27.3093 18.52L26.6533 18.76C26.6106 18.536 26.5066 18.3413 26.3413 18.176C26.176 18.0107 25.9573 17.928 25.6853 17.928H25.5653C25.2666 17.928 25.0266 18.0587 24.8453 18.32C24.6533 18.5813 24.5573 18.8907 24.5573 19.248V19.896C24.648 19.7413 24.7813 19.6187 24.9573 19.528C25.1386 19.4427 25.3413 19.4 25.5653 19.4H25.6853C26.1866 19.4 26.592 19.5867 26.9013 19.96C27.2106 20.3333 27.3653 20.744 27.3653 21.192V21.336C27.3653 21.8213 27.2 22.2427 26.8693 22.6C26.544 22.9573 26.1493 23.136 25.6853 23.136H25.5653C25.0906 23.136 24.688 22.9573 24.3573 22.6C24.032 22.2373 23.8693 21.816 23.8693 21.336V19.248C23.8693 18.64 24.032 18.1547 24.3573 17.792C24.688 17.4293 25.0906 17.248 25.5653 17.248ZM25.5653 22.448H25.6853C25.952 22.448 26.184 22.3413 26.3813 22.128C26.5786 21.9147 26.6773 21.6507 26.6773 21.336V21.192C26.6773 20.9093 26.5866 20.6533 26.4053 20.424C26.224 20.2 25.984 20.088 25.6853 20.088H25.5653C25.2773 20.088 25.0373 20.2053 24.8453 20.44C24.6533 20.6747 24.5573 20.9253 24.5573 21.192V21.336C24.5573 21.64 24.6586 21.9013 24.8613 22.12C25.064 22.3387 25.2986 22.448 25.5653 22.448Z"
        fill="black"
      />
    </svg>
  ),
  Aspect3_4: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10.5" y="6.5" width="19" height="27" stroke="black" />
      <path
        d="M17.2035 18.648C17.2035 18.1307 16.8568 17.872 16.1635 17.872C15.7581 17.872 15.4808 18.0187 15.3315 18.312L14.8035 18.12C15.0275 17.5333 15.5021 17.24 16.2275 17.24C17.3208 17.24 17.8781 17.7147 17.8995 18.664C17.8995 19.1227 17.6435 19.5093 17.1315 19.824C17.8408 20.096 18.1955 20.5947 18.1955 21.32C18.1955 21.88 18.0141 22.3093 17.6515 22.608C17.2728 22.9067 16.8301 23.056 16.3235 23.056C15.3421 23.056 14.7795 22.6533 14.6355 21.848L15.1715 21.712C15.2035 22.1707 15.5768 22.4 16.2915 22.4C16.6595 22.4 16.9528 22.2987 17.1715 22.096C17.3741 21.8933 17.4755 21.6187 17.4755 21.272C17.4755 20.648 17.0035 20.304 16.0595 20.24L15.5955 20.208V19.608L16.0435 19.568C16.8168 19.4987 17.2035 19.192 17.2035 18.648ZM19.5139 19.856V18.872H20.4899V19.856H19.5139ZM19.5139 23.024V22.04H20.4899V23.024H19.5139ZM24.5101 23.024H23.8061V21.704H21.4461L23.6701 17.2H24.5101V21H25.1661V21.704H24.5101V23.024ZM23.8061 21V18.12L22.4941 21H23.8061Z"
        fill="black"
      />
    </svg>
  ),
  Aspect1_1: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8.5" y="8.5" width="23" height="23" stroke="black" />
      <path
        d="M16.4195 23.024V18.416C16.1208 18.832 15.7715 19.04 15.3715 19.04H15.1715V18.456C15.4061 18.4293 15.6195 18.3733 15.8115 18.288C16.0781 18.16 16.2621 17.7973 16.3635 17.2H17.1075V23.024H16.4195ZM19.5139 19.856V18.872H20.4899V19.856H19.5139ZM19.5139 23.024V22.04H20.4899V23.024H19.5139ZM23.3101 23.024V18.416C23.0114 18.832 22.6621 19.04 22.2621 19.04H22.0621V18.456C22.2968 18.4293 22.5101 18.3733 22.7021 18.288C22.9688 18.16 23.1528 17.7973 23.2541 17.2H23.9981V23.024H23.3101Z"
        fill="black"
      />
    </svg>
  ),
  Aspect4_3: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6.5"
        y="29.5"
        width="19"
        height="27"
        transform="rotate(-90 6.5 29.5)"
        stroke="black"
      />
      <path
        d="M17.6195 23.024H16.9155V21.704H14.5555L16.7795 17.2H17.6195V21H18.2755V21.704H17.6195V23.024ZM16.9155 21V18.12L15.6035 21H16.9155ZM19.5139 19.856V18.872H20.4899V19.856H19.5139ZM19.5139 23.024V22.04H20.4899V23.024H19.5139ZM24.0941 18.648C24.0941 18.1307 23.7474 17.872 23.0541 17.872C22.6488 17.872 22.3714 18.0187 22.2221 18.312L21.6941 18.12C21.9181 17.5333 22.3928 17.24 23.1181 17.24C24.2114 17.24 24.7688 17.7147 24.7901 18.664C24.7901 19.1227 24.5341 19.5093 24.0221 19.824C24.7314 20.096 25.0861 20.5947 25.0861 21.32C25.0861 21.88 24.9048 22.3093 24.5421 22.608C24.1634 22.9067 23.7208 23.056 23.2141 23.056C22.2328 23.056 21.6701 22.6533 21.5261 21.848L22.0621 21.712C22.0941 22.1707 22.4674 22.4 23.1821 22.4C23.5501 22.4 23.8434 22.2987 24.0621 22.096C24.2648 21.8933 24.3661 21.6187 24.3661 21.272C24.3661 20.648 23.8941 20.304 22.9501 20.24L22.4861 20.208V19.608L22.9341 19.568C23.7074 19.4987 24.0941 19.192 24.0941 18.648Z"
        fill="black"
      />
    </svg>
  ),
  Aspect16_9: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.2203 23.024V18.416C13.9216 18.832 13.5723 19.04 13.1723 19.04H12.9723V18.456C13.2069 18.4293 13.4203 18.3733 13.6123 18.288C13.8789 18.16 14.0629 17.7973 14.1643 17.2H14.9083V23.024H14.2203ZM18.6747 17.248H18.7947C19.264 17.248 19.6587 17.408 19.9787 17.728C20.1974 17.9467 20.344 18.2107 20.4187 18.52L19.7627 18.76C19.72 18.536 19.616 18.3413 19.4507 18.176C19.2854 18.0107 19.0667 17.928 18.7947 17.928H18.6747C18.376 17.928 18.136 18.0587 17.9547 18.32C17.7627 18.5813 17.6667 18.8907 17.6667 19.248V19.896C17.7574 19.7413 17.8907 19.6187 18.0667 19.528C18.248 19.4427 18.4507 19.4 18.6747 19.4H18.7947C19.296 19.4 19.7014 19.5867 20.0107 19.96C20.32 20.3333 20.4747 20.744 20.4747 21.192V21.336C20.4747 21.8213 20.3094 22.2427 19.9787 22.6C19.6534 22.9573 19.2587 23.136 18.7947 23.136H18.6747C18.2 23.136 17.7974 22.9573 17.4667 22.6C17.1414 22.2373 16.9787 21.816 16.9787 21.336V19.248C16.9787 18.64 17.1414 18.1547 17.4667 17.792C17.7974 17.4293 18.2 17.248 18.6747 17.248ZM18.6747 22.448H18.7947C19.0614 22.448 19.2934 22.3413 19.4907 22.128C19.688 21.9147 19.7867 21.6507 19.7867 21.336V21.192C19.7867 20.9093 19.696 20.6533 19.5147 20.424C19.3334 20.2 19.0934 20.088 18.7947 20.088H18.6747C18.3867 20.088 18.1467 20.2053 17.9547 20.44C17.7627 20.6747 17.6667 20.9253 17.6667 21.192V21.336C17.6667 21.64 17.768 21.9013 17.9707 22.12C18.1734 22.3387 18.408 22.448 18.6747 22.448ZM21.7131 19.856V18.872H22.6891V19.856H21.7131ZM21.7131 23.024V22.04H22.6891V23.024H21.7131ZM25.6693 23.136H25.5493C25.08 23.136 24.6853 22.976 24.3653 22.656C24.152 22.4427 24.0053 22.1787 23.9253 21.864L24.5813 21.624C24.624 21.848 24.728 22.0427 24.8933 22.208C25.0586 22.3733 25.2773 22.456 25.5493 22.456H25.6693C25.9626 22.456 26.2053 22.3467 26.3973 22.128C26.584 21.9093 26.6773 21.624 26.6773 21.272V20.408C26.5866 20.5627 26.4453 20.6853 26.2533 20.776C26.0613 20.8613 25.8666 20.904 25.6693 20.904H25.5493C25.048 20.904 24.6426 20.7173 24.3333 20.344C24.024 19.9707 23.8693 19.56 23.8693 19.112V19.048C23.8693 18.5627 24.0346 18.1387 24.3653 17.776C24.696 17.4293 25.0906 17.256 25.5493 17.256H25.6693C26.1386 17.256 26.5386 17.432 26.8693 17.784C27.2 18.1467 27.3653 18.568 27.3653 19.048V21.272C27.3653 21.8267 27.2 22.2747 26.8693 22.616C26.544 22.9627 26.144 23.136 25.6693 23.136ZM25.6693 17.936H25.5493C25.2826 17.936 25.0506 18.0427 24.8533 18.256C24.656 18.4693 24.5573 18.7333 24.5573 19.048V19.112C24.5573 19.384 24.6506 19.6347 24.8373 19.864C25.0186 20.0987 25.256 20.216 25.5493 20.216H25.6693C25.9573 20.216 26.1973 20.0987 26.3893 19.864C26.5813 19.6293 26.6773 19.3787 26.6773 19.112V19.048C26.6773 18.7333 26.5786 18.4693 26.3813 18.256C26.184 18.0427 25.9466 17.936 25.6693 17.936Z"
        fill="black"
      />
      <rect
        x="3.5"
        y="29.5"
        width="19"
        height="33"
        transform="rotate(-90 3.5 29.5)"
        stroke="black"
      />
    </svg>
  ),
};

interface TankaSettingFormProps {
  settings: TankaSettings;
  menu: TankaMenu;
  defaultTags: string[];
  onUpdateSetting: <K extends keyof TankaSettings>(key: K, value: TankaSettings[K]) => void;
  onCreateGradient: () => void;
  onDownload: () => void;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
}

// プリセットカラー
const swatches = ['#000000', '#FFFFFF', '#eb5e41'];

// ボトムシート
function BottomSheet({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <Drawer.Root
      placement="bottom"
      open={open}
      onOpenChange={() => {}}
      closeOnInteractOutside={false}
      initialFocusEl={() => ref.current}
      modal={false}
    >
      <Drawer.Positioner pointerEvents="none" paddingBottom={10} zIndex={1}>
        <Drawer.Content
          roundedTop="30px"
          css={{
            background: 'rgba(230, 229, 219, 0.6)',
            boxShadow: '0px -4px 100px rgba(26, 25, 18, 0.2), inset 0px 4px 4px #F5F5F1',
            borderRadius: '24px 24px 0px 0px',
          }}
        >
          <Drawer.Body>
            <Box ref={ref}>{children}</Box>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

// カラーピッカーフィールド（defaultValueで初期化し、onValueChangeEndで同期）
function ColorPickerField({
  label,
  value,
  onChange,
  disabled,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <ColorPicker.Root
      key={value}
      defaultValue={parseColor(value)}
      onValueChangeEnd={(details) => onChange(details.value.toString('hex'))}
      disabled={disabled}
      size="lg"
    >
      <ColorPicker.HiddenInput />
      {label && (
        <ColorPicker.Label fontSize="md" fontWeight="medium">
          {label}
        </ColorPicker.Label>
      )}
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area>
              <ColorPicker.AreaBackground />
              <ColorPicker.AreaThumb />
            </ColorPicker.Area>
            <HStack>
              <ColorPicker.EyeDropperTrigger asChild>
                <Button size="sm" variant="outline">
                  <LuPipette />
                </Button>
              </ColorPicker.EyeDropperTrigger>
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
            </HStack>
            <ColorPicker.SwatchGroup>
              {swatches.map((swatch) => (
                <ColorPicker.SwatchTrigger key={swatch} value={swatch}>
                  <ColorPicker.Swatch value={swatch}>
                    <ColorPicker.SwatchIndicator>
                      <LuCheck />
                    </ColorPicker.SwatchIndicator>
                  </ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              ))}
            </ColorPicker.SwatchGroup>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
}

export function TankaSettingForm({
  settings,
  onUpdateSetting,
  onCreateGradient,
  onDownload,
  onBack,
  onSave,
  onDelete,
  menu,
  defaultTags,
}: TankaSettingFormProps) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const {
    collection,
    filter,
    set: setCollectionItems,
  } = useListCollection({
    initialItems: defaultTags,
    filter: contains,
  });
  useEffect(() => {
    setCollectionItems(defaultTags);
  }, [defaultTags, setCollectionItems]);
  const uid = useId();
  const controlRef = useRef<HTMLDivElement | null>(null);
  const tags = useTagsInput({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
    defaultValue: settings.tags || [],
    value: settings.tags || [],
    onValueChange: (e) => onUpdateSetting('tags', e.value),
  });
  const comobobox = useCombobox({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
    collection,
    onInputValueChange(e) {
      filter(e.inputValue);
    },
    value: [],
    allowCustomValue: true,
    onValueChange: (e) => {
      tags.addValue(e.value[0]);
    },
    selectionBehavior: 'clear',
  });
  return (
    <VStack gap="4" p="8" w="100%" alignItems="stretch">
      {/* 短歌入力 */}
      <BottomSheet open={menu === 'tanka'}>
        <VStack gap="4" p="4" pb="8" w="100%" alignItems="stretch">
          {/* 短歌入力 */}
          <VStack gap="4" alignItems="stretch">
            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="medium">
                短歌
              </Field.Label>
              <Textarea
                size="xl"
                variant="flushed"
                placeholder={'短歌を入力してください。'}
                value={settings.tanka}
                onChange={(e) => onUpdateSetting('tanka', e.target.value)}
                borderColor="yellow.200"
                autoresize
              />
            </Field.Root>
            <SegmentGroup.Root
              value={settings.tankaAlignment}
              onValueChange={(d) => onUpdateSetting('tankaAlignment', d.value as TextAlignment)}
              size="sm"
              w="fit-content"
              bg="yellow.200"
              borderColor="yellow.200"
              css={{
                '--segment-indicator-bg': '#F5F5F1',
                '--segment-indicator-shadow':
                  '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
              }}
            >
              <SegmentGroup.Indicator />
              {[
                { value: 'left', icon: <LuAlignLeft /> },
                { value: 'center', icon: <LuAlignCenter /> },
                { value: 'right', icon: <LuAlignRight /> },
              ].map((item) => (
                <SegmentGroup.Item key={item.value} value={item.value}>
                  {item.icon}
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              ))}
            </SegmentGroup.Root>
          </VStack>
          {/* サブタイトル入力 */}
          <VStack gap="4" alignItems="stretch">
            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="medium">
                サブタイトル
              </Field.Label>
              <Input
                variant="flushed"
                size="lg"
                placeholder="著名・サブタイトルを入力してください。"
                value={settings.subtitle}
                onChange={(e) => onUpdateSetting('subtitle', e.target.value)}
                borderColor="yellow.200"
              />
            </Field.Root>
            <SegmentGroup.Root
              value={settings.subtitleAlignment}
              onValueChange={(d) => onUpdateSetting('subtitleAlignment', d.value as TextAlignment)}
              size="sm"
              w="fit-content"
              bg="yellow.200"
              borderColor="yellow.200"
              css={{
                '--segment-indicator-bg': '#F5F5F1',
                '--segment-indicator-shadow':
                  '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
              }}
            >
              <SegmentGroup.Indicator />
              {[
                { value: 'left', icon: <LuAlignLeft /> },
                { value: 'center', icon: <LuAlignCenter /> },
                { value: 'right', icon: <LuAlignRight /> },
              ].map((item) => (
                <SegmentGroup.Item key={item.value} value={item.value}>
                  {item.icon}
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              ))}
            </SegmentGroup.Root>
          </VStack>
        </VStack>
      </BottomSheet>
      {/* アスペクト比 */}
      <BottomSheet open={menu === 'aspect'}>
        <VStack gap="4" p="4" pb="8" w="100%" alignItems="stretch">
          {/* アスペクト比 */}
          <VStack gap="4" alignItems="stretch">
            <Text fontSize="sm" fontWeight="medium" color="gray.800">
              アスペクト比
            </Text>
            <Box width="100%" overflow="scroll">
              <SegmentGroup.Root
                value={settings.aspectRatio}
                onValueChange={(d) => onUpdateSetting('aspectRatio', d.value as string)}
                size="lg"
                w="fit-content"
                css={{
                  '--segment-indicator-bg': '#F5F5F1',
                  '--segment-indicator-shadow':
                    '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
                }}
              >
                <SegmentGroup.Indicator />
                {[
                  { value: 'auto', icon: AspectIcons.Auto },
                  { value: '9_16', icon: AspectIcons.Aspect9_16 },
                  { value: '3_4', icon: AspectIcons.Aspect3_4 },
                  { value: '1_1', icon: AspectIcons.Aspect1_1 },
                  { value: '4_3', icon: AspectIcons.Aspect4_3 },
                  { value: '16_9', icon: AspectIcons.Aspect16_9 },
                ].map((item) => (
                  <SegmentGroup.Item key={item.value} value={item.value} p={8}>
                    {item.icon}
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                ))}
              </SegmentGroup.Root>
            </Box>
          </VStack>
        </VStack>
      </BottomSheet>
      {/* 背景色・文字色 */}
      <BottomSheet open={menu === 'color'}>
        <VStack gap="4" p="4" pb="8" w="100%" alignItems="stretch">
          {/* フォントカラー */}
          <VStack gap="4" alignItems="flex-start">
            <Text fontSize="sm" fontWeight="medium" color="gray.800">
              文字色
            </Text>
            <RadioGroup.Root
              value={settings.fontColorType}
              onValueChange={(d) => onUpdateSetting('fontColorType', d.value as FontColorType)}
              size="lg"
            >
              <VStack gap="4" alignItems="stretch">
                <HStack gap="4" alignItems="center">
                  <RadioGroup.Item value="monocrome">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                      単色
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="invert">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                      反転色
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                </HStack>
                <ColorPickerField
                  value={settings.fontColor}
                  onChange={(v) => onUpdateSetting('fontColor', v)}
                  disabled={settings.fontColorType !== 'monocrome'}
                />
              </VStack>
            </RadioGroup.Root>
          </VStack>
          {/* 背景設定 */}
          <VStack gap="4" alignItems="flex-start">
            <Text fontSize="sm" fontWeight="medium" color="gray.800">
              背景色
            </Text>

            <RadioGroup.Root
              value={settings.backgroundType}
              onValueChange={(d) => onUpdateSetting('backgroundType', d.value as BackgroundType)}
              size="lg"
            >
              <VStack gap="4" alignItems="stretch">
                <HStack gap="4" alignItems="center">
                  <RadioGroup.Item value="monocrome">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                      単色
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="gradient">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                      グラデーション
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                </HStack>

                <ColorPickerField
                  value={settings.monocromeColor}
                  onChange={(v) => onUpdateSetting('monocromeColor', v)}
                  disabled={settings.backgroundType !== 'monocrome'}
                />

                <Button
                  size="sm"
                  colorPalette="pink"
                  w="fit-content"
                  onClick={onCreateGradient}
                  disabled={settings.backgroundType !== 'gradient'}
                >
                  <LuPalette />
                  グラデーションを生成
                </Button>
              </VStack>
            </RadioGroup.Root>
          </VStack>
        </VStack>
      </BottomSheet>
      {/* 書体 */}
      <BottomSheet open={menu === 'font'}>
        <VStack gap="4" p="4" pb="8" w="100%" alignItems="flex-start">
          {/* 書体 */}
          <Text fontSize="sm" fontWeight="medium" color="gray.800">
            書体
          </Text>
          <SegmentGroup.Root
            value={settings.fontFamily}
            onValueChange={(d) => onUpdateSetting('fontFamily', d.value as FontFamily)}
            size="md"
            bg="yellow.200"
            borderColor="yellow.200"
            css={{
              '--segment-indicator-bg': '#F5F5F1',
              '--segment-indicator-shadow':
                '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
            }}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Item value="serif">
              <SegmentGroup.ItemText>明朝</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="sans">
              <SegmentGroup.ItemText>ゴシック</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          </SegmentGroup.Root>
          <Text fontSize="sm" fontWeight="medium" color="gray.800">
            ウェイト
          </Text>
          <Slider.Root
            min={200}
            max={900}
            defaultValue={[400]}
            value={[settings.fontWeight || 400]}
            onValueChange={(d) => onUpdateSetting('fontWeight', d.value[0])}
            size="md"
            variant="solid"
            width="100%"
            colorPalette="gray"
          >
            <HStack justify="space-between">
              <Slider.ValueText />
            </HStack>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
        </VStack>
      </BottomSheet>
      {/* タグ */}
      <BottomSheet open={menu === 'tag'}>
        <VStack gap="4" p="4" pb="8" w="100%" alignItems="flex-start">
          {/* タグ */}
          <Text fontSize="sm" fontWeight="medium" color="gray.800">
            タグ
          </Text>
          <Text fontSize="2xs" fontWeight="medium" color="gray.800">
            短歌に分類用のタグをつけることができます。
          </Text>
          <Combobox.RootProvider size="lg" value={comobobox}>
            <TagsInput.RootProvider size="lg" value={tags} variant="flushed" colorPalette="gray">
              <TagsInput.Control ref={controlRef}>
                {tags.value.map((tag, index) => (
                  <TagsInput.Item key={index} index={index} value={tag} colorPalette="gray">
                    <TagsInput.ItemPreview>
                      <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger />
                    </TagsInput.ItemPreview>
                  </TagsInput.Item>
                ))}
                <Combobox.Input unstyled asChild>
                  <TagsInput.Input placeholder="タグを追加できます。" />
                </Combobox.Input>
              </TagsInput.Control>

              <Combobox.Positioner>
                <Combobox.Content>
                  {collection.items.map((item) => (
                    <Combobox.Item item={item} key={item}>
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </TagsInput.RootProvider>
          </Combobox.RootProvider>
        </VStack>
      </BottomSheet>
      {/* その他 */}
      <BottomSheet open={menu === 'other'}>
        <VStack gap="4" p="4" pb="8" w="100%" alignItems="stretch">
          <Button
            variant="ghost"
            size="md"
            colorPalette="gray"
            onClick={onSave}
            justifyContent="flex-start"
          >
            <LuSave />
            保存
          </Button>
          <Button
            variant="ghost"
            size="md"
            colorPalette="gray"
            onClick={onDownload}
            justifyContent="flex-start"
          >
            <LuDownload />
            画像をダウンロード
          </Button>
          {onDelete && (
            <VStack w="100%" alignItems="stretch">
              <Separator variant="dotted" borderColor="Background.inverted" />
              <Button
                variant="ghost"
                size="md"
                colorPalette="pink"
                onClick={onDelete}
                justifyContent="flex-start"
              >
                <LuTrash2 />
                削除
              </Button>
              <Separator variant="dotted" borderColor="Background.inverted" />
            </VStack>
          )}
          <Button
            variant="ghost"
            size="md"
            colorPalette="gray"
            onClick={onBack}
            justifyContent="flex-start"
          >
            <LuUndo2 />
            キャンセル
          </Button>
        </VStack>
      </BottomSheet>
    </VStack>
  );
}
