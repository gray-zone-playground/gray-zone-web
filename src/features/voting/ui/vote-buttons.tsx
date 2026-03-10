'use client';

import { useState } from 'react';
import { VoteChoice } from '@/src/shared/types';
import { LoginRequiredModal } from '@/src/shared/ui';
import { useAuthStore } from '@/src/features/auth';
import { useVotingStore } from '../model/voting-store';

type VoteButtonsProps = {
  optionGood: string;
  optionEvil: string;
  disabled?: boolean;
  onVoted?: () => void;
};

export function VoteButtons({
  optionGood,
  optionEvil,
  disabled = false,
  onVoted,
}: VoteButtonsProps) {
  const vote = useVotingStore((s) => s.vote);
  const isVoting = useVotingStore((s) => s.isVoting);
  const myVote = useVotingStore((s) => s.currentTopic?.myVote ?? null);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const hasVoted = myVote !== null;
  const isDisabled = disabled || hasVoted || isVoting;

  const handleVote = async (choice: VoteChoice) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (isDisabled) return;
    try {
      await vote(choice);
      onVoted?.();
    } catch {
      // 투표 실패 시 별도 처리 없음 (store에서 myVote 변경 안됨)
    }
  };

  return (
    <>
      <div className="flex w-full gap-3">
        <button
          type="button"
          onClick={() => handleVote(VoteChoice.GOOD)}
          disabled={isDisabled}
          className={`flex-1 rounded-xl px-4 py-4 text-[14px] font-semibold leading-[1.6] transition-all ${
            myVote === VoteChoice.GOOD
              ? 'bg-info-500 text-white ring-2 ring-info-500/40'
              : hasVoted
                ? 'bg-background text-muted'
                : 'bg-info-100 text-info-900 hover:bg-info-500/20'
          } disabled:cursor-not-allowed`}
        >
          {isVoting ? '투표 중...' : optionGood}
        </button>
        <button
          type="button"
          onClick={() => handleVote(VoteChoice.EVIL)}
          disabled={isDisabled}
          className={`flex-1 rounded-xl px-4 py-4 text-[14px] font-semibold leading-[1.6] transition-all ${
            myVote === VoteChoice.EVIL
              ? 'bg-error-500 text-white ring-2 ring-error-500/40'
              : hasVoted
                ? 'bg-background text-muted'
                : 'bg-error-100 text-error-900 hover:bg-error-500/20'
          } disabled:cursor-not-allowed`}
        >
          {isVoting ? '투표 중...' : optionEvil}
        </button>
      </div>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
