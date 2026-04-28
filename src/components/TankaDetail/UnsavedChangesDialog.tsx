// 編集確認ダイアログ（未保存の変更がある場合に戻る前に表示）
'use client';

import { Button, Dialog, Portal, Text } from '@chakra-ui/react';

interface UnsavedChangesDialogProps {
  open: boolean;
  onClose: () => void;
  onDiscard: () => void;
}

export function UnsavedChangesDialog({ open, onClose, onDiscard }: UnsavedChangesDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(d) => !d.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="xs">
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title fontSize="lg" fontWeight="semibold">
                短歌が編集されています
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize="sm" color="gray.600">
                変更内容を破棄しますか？
              </Text>
            </Dialog.Body>
            <Dialog.Footer gap="3" justifyContent="flex-end">
              <Button size="md" variant="outline" colorPalette="gray" onClick={onClose}>
                キャンセル
              </Button>
              <Button size="md" colorPalette="red" onClick={onDiscard}>
                破棄
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
