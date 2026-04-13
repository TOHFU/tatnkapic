// 短歌一覧画面
'use client';

import Link from 'next/link';
import { Box, Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { useTankaList } from '@/hooks/useTankaDb';

export default function Home() {
  const { records } = useTankaList();

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
          <Text fontSize="sm" fontWeight="bold" color="#27272A">
            TANKA PIC
          </Text>
          <IconButton aria-label="新規作成" variant="subtle" colorPalette="gray" size="md" asChild>
            <Link href="/tanka/new">
              <LuPlus />
            </Link>
          </IconButton>
        </Flex>

        {/* 短歌リスト */}
        <VStack gap="24px" py="4px">
          {records.map((record) => (
            <Link key={record.id} href={`/tanka/${record.id}`}>
              <TankaPicture settings={record} />
            </Link>
          ))}
        </VStack>

        {/* フッター */}
        <Box w="311px" py="16px">
          <Button w="100%" size="sm" colorPalette="pink" asChild>
            <Link href="/tanka/new">
              CREATE TANKA
              <LuPlus />
            </Link>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
