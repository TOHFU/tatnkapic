// 短歌一覧画面のページ遷移ローディング
import { Box } from '@chakra-ui/react';
import { LuLoaderCircle } from 'react-icons/lu';

export default function Loading() {
  return (
    <Box
      bg="#F5F5F1"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LuLoaderCircle size={24} className="spinner" />
    </Box>
  );
}
