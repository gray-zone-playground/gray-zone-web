'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/features/auth';

export function GNB() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900 text-white">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          GrayZone
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 text-sm">
          {isAuthenticated && user ? (
            <Link
              href="/profile"
              className="rounded-md px-3 py-1.5 transition-colors hover:bg-gray-800"
            >
              {user.nickname}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 transition-colors hover:bg-gray-800"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
