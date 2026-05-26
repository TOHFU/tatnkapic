// 短歌設定フォームコンポーネント
'use client';

import { HStack, IconButton } from '@chakra-ui/react';
import { LuCircleEllipsis, LuCrop, LuPalette, LuPencil, LuType } from 'react-icons/lu';
import type { TankaMenu } from '@/types/tanka';

interface TankaMenuProps {
  menu: TankaMenu;
  onChangeMenu: (menu: TankaMenu) => void;
}

export function TankaSettingMenu({ menu, onChangeMenu }: TankaMenuProps) {
  return (
    <HStack
      width="100%"
      left="0"
      right="0"
      justify="space-evenly"
      position="fixed"
      bottom="0"
      bgColor="pink.solid"
      zIndex={2}
    >
      <IconButton
        size="lg"
        variant="solid"
        bg="pink.solid"
        color={menu === 'tanka' ? 'pink.emphasized' : 'pink.contrast'}
        borderColor="none"
        onClick={menu === 'tanka' ? () => onChangeMenu('') : () => onChangeMenu('tanka')}
      >
        <LuPencil />
      </IconButton>
      <IconButton
        size="lg"
        variant="solid"
        bg="pink.solid"
        color={menu === 'aspect' ? 'pink.emphasized' : 'pink.contrast'}
        borderColor="none"
        onClick={menu === 'aspect' ? () => onChangeMenu('') : () => onChangeMenu('aspect')}
      >
        <LuCrop />
      </IconButton>
      <IconButton
        size="lg"
        variant="solid"
        bg="pink.solid"
        color={menu === 'color' ? 'pink.emphasized' : 'pink.contrast'}
        borderColor="none"
        onClick={menu === 'color' ? () => onChangeMenu('') : () => onChangeMenu('color')}
      >
        <LuPalette />
      </IconButton>
      <IconButton
        size="lg"
        variant="solid"
        bg="pink.solid"
        color={menu === 'font' ? 'pink.emphasized' : 'pink.contrast'}
        borderColor="none"
        onClick={menu === 'font' ? () => onChangeMenu('') : () => onChangeMenu('font')}
      >
        <LuType />
      </IconButton>
      <IconButton
        size="lg"
        variant="solid"
        bg="pink.solid"
        color={menu === 'other' ? 'pink.emphasized' : 'pink.contrast'}
        borderColor="none"
        onClick={menu === 'other' ? () => onChangeMenu('') : () => onChangeMenu('other')}
      >
        <LuCircleEllipsis />
      </IconButton>
    </HStack>
  );
}
