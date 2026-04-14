// 短歌が存在しない場合のEmptyState
import { Box, Text, VStack } from '@chakra-ui/react';
import { LuRabbit } from 'react-icons/lu';

export function EmptyState() {
  return (
    <VStack gap="24px" px="32px" py="48px" w="374px">
      <Box as={LuRabbit} w="32px" h="32px" color="#A1A1AA" />
      <Text fontSize="lg" fontWeight="semibold" color="#27272A" textAlign="center">
        まだ短歌がありません。
      </Text>
      <Text fontSize="sm" color="#52525B" textAlign="center">
        短歌を追加してみましょう。
      </Text>
    </VStack>
  );
}
