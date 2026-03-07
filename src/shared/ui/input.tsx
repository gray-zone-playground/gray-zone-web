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
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          bg-white text-gray-900 border-gray-300
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
          dark:placeholder:text-gray-500
          dark:focus:ring-indigo-400 dark:focus:border-indigo-400
          dark:disabled:bg-gray-900
          ${error ? 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : ''}
          ${className}
        `.trim()}
        {...rest}
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
