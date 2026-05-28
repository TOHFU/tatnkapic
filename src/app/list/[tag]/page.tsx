// 短歌一覧画面
'use client';

import { useState } from 'react';
import { ViewTransition } from 'react';
import Link from 'next/link';
import { Box, Flex, Heading, HStack, IconButton, Tag, VStack } from '@chakra-ui/react';
import { LuArrowLeft, LuLoaderCircle, LuTag } from 'react-icons/lu';
import { EmptyState } from '@/components/EmptyState';
import { Footer } from '@/components/Footer';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { useTankaListByTag } from '@/hooks/useTankaDb';
import { useParams } from 'next/navigation';

export default function TankaTagList() {
  const params = useParams();
  const tag = decodeURIComponent(params.tag as string) || '';

  const { records, loading } = useTankaListByTag(tag);
  // 押下中のカードIDを管理（タッチ/マウス操作でelevationを制御）
  const [pressedId, setPressedId] = useState<string | null>(null);
  // 遷移中のカードIDを管理（ローディング表示用）
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  return (
    <ViewTransition
      enter={{
        'nav-forward': 'slide-from-right',
        default: 'page-fade',
      }}
      exit={{
        'nav-back': 'slide-to-right',
        default: 'page-fade',
      }}
      default="page-fade"
    >
      <Box
        bg="bg"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt="3"
        pb="8"
      >
        <VStack gap="1" w="100%" minW="375px" alignItems="s" flex="1">
          {/* ツールバー */}
          <Flex as="header" w="100%" align="center" px="3">
            <IconButton aria-label="戻る" variant="subtle" colorPalette="gray" size="md" asChild>
              <Link href="/" transitionTypes={['nav-back']}>
                <LuArrowLeft />
              </Link>
            </IconButton>
          </Flex>

          <Flex gap="1" w="100%" px="6" py="4" alignItems="start" justifyContent="left">
            <Box pt="1">
              <LuTag size="28" />
            </Box>
            <Heading
              fontSize="3xl"
              textAlign="left"
              fontWeight="semibold"
              color="gray.800"
              flex="1"
            >
              {tag}
            </Heading>
          </Flex>
          {/* 短歌リスト or EmptyState（ローディング中は非表示） */}
          {!loading &&
            (records.length === 0 ? (
              <Box className="fade-in-content">
                <EmptyState />
              </Box>
            ) : (
              <VStack gap="6" py="1" className="fade-in-content">
                {records.map((record) => (
                  <VStack key={record.id}>
                    <Link
                      href={`/tanka/${record.id}`}
                      onClick={() => {
                        setNavigatingId(record.id);
                        // 遷移確定時のみ触覚フィードバック（スクロール時は発火しない）
                        navigator.vibrate?.(10);
                      }}
                      onMouseDown={() => setPressedId(record.id)}
                      onMouseUp={() => setPressedId(null)}
                      onMouseLeave={() => setPressedId(null)}
                      onTouchStart={() => {
                        setPressedId(record.id);
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
                    <HStack width="320px" mt="4" gap="2" justify="left" flexWrap="wrap">
                      {record.tags?.map((tag) => (
                        <Link key={tag} href={`/list/${tag}`} transitionTypes={['nav-forward']}>
                          <Tag.Root size="sm" variant="solid" colorPalette="pink">
                            <Tag.StartElement>
                              <LuTag />
                            </Tag.StartElement>
                            <Tag.Label>{tag}</Tag.Label>
                          </Tag.Root>
                        </Link>
                      ))}
                    </HStack>
                  </VStack>
                ))}
              </VStack>
            ))}

          {/* フッター（DB読み込み後に遅延フェードイン） */}
          {!loading && (
            <Box className="fade-in-content-delayed" w="311px" flex="1" display="flex">
              <Footer />
            </Box>
          )}
        </VStack>
      </Box>
    </ViewTransition>
  );
}
