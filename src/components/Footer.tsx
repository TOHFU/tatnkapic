// 共通フッター（Logo、リンク、著作権）
import { Text, VStack } from '@chakra-ui/react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <VStack
      as="footer"
      w="311px"
      py="4"
      gap="2.5"
      flex="1"
      justify="flex-end"
      alignItems="stretch"
    >
      <VStack gap="2.5" alignItems="flex-end">
        <Logo />
        <Text fontSize="xs" color="gray.800" asChild>
          <a href="https://tohfu-tronica.netlify.app/" target="_blank" rel="noopener noreferrer">
            tohfu-tronica.netlify.app
          </a>
        </Text>
        <Text fontSize="xs" color="gray.800">
          © tohfu-tronica
        </Text>
      </VStack>
    </VStack>
  );
}
