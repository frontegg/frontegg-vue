import { Theme, Size } from '@/styles';

export interface ButtonProps {
  fullWidth?: boolean;
  variant?: Theme;
  transparent?: boolean;
  isCancel?: boolean;
  asLink?: boolean;
  loading?: boolean;
  iconButton?: boolean;
  disabled?: boolean;
  ref?: string;
  class?: string;
  size?: Size;
}
