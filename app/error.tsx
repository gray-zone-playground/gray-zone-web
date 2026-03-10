'use client';

import { useEffect } from 'react';
import { Button } from '@/src/shared/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-[20px] font-bold text-heading">
          문제가 발생했습니다
        </h2>
        <p className="text-center text-[14px] text-caption">
          일시적인 오류가 발생했습니다. 다시 시도해주세요.
        </p>
      </div>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
