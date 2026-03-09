'use client';

import { useState } from 'react';
import { VoteChoice } from '@/src/shared/types';
import { useVotingStore } from '../model/voting-store';

type VoteButtonsProps = {
  optionGood: string;
  optionEvil: string;
  topicId: string;
  disabled?: boolean;
  onVoted?: () => void;
};

export function VoteButtons({
  optionGood,
  optionEvil,
  topicId,
  disabled = false,
  onVoted,
}: VoteButtonsProps) {
  const [selectedChoice, setSelectedChoice] = useState<VoteChoice | null>(null);
  const vote = useVotingStore((s) => s.vote);
  const isLoading = useVotingStore((s) => s.isLoading);
  const hasVoted = useVotingStore((s) => s.hasVoted);

  const isDisabled = disabled || hasVoted || isLoading;

  const handleVote = async (choice: VoteChoice) => {
    if (isDisabled) return;
    setSelectedChoice(choice);
    try {
      await vote(choice);
      onVoted?.();
    } catch {
      setSelectedChoice(null);
    }
  };

  return (
    <div className="flex w-full gap-3">
      <button
        type="button"
        onClick={() => handleVote(VoteChoice.GOOD)}
        disabled={isDisabled}
        className={`flex-1 rounded-xl px-4 py-4 text-[14px] font-semibold leading-[1.6] transition-all ${
          hasVoted && selectedChoice === VoteChoice.GOOD
            ? 'bg-info-500 text-white ring-2 ring-info-500/40'
            : hasVoted
              ? 'bg-gray-100 text-gray-400'
              : 'bg-info-100 text-info-900 hover:bg-info-500/20'
        } disabled:cursor-not-allowed`}
      >
        {isLoading && selectedChoice === VoteChoice.GOOD ? '투표 중...' : optionGood}
      </button>
      <button
        type="button"
        onClick={() => handleVote(VoteChoice.EVIL)}
        disabled={isDisabled}
        className={`flex-1 rounded-xl px-4 py-4 text-[14px] font-semibold leading-[1.6] transition-all ${
          hasVoted && selectedChoice === VoteChoice.EVIL
            ? 'bg-error-500 text-white ring-2 ring-error-500/40'
            : hasVoted
              ? 'bg-gray-100 text-gray-400'
              : 'bg-error-100 text-error-900 hover:bg-error-500/20'
        } disabled:cursor-not-allowed`}
      >
        {isLoading && selectedChoice === VoteChoice.EVIL ? '투표 중...' : optionEvil}
      </button>
    </div>
  );
}
