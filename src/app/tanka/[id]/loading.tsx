// 短歌詳細画面のページ遷移ローディング
import { Box } from '@chakra-ui/react';
import { LuLoaderCircle } from 'react-icons/lu';

export default function Loading() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LuLoaderCircle size={24} className="spinner" />
    </Box>
  );
}
