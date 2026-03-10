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
      <div className="flex justify-between mb-1 text-[12px] font-medium">
        <span className="text-info-500">{goodPct}%</span>
        <span className="text-error-500">{evilPct}%</span>
      </div>

      <div className="flex h-4 w-full overflow-hidden rounded-full bg-border">
        <div
          className="flex items-center justify-center bg-info-500 text-[10px] font-bold text-white transition-all duration-500 ease-out"
          style={{ width: `${goodPct}%` }}
        />
        <div
          className="flex items-center justify-center bg-error-500 text-[10px] font-bold text-white transition-all duration-500 ease-out"
          style={{ width: `${evilPct}%` }}
        />
      </div>
    </div>
  );
}
