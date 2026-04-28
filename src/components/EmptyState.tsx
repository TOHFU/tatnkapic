// 短歌が存在しない場合のEmptyState
import { Box, Text, VStack } from '@chakra-ui/react';
import { LuRabbit } from 'react-icons/lu';

export function EmptyState() {
  return (
    <VStack gap="6" px="8" py="12" w="374px">
      <Box as={LuRabbit} w="8" h="8" color="gray.400" />
      <Text fontSize="lg" fontWeight="semibold" color="gray.800" textAlign="center">
        まだ短歌がありません。
      </Text>
      <Text fontSize="sm" color="gray.600" textAlign="center">
        短歌を追加してみましょう。
      </Text>
    </VStack>
  );
}
