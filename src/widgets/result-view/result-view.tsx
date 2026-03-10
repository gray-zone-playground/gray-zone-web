'use client';

import { useEffect, useState } from 'react';
import { useVotingStore } from '@/src/features/voting';
import { ProgressBar } from '@/src/shared/ui';

type ResultViewProps = {
  topicId: string;
};

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }

    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplay(current);

      if (step >= steps) {
        clearInterval(interval);
        setDisplay(value);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
}

export function ResultView({ topicId }: ResultViewProps) {
  const result = useVotingStore((s) => s.result);
  const isLoading = useVotingStore((s) => s.isLoading);
  const fetchResult = useVotingStore((s) => s.fetchResult);
  const currentTopic = useVotingStore((s) => s.currentTopic);

  useEffect(() => {
    fetchResult(topicId);
  }, [topicId, fetchResult]);

  if (isLoading) {
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
      {currentTopic && (
        <h2 className="text-[18px] font-semibold leading-[1.4] text-heading">
          {currentTopic.title}
        </h2>
      )}

      <ProgressBar goodCount={result.goodCount} evilCount={result.evilCount} />

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-xl bg-info-100 p-4">
          <p className="text-[14px] font-normal text-info-500">선 (Good)</p>
          <p className="mt-1 text-[24px] font-bold leading-[1.35] text-info-900">
            <AnimatedNumber value={result.goodCount} />
          </p>
        </div>
        <div className="rounded-xl bg-error-100 p-4">
          <p className="text-[14px] font-normal text-error-500">악 (Evil)</p>
          <p className="mt-1 text-[24px] font-bold leading-[1.35] text-error-900">
            <AnimatedNumber value={result.evilCount} />
          </p>
        </div>
      </div>

      <div className="text-center text-[14px] text-caption">
        총 참여자:{' '}
        <span className="font-semibold text-foreground">
          <AnimatedNumber value={result.totalCount} />
        </span>
        명
      </div>
    </div>
  );
}
