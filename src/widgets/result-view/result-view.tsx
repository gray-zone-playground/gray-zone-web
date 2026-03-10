'use client';

import { useEffect } from 'react';
import { useVotingStore } from '@/src/features/voting';
import { VotePieChart } from '@/src/shared/ui';

type ResultViewProps = {
  topicId: string;
};

export function ResultView({ topicId }: ResultViewProps) {
  const result = useVotingStore((s) => s.result);
  const isResultLoading = useVotingStore((s) => s.isResultLoading);
  const fetchResult = useVotingStore((s) => s.fetchResult);

  useEffect(() => {
    fetchResult(topicId);
  }, [topicId, fetchResult]);

  if (isResultLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-[14px] text-caption">
        결과를 불러오는 중...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center py-12 text-[14px] text-caption">
        결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-[18px] font-semibold leading-[1.4] text-heading">
        {result.title}
      </h2>

      <VotePieChart result={result} />
    </div>
  );
}
