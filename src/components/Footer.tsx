// 共通フッター（Logo、リンク、著作権）
import Link from 'next/link';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { Logo } from '@/components/Logo';

interface FooterProps {
  /** 「短歌を作る」ボタンを表示するか */
  showCreateButton?: boolean;
}

export function Footer({ showCreateButton = false }: FooterProps) {
  return (
    <VStack
      as="footer"
      w="311px"
      py="16px"
      gap="10px"
      flex="1"
      justify={showCreateButton ? 'space-between' : 'flex-end'}
      alignItems="stretch"
    >
      {showCreateButton && (
        <Box mb="32px">
          <Button w="100%" size="sm" colorPalette="pink" asChild>
            <Link href="/tanka/new">
              <LuPlus />
              短歌を作る
            </Link>
          </Button>
        </Box>
      )}
      <VStack gap="10px" alignItems="flex-end">
        <Logo />
        <Text fontSize="xs" color="#27272A" asChild>
          <a href="https://tohfu-tronica.netlify.app/" target="_blank" rel="noopener noreferrer">
            tohfu-tronica.netlify.app
          </a>
        </Text>
        <Text fontSize="xs" color="#27272A">
          © tohfu-tronica
        </Text>
      </VStack>
    </VStack>
  );
}
