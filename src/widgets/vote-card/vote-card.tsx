'use client';

import { useEffect } from 'react';
import type { Topic } from '@/src/shared/types';
import { TopicStatus } from '@/src/shared/types';
import { CountdownTimer, VotePieChart } from '@/src/shared/ui';
import { useVotingStore, VoteButtons } from '@/src/features/voting';
import { useAuthStore } from '@/src/features/auth';

type VoteCardProps = {
  topic: Topic;
};

export function VoteCard({ topic }: VoteCardProps) {
  const result = useVotingStore((s) => s.result);
  const fetchResult = useVotingStore((s) => s.fetchResult);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const hasVoted = topic.myVote !== null;

  useEffect(() => {
    if (!isAuthenticated) return;
    if (
      hasVoted ||
      topic.status === TopicStatus.CHATTING ||
      topic.status === TopicStatus.CLOSED
    ) {
      fetchResult(topic.id);
    }
  }, [topic.id, topic.status, hasVoted, isAuthenticated, fetchResult]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-4 text-[18px] font-semibold leading-[1.4] text-heading">
        {topic.title}
      </h2>

      {topic.status === TopicStatus.VOTING && !hasVoted && (
        <div className="space-y-4">
          <VoteButtons
            optionGood={topic.optionGood}
            optionEvil={topic.optionEvil}
          />

          <div className="text-[12px] font-medium leading-[1.4] text-caption">
            <span>
              남은 시간:{' '}
              <CountdownTimer targetDate={topic.votingEndsAt} />
            </span>
          </div>
        </div>
      )}

      {topic.status === TopicStatus.VOTING && hasVoted && (
        <div className="space-y-4">
          {result && <VotePieChart result={result} />}

          <div className="text-center text-[12px] font-medium leading-[1.4] text-caption">
            남은 시간:{' '}
            <CountdownTimer targetDate={topic.votingEndsAt} />
          </div>
        </div>
      )}

      {topic.status === TopicStatus.SCHEDULED && (
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-warning-100 px-3 py-1 text-[10px] font-medium text-warning-900">
            투표 예정
          </span>

          <div className="text-[14px] font-normal leading-[1.6] text-caption">
            시작까지:{' '}
            <CountdownTimer targetDate={topic.scheduledAt} />
          </div>
        </div>
      )}

      {topic.status === TopicStatus.CLOSED && (
        <div className="space-y-4">
          {result && <VotePieChart result={result} />}

          <span className="inline-block rounded-full bg-border px-3 py-1 text-[10px] font-medium text-muted">
            종료됨
          </span>
        </div>
      )}
    </div>
  );
}
