'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  type = 'text',
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--color-foreground)' }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`
          w-full px-3 py-2 text-base rounded-lg
          border-2 transition-all duration-200
          focus:outline-none focus:shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error focus:border-error' : 'border-border focus:border-primary'}
          ${className}
        `}
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-foreground)',
          borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
        }}
        {...props}
      />
      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
