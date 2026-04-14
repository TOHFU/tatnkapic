// アバウト画面
'use client';

import Link from 'next/link';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { LuArrowLeft } from 'react-icons/lu';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
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
        <Flex as="header" w="100%" align="center" px="12px">
          <IconButton aria-label="戻る" variant="subtle" colorPalette="gray" size="md" asChild>
            <Link href="/">
              <LuArrowLeft />
            </Link>
          </IconButton>
        </Flex>

        {/* アバウトコンテンツ */}
        <VStack gap="24px" px="32px" py="48px" w="374px" alignItems="center">
          <Logo />
          <Text fontSize="lg" fontWeight="semibold" color="#27272A" textAlign="center">
            TANKAPICは、{'\n'}
            短歌画像を作成する{'\n'}
            WEBアプリです。
          </Text>
          <Text fontSize="xs" color="#52525B" whiteSpace="pre-wrap">
            {`短歌と、著名やお題を書くためのサブタイトルを載せることができます。
また、背景にはランダムなグラデーションを生成して指定することができます。

SNSに投稿する際、#TANKAPIC のハッシュタグをつけいただけると嬉しいです。（強制ではありません。）

なお、短歌はブラウザの中（indexedDB）に保存する仕組みのため、端末変更やキャッシュクリアなどを行うと削除される可能性がありますのでご注意ください。`}
          </Text>
        </VStack>

        {/* フッター */}
        <Footer />
      </VStack>
    </Box>
  );
}
