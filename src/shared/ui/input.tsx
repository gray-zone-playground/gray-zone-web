'use client';

import { type InputHTMLAttributes } from 'react';

type InputProps = {
  label?: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function Input({ label, error, className = '', id, ...rest }: InputProps) {
  const inputId = id ?? label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[14px] font-medium leading-[1.6] text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full rounded-lg border px-3 py-2 text-[14px] leading-[1.6]
          bg-white text-gray-800 border-gray-200
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400
          ${error ? 'border-error-500 focus:ring-error-500' : ''}
          ${className}
        `.trim()}
        {...rest}
      />
      {error && (
        <p className="text-[12px] font-medium text-error-500">{error}</p>
      )}
    </div>
  );
}
