'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'kakao' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick' | 'disabled'>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-heading text-surface hover:opacity-90 disabled:bg-border disabled:text-muted',
  secondary:
    'bg-border text-foreground hover:bg-surface-hover disabled:bg-background disabled:text-muted',
  kakao:
    'bg-[#FEE500] text-[#191919] hover:bg-[#FDD800] disabled:bg-[#FEE500]/50',
  danger:
    'bg-error-500 text-white hover:bg-[#DC2626] disabled:bg-error-100 disabled:text-error-900',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[14px] rounded-md',
  md: 'px-4 py-2 text-[16px] rounded-lg',
  lg: 'px-6 py-3 text-[18px] rounded-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-semibold transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted
        disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
