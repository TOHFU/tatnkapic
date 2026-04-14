// 短歌一覧画面
'use client';

import { ViewTransition } from 'react';
import Link from 'next/link';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { LuBadgeHelp, LuPlus } from 'react-icons/lu';
import { Logo } from '@/components/Logo';
import { EmptyState } from '@/components/EmptyState';
import { Footer } from '@/components/Footer';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { useTankaList } from '@/hooks/useTankaDb';

export default function Home() {
  const { records, loading } = useTankaList();

  return (
    <Box
      bg="#F5F5F1"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt="12px"
      pb="32px"
    >
      <VStack gap="4px" w="100%" minW="375px" alignItems="center" flex="1">
        {/* ツールバー */}
        <Flex as="header" w="100%" justify="space-between" align="center" px="12px">
          <IconButton aria-label="ヘルプ" variant="subtle" colorPalette="gray" size="md" asChild>
            <Link href="/about">
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

        {/* 短歌リスト or EmptyState（ローディング中は非表示） */}
        {!loading && records.length === 0 ? (
          <EmptyState />
        ) : (
          <VStack gap="24px" py="4px">
            {records.map((record) => (
              <Link key={record.id} href={`/tanka/${record.id}`}>
                <ViewTransition name={`tanka-${record.id}`}>
                  <TankaPicture settings={record} />
                </ViewTransition>
              </Link>
            ))}
          </VStack>
        )}

        {/* フッター */}
        <Footer showCreateButton />
      </VStack>
    </Box>
  );
}
