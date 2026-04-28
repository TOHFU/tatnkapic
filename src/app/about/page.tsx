// アバウト画面
'use client';

import { ViewTransition } from 'react';
import Link from 'next/link';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { LuArrowLeft } from 'react-icons/lu';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
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
          <VStack gap="1" w="100%" minW="375px" alignItems="center" flex="1">
          {/* ツールバー */}
          <Flex as="header" w="100%" align="center" px="3">
            <IconButton aria-label="戻る" variant="subtle" colorPalette="gray" size="md" asChild>
              <Link href="/" transitionTypes={['nav-back']}>
                <LuArrowLeft />
              </Link>
            </IconButton>
          </Flex>

          {/* アバウトコンテンツ */}
          <VStack gap="6" px="8" py="12" w="374px" alignItems="center">
            <Logo />
            <Text fontSize="lg" fontWeight="semibold" color="gray.800" textAlign="center">
              TANKAPICは、{'\n'}
              短歌画像を作成する{'\n'}
              WEBアプリです。
            </Text>
            <Text fontSize="xs" color="gray.600" whiteSpace="pre-wrap">
              {`短歌と、著名やお題を書くためのサブタイトルを載せることができます。
また、背景にはランダムなグラデーションを生成して指定することができます。

SNSに投稿する際、#TANKAPIC のハッシュタグをつけていただけると嬉しいです。（強制ではありません。）

なお、短歌はブラウザの中（indexedDB）に保存する仕組みのため、端末変更やキャッシュクリアなどを行うと削除される可能性がありますのでご注意ください。

ブラウザからホーム画面に追加していただくと、より快適にご利用いただけます。

このアプリは個人開発のもと、無料で提供しています。`}
            </Text>
          </VStack>

          {/* フッター */}
          <Footer />
        </VStack>
      </Box>
    </ViewTransition>
  );
}
