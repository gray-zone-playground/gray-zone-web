'use client';

type ProgressBarProps = {
  goodCount: number;
  evilCount: number;
  className?: string;
};

export function ProgressBar({ goodCount, evilCount, className = '' }: ProgressBarProps) {
  const total = goodCount + evilCount;
  const goodPct = total > 0 ? Math.round((goodCount / total) * 100) : 50;
  const evilPct = total > 0 ? 100 - goodPct : 50;

  return (
    <div className={`w-full ${className}`}>
      {/* Percentage labels */}
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span className="text-blue-600 dark:text-blue-400">{goodPct}%</span>
        <span className="text-red-600 dark:text-red-400">{evilPct}%</span>
      </div>

      {/* Bar */}
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="flex items-center justify-center bg-blue-500 text-[10px] font-bold text-white transition-all duration-500 ease-out dark:bg-blue-400"
          style={{ width: `${goodPct}%` }}
        />
        <div
          className="flex items-center justify-center bg-red-500 text-[10px] font-bold text-white transition-all duration-500 ease-out dark:bg-red-400"
          style={{ width: `${evilPct}%` }}
        />
      </div>
    </div>
  );
}
