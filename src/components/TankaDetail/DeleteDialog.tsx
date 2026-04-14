// 短歌削除確認ダイアログ
'use client';

import { Button, Dialog, Portal, Text } from '@chakra-ui/react';
import { LuTrash2 } from 'react-icons/lu';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteDialog({ open, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(d) => !d.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2px">
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title fontSize="lg" fontWeight="semibold">
                短歌の削除
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize="sm" color="#52525B">
                削除するとこの短歌の情報が失われます。
              </Text>
            </Dialog.Body>
            <Dialog.Footer gap="12px" justifyContent="flex-end">
              <Button
                size="md"
                variant="outline"
                colorPalette="gray"
                onClick={onClose}
              >
                キャンセル
              </Button>
              <Button
                size="md"
                colorPalette="red"
                onClick={onConfirm}
              >
                <LuTrash2 />
                削除
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
