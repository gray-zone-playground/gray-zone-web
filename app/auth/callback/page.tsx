'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setTokens } from '@/src/shared/lib/auth';
import { useAuthStore } from '@/src/features/auth';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) {
      router.replace('/login');
      return;
    }

    setTokens({ accessToken, refreshToken });
    fetchUser().then(() => {
      router.replace('/');
    });
  }, [searchParams, router, fetchUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-[14px] text-gray-500">로그인 처리 중...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-[14px] text-gray-500">로그인 처리 중...</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
