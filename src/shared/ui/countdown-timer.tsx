'use client';

import { useEffect, useState } from 'react';
import { getRemainingSeconds, formatTime } from '@/src/shared/lib/format';

type CountdownTimerProps = {
  targetDate: string;
  onExpired?: () => void;
  className?: string;
};

export function CountdownTimer({ targetDate, onExpired, className = '' }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() => getRemainingSeconds(targetDate));

  useEffect(() => {
    setRemaining(getRemainingSeconds(targetDate));

    const interval = setInterval(() => {
      const secs = getRemainingSeconds(targetDate);
      setRemaining(secs);

      if (secs <= 0) {
        clearInterval(interval);
        onExpired?.();
      }
    }, 1_000);

    return () => clearInterval(interval);
  }, [targetDate, onExpired]);

  const expired = remaining <= 0;

  return (
    <span className={`font-mono tabular-nums ${expired ? 'text-muted' : ''} ${className}`}>
      {expired ? '종료' : formatTime(remaining)}
    </span>
  );
}
