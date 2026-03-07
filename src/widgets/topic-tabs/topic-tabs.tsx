'use client';

const TIME_SLOTS = ['09:00', '12:00', '20:00'] as const;

type TopicTabsProps = {
  activeIndex: number;
  onTabChange: (index: number) => void;
};

export function TopicTabs({ activeIndex, onTabChange }: TopicTabsProps) {
  return (
    <div className="inline-flex gap-2 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
      {TIME_SLOTS.map((time, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={time}
            type="button"
            onClick={() => onTabChange(index)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
