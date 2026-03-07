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
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Title */}
      <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        {topic.title}
      </h2>

      {/* VOTING status */}
      {topic.status === TopicStatus.VOTING && (
        <div className="space-y-4">
          <VoteButtons
            optionGood={topic.optionGood}
            optionEvil={topic.optionEvil}
            topicId={topic.id}
          />

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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

      {/* CHATTING status */}
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

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            토론 종료까지:{' '}
            <CountdownTimer targetDate={topic.chatClosedAt} />
          </div>
        </div>
      )}

      {/* SCHEDULED status */}
      {topic.status === TopicStatus.SCHEDULED && (
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            투표 예정
          </span>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            시작까지:{' '}
            <CountdownTimer targetDate={topic.scheduledAt} />
          </div>
        </div>
      )}

      {/* CLOSED status */}
      {topic.status === TopicStatus.CLOSED && (
        <div className="space-y-4">
          {result && (
            <ProgressBar
              goodCount={result.goodCount}
              evilCount={result.evilCount}
            />
          )}

          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            종료됨
          </span>
        </div>
      )}
    </div>
  );
}
