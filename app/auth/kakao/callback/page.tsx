'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setTokens } from '@/src/shared/lib/auth';
import { useAuthStore } from '@/src/features/auth';

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const setNeedsSignup = useAuthStore((s) => s.setNeedsSignup);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const isNewUser = searchParams.get('isNewUser') === 'true';

    if (!accessToken || !refreshToken) {
      router.replace('/login');
      return;
    }

    setTokens({ accessToken, refreshToken });

    if (isNewUser) {
      setNeedsSignup(true);
      router.replace('/signup');
    } else {
      fetchUser().then(() => {
        router.replace('/');
      });
    }
  }, [searchParams, router, fetchUser, setNeedsSignup]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted">로그인 처리 중...</p>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-sm text-muted">로그인 처리 중...</p>
        </div>
      }
    >
      <KakaoCallbackContent />
    </Suspense>
  );
}
