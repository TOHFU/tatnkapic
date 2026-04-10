import { Box, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Heading as="h1" size="2xl">
        🎋 TankaPic - 短歌管理アプリケーション
      </Heading>
    </Box>
  );
}
