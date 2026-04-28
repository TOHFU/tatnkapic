// 共通フッター（Logo、リンク、著作権）
import { Text, VStack } from '@chakra-ui/react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <VStack
      as="footer"
      w="311px"
      py="16px"
      gap="10px"
      flex="1"
      justify="flex-end"
      alignItems="stretch"
    >
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
