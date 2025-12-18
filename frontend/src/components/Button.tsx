'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-semibold rounded-lg transition-all duration-200 
    flex items-center justify-center gap-2 whitespace-nowrap
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-primary text-white 
      hover:bg-blue-700 active:scale-95
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-secondary text-white 
      hover:bg-purple-700 active:scale-95
      shadow-sm hover:shadow-md
    `,
    outline: `
      border-2 border-primary text-primary 
      hover:bg-primary hover:text-white
      hover:border-primary-dark
    `,
    danger: `
      bg-error text-white 
      hover:bg-red-700 active:scale-95
      shadow-sm hover:shadow-md
    `,
    ghost: `
      text-foreground hover:bg-surface
      active:bg-border
    `,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      style={{
        backgroundColor: variant === 'primary' ? 'var(--color-primary)' : undefined,
        borderColor: variant === 'outline' ? 'var(--color-primary)' : undefined,
        color: variant === 'outline' ? 'var(--color-primary)' : undefined,
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
