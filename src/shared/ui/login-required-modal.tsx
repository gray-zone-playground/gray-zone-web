'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';

type LoginRequiredModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginRequiredModal({ open, onClose }: LoginRequiredModalProps) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl">
        <h3 className="text-[16px] font-semibold text-heading">
          로그인이 필요합니다
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-foreground">
          로그인한 사람만 투표에 참여할 수 있습니다.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            fullWidth
            onClick={onClose}
            className="bg-background text-foreground hover:bg-border"
          >
            닫기
          </Button>
          <Button
            fullWidth
            onClick={() => router.push('/login')}
          >
            로그인하기
          </Button>
        </div>
      </div>
    </div>
  );
}
