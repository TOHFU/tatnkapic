import React from 'react';
import { Button } from '@chakra-ui/react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const SampleButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'solid',
  size = 'md',
}) => (
  <Button onClick={onClick} variant={variant} size={size}>
    {label}
  </Button>
);
