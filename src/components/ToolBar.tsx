// ツールバー
'use client';

import { Flex, IconButton } from '@chakra-ui/react';
import { LuBadgeHelp, LuPlus } from 'react-icons/lu';
import { Logo } from './Logo';
import Link from 'next/link';

export function ToolBar() {
  return (
    <Flex as="header" w="100%" justify="space-between" align="center" px="3">
      <IconButton aria-label="ヘルプ" variant="subtle" colorPalette="gray" size="md" asChild>
        <Link href="/about" transitionTypes={['nav-forward']}>
          <LuBadgeHelp />
        </Link>
      </IconButton>
      <Logo />
      <IconButton aria-label="新規作成" variant="subtle" colorPalette="gray" size="md" asChild>
        <Link href="/tanka/new">
          <LuPlus />
        </Link>
      </IconButton>
    </Flex>
  );
}
