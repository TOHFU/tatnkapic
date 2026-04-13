// 短歌一覧画面
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { generateMeshGradient } from '@/lib/meshGradient';
import type { TankaSettings } from '@/types/tanka';

// サンプルデータ（TODO: indexedDBから取得する）
const SAMPLE_DATA: Omit<TankaSettings, 'meshGradient'>[] = [
  {
    tanka: '好きなパン　好きな廃墟を教えるね\nこれで私が全部わかるね',
    subtitle: '岡乃あや',
    subtitleAlignment: 'center',
    fontFamily: 'serif',
    fontColor: '#000000',
    backgroundType: 'gradient',
    monocromeColor: '#D9D9D9',
  },
  {
    tanka: '粘菌のように地べたに広がった猫が突然猫へと還る',
    subtitle: '024年8月26日 読売歌壇 黒瀬珂瀾選一席',
    subtitleAlignment: 'right',
    fontFamily: 'sans',
    fontColor: '#99F6E4',
    backgroundType: 'gradient',
    monocromeColor: '#D9D9D9',
  },
  {
    tanka: '桃色を見てしまいたり口を開けぼんやりとしている夏鴉',
    subtitle: '松本志李　『塔』2024年11月号',
    subtitleAlignment: 'center',
    fontFamily: 'sans',
    fontColor: '#FDF5F2',
    backgroundType: 'monocrome',
    monocromeColor: '#E69880',
  },
  {
    tanka: '神はそう告げ地を創り海を拓きて天に光を＼てじな～にゃ／',
    subtitle: '坪内万里コ　toi toi toi 歌集『救心』（私家版, 2022年）',
    subtitleAlignment: 'center',
    fontFamily: 'serif',
    fontColor: '#A1A1AA',
    backgroundType: 'monocrome',
    monocromeColor: '#1A032E',
  },
];

export default function Home() {
  const [items, setItems] = useState<TankaSettings[]>([]);

  // クライアント側でグラデーションを生成（hydrationエラー回避）
  useEffect(() => {
    setItems(
      SAMPLE_DATA.map((item) => ({
        ...item,
        meshGradient: generateMeshGradient(),
      }))
    );
  }, []);

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
          {items.map((item, index) => (
            <Link key={index} href={`/tanka/${index}`}>
              <TankaPicture settings={item} />
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
