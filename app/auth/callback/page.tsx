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

    console.log('[login] accessToken:', accessToken);
    setTokens({ accessToken, refreshToken });

    // URL에서 토큰 제거 (브라우저 히스토리 노출 방지)
    window.history.replaceState(null, '', '/auth/callback');

    fetchUser()
      .then(() => {
        router.replace('/');
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [searchParams, router, fetchUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-[14px] text-caption">로그인 처리 중...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-[14px] text-caption">로그인 처리 중...</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
