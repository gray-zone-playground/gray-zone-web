'use client';

const TIME_SLOTS = ['09:00', '12:00', '20:00'] as const;

type TopicTabsProps = {
  activeIndex: number;
  onTabChange: (index: number) => void;
};

export function TopicTabs({ activeIndex, onTabChange }: TopicTabsProps) {
  return (
    <div className="inline-flex gap-2 rounded-full bg-gray-200 p-1">
      {TIME_SLOTS.map((time, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={time}
            type="button"
            onClick={() => onTabChange(index)}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold leading-[1.6] transition-all ${
              isActive
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
