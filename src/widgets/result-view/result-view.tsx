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
      <div className="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        결과를 불러오는 중...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Title */}
      {currentTopic && (
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {currentTopic.title}
        </h2>
      )}

      {/* Progress bar */}
      <ProgressBar goodCount={result.goodCount} evilCount={result.evilCount} />

      {/* Counts */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/30">
          <p className="text-sm text-blue-600 dark:text-blue-400">선 (Good)</p>
          <p className="mt-1 text-2xl font-bold text-blue-700 dark:text-blue-300">
            <AnimatedNumber value={result.goodCount} />
          </p>
        </div>
        <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/30">
          <p className="text-sm text-red-600 dark:text-red-400">악 (Evil)</p>
          <p className="mt-1 text-2xl font-bold text-red-700 dark:text-red-300">
            <AnimatedNumber value={result.evilCount} />
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        총 참여자:{' '}
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          <AnimatedNumber value={result.totalCount} />
        </span>
        명
      </div>
    </div>
  );
}
