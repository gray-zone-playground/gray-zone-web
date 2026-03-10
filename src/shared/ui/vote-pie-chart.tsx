'use client';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { TopicResult } from '@/src/shared/types';

type VotePieChartProps = {
  result: TopicResult;
  className?: string;
};

const COLORS = {
  good: '#3b82f6',
  evil: '#ef4444',
};

type PayloadItem = {
  name: string;
  value: number;
  payload: { name: string; label: string; value: number };
};

function CustomTooltip({ active, payload }: { active?: boolean; payload?: PayloadItem[] }) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0];

  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-lg">
      <p className="text-[13px] font-semibold text-heading">{item.payload.label}</p>
      <p className="text-[12px] text-foreground">{item.payload.value}표</p>
    </div>
  );
}

export function VotePieChart({ result, className = '' }: VotePieChartProps) {
  // 왼쪽=악, 오른쪽=선 (startAngle=90 기준 반시계방향으로 evil→good 순)
  const data = [
    { name: 'evil', label: '악 (Evil)', value: result.evil.count },
    { name: 'good', label: '선 (Good)', value: result.good.count },
  ];

  const isEmpty = result.total === 0;

  if (isEmpty) {
    return (
      <div className={`flex items-center justify-center py-8 text-[14px] text-caption ${className}`}>
        아직 투표 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          cx={110}
          cy={110}
          outerRadius={90}
          startAngle={90}
          endAngle={450}
          dataKey="value"
          stroke="none"
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={COLORS[entry.name as keyof typeof COLORS]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>

      {/* Legend: 왼쪽=악, 오른쪽=선 */}
      <div className="mt-2 flex items-center gap-6 text-[13px] font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-error-500" />
          <span className="text-foreground">악 {result.evil.count}표</span>
          <span className="text-caption">({(result.evil.ratio * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-info-500" />
          <span className="text-foreground">선 {result.good.count}표</span>
          <span className="text-caption">({(result.good.ratio * 100).toFixed(1)}%)</span>
        </div>
      </div>

      <p className="mt-1 text-[12px] text-caption">총 {result.total}명 참여</p>
    </div>
  );
}
