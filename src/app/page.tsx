// 短歌一覧画面
'use client';

import { useEffect, useRef, useState } from 'react';
import { ViewTransition } from 'react';
import Link from 'next/link';
import { Box, Button, Flex, IconButton, VStack } from '@chakra-ui/react';
import { LuBadgeHelp, LuLoaderCircle, LuPlus } from 'react-icons/lu';
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
  // createButtonのsticky状態を管理
  const [createBtnStuck, setCreateBtnStuck] = useState(false);
  // ボタン直後に置くsentinel要素でsticky発動を検知
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    // rootMarginで下端を-32px縮めることで、sentinelがviewport外(下)に出る
    // タイミング = ボタンのbottomがviewport.bottom - 32pxに達した瞬間 = sticky発動点
    const observer = new IntersectionObserver(
      ([entry]) => setCreateBtnStuck(!entry.isIntersecting),
      { rootMargin: '0px 0px -32px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading]);

  // アニメーションのtransition文字列（入退場で逐順制御）
  // stuck入場: label消える(0ms) → 幅縮小+右移動(80ms) → FAB登場(180ms) → button消える(220ms)
  // stuck退場: FAB消える(0ms) → button登場(50ms) → 幅展開+左移動(100ms) → label表れる(220ms)
  const normalBtnTransition = createBtnStuck
    ? 'width 0.18s ease-out 0.08s, margin-left 0.18s ease-out 0.08s, opacity 0.12s ease-out 0.22s'
    : 'opacity 0.12s ease-out 0.05s, width 0.18s ease-out 0.1s, margin-left 0.18s ease-out 0.1s';
  const labelTransition = createBtnStuck
    ? 'opacity 0.12s ease-out 0s'
    : 'opacity 0.12s ease-out 0.22s';
  const fabTransition = createBtnStuck
    ? 'opacity 0.15s ease-out 0.18s, box-shadow 0.2s'
    : 'opacity 0.1s ease-out 0s, box-shadow 0.2s';

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
                ))}
              </VStack>
            ))}

          {/* 短歌を作るボタン（通常時: sticky全幅ボタン、stuck時: 右端のFAB位置へ縮小してから消える） */}
          {!loading && (
            <Box
              className="fade-in-content-delayed"
              w="full"
              position="sticky"
              bottom="32px"
              mt="20px"
            >
              {/* ボタン本体: ml+wのtransitionでFAB位置へ移動しながら縮小 */}
              {/* calc(50% - 155.5px) = 311px幅を中央寄せ(311/2=155.5) */}
              {/* calc(100% - 68px)   = 右:32pxにFAB(36px+32px=68px) */}
              <Box
                w={createBtnStuck ? '36px' : '311px'}
                ml={createBtnStuck ? 'calc(100% - 68px)' : 'calc(50% - 155.5px)'}
                overflow="hidden"
                opacity={createBtnStuck ? 0 : 1}
                pointerEvents={createBtnStuck ? 'none' : 'auto'}
                aria-hidden={createBtnStuck ? 'true' : undefined}
                transition={normalBtnTransition}
              >
                <Button w="100%" size="sm" colorPalette="pink" asChild>
                  <Link href="/tanka/new" tabIndex={createBtnStuck ? -1 : undefined}>
                    <LuPlus />
                    {/* stuck時は最初にラベルをフェードアウト */}
                    <Box
                      as="span"
                      opacity={createBtnStuck ? 0 : 1}
                      transition={labelTransition}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      短歌を作る
                    </Box>
                  </Link>
                </Button>
              </Box>
            </Box>
          )}
          {/* sentinel: ボタン直後に配置しIntersectionObserverでsticky状態を検知 */}
          {!loading && <Box ref={sentinelRef} h="0px" aria-hidden="true" />}

          {/* FAB（sticky時: position fixed でウィンドウ右下に表示） */}
          {!loading && (
            <Box
              position="fixed"
              bottom="32px"
              right="32px"
              w="36px"
              opacity={createBtnStuck ? 1 : 0}
              pointerEvents={createBtnStuck ? 'auto' : 'none'}
              aria-hidden={createBtnStuck ? undefined : 'true'}
              transition={fabTransition}
              boxShadow={
                createBtnStuck
                  ? '0px 24px 40px 0px rgba(24, 24, 27, 0.32), 0px 0px 1px 0px rgba(24, 24, 27, 0.6)'
                  : 'none'
              }
            >
              <Button w="100%" size="sm" colorPalette="pink" asChild>
                <Link
                  href="/tanka/new"
                  tabIndex={createBtnStuck ? undefined : -1}
                  aria-label="短歌を作る"
                >
                  <LuPlus />
                </Link>
              </Button>
            </Box>
          )}

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
