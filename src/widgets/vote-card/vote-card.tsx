'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Topic } from '@/src/shared/types';
import { TopicStatus } from '@/src/shared/types';
import { CountdownTimer, ProgressBar, Button } from '@/src/shared/ui';
import { useVotingStore, VoteButtons } from '@/src/features/voting';

type VoteCardProps = {
  topic: Topic;
};

export function VoteCard({ topic }: VoteCardProps) {
  const hasVoted = useVotingStore((s) => s.hasVoted);
  const result = useVotingStore((s) => s.result);
  const fetchResult = useVotingStore((s) => s.fetchResult);

  useEffect(() => {
    if (
      topic.status === TopicStatus.CHATTING ||
      topic.status === TopicStatus.CLOSED
    ) {
      fetchResult(topic.id);
    }
  }, [topic.id, topic.status, fetchResult]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-4 text-[18px] font-semibold leading-[1.4] text-heading">
        {topic.title}
      </h2>

      {topic.status === TopicStatus.VOTING && (
        <div className="space-y-4">
          <VoteButtons
            optionGood={topic.optionGood}
            optionEvil={topic.optionEvil}
          />

          <div className="flex items-center justify-between text-[12px] font-medium leading-[1.4] text-caption">
            <span>
              남은 시간:{' '}
              <CountdownTimer targetDate={topic.closedAt} />
            </span>
            {hasVoted && result && (
              <span>총 {result.totalCount}표</span>
            )}
          </div>
        </div>
      )}

      {topic.status === TopicStatus.CHATTING && (
        <div className="space-y-4">
          {result && (
            <ProgressBar
              goodCount={result.goodCount}
              evilCount={result.evilCount}
            />
          )}

          <Link href={`/topics/${topic.id}`}>
            <Button fullWidth>토론 참여하기</Button>
          </Link>

          <div className="text-center text-[12px] font-medium leading-[1.4] text-caption">
            토론 종료까지:{' '}
            <CountdownTimer targetDate={topic.chatClosedAt} />
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
          {result && (
            <ProgressBar
              goodCount={result.goodCount}
              evilCount={result.evilCount}
            />
          )}

          <span className="inline-block rounded-full bg-border px-3 py-1 text-[10px] font-medium text-muted">
            종료됨
          </span>
        </div>
      )}
    </div>
  );
}
