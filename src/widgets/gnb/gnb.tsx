'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/features/auth';

export function GNB() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/" className="text-[20px] font-bold leading-[1.4] tracking-[-0.02em] text-gray-900">
          GrayZone
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <Link
              href="/profile"
              className="rounded-md px-3 py-1.5 text-[14px] font-normal leading-[1.6] text-gray-700 transition-colors hover:bg-gray-100"
            >
              {user.nickname}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-[14px] font-normal leading-[1.6] text-gray-700 transition-colors hover:bg-gray-100"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
