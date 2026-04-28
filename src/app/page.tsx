// 短歌一覧画面
'use client';

import { useState } from 'react';
import { ViewTransition } from 'react';
import Link from 'next/link';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { LuBadgeHelp, LuPlus } from 'react-icons/lu';
import { LuLoaderCircle } from 'react-icons/lu';
import { Logo } from '@/components/Logo';
import { EmptyState } from '@/components/EmptyState';
import { Footer } from '@/components/Footer';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { useTankaList } from '@/hooks/useTankaDb';

export default function Home() {
  const { records, loading } = useTankaList();
  // 押下中のカードIDを管理（タッチ/マウス操作でelevationを制御）
  const [pressedId, setPressedId] = useState<string | null>(null);
  // 遷移中のカードIDを管理（ローディング表示用）
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  return (
    <ViewTransition
      enter={{
        'nav-back': 'slide-from-left',
        default: 'page-fade',
      }}
      exit={{
        'nav-forward': 'slide-to-left',
        default: 'page-fade',
      }}
      default="page-fade"
    >
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
              <Link href="/about" transitionTypes={['nav-forward']}>
                <LuBadgeHelp />
              </Link>
            </IconButton>
            <Logo />
            <IconButton
              aria-label="新規作成"
              variant="subtle"
              colorPalette="gray"
              size="md"
              asChild
            >
              <Link href="/tanka/new">
                <LuPlus />
              </Link>
            </IconButton>
          </Flex>

          {/* 短歌リスト or EmptyState（ローディング中は非表示） */}
          {!loading &&
            (records.length === 0 ? (
              <Box className="fade-in-content">
                <EmptyState />
              </Box>
            ) : (
              <VStack gap="24px" py="4px" className="fade-in-content">
                {records.map((record) => (
                  <Link
                    key={record.id}
                    href={`/tanka/${record.id}`}
                    onClick={() => setNavigatingId(record.id)}
                    onMouseDown={() => setPressedId(record.id)}
                    onMouseUp={() => setPressedId(null)}
                    onMouseLeave={() => setPressedId(null)}
                    onTouchStart={() => {
                      setPressedId(record.id);
                      // 触覚フィードバック（非対応デバイスは無視）
                      navigator.vibrate?.(10);
                    }}
                    onTouchEnd={() => setPressedId(null)}
                    onTouchCancel={() => setPressedId(null)}
                  >
                    <ViewTransition name={`tanka-${record.id}`}>
                      {/* TankaPicture + ローディングオーバーレイ */}
                      <Box position="relative">
                        <TankaPicture settings={record} isPressed={pressedId === record.id} />
                        {navigatingId === record.id && (
                          <Box
                            position="absolute"
                            inset="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <LuLoaderCircle size={24} className="spinner" />
                          </Box>
                        )}
                      </Box>
                    </ViewTransition>
                  </Link>
                ))}
              </VStack>
            ))}

          {/* フッター（DB読み込み後に遅延フェードイン） */}
          {!loading && (
            <Box className="fade-in-content-delayed" w="311px" flex="1" display="flex">
              <Footer showCreateButton />
            </Box>
          )}
        </VStack>
      </Box>
    </ViewTransition>
  );
}
