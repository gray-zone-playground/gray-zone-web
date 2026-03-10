"use client";

import { useEffect, useState } from "react";
import { GNB } from "@/src/widgets/gnb";
import { VoteCard } from "@/src/widgets/vote-card";
import { TopicTabs } from "@/src/widgets/topic-tabs";
import { CountdownTimer } from "@/src/shared/ui";
import { useVotingStore } from "@/src/features/voting";

export default function Home() {
  const { currentTopic, nextScheduledAt, isLoading, fetchCurrentTopic, fetchNextTime } =
    useVotingStore();
  const [activeTab, setActiveTab] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 0;
    if (hour < 20) return 1;
    return 2;
  });

  useEffect(() => {
    fetchCurrentTopic();
    fetchNextTime();
  }, [fetchCurrentTopic, fetchNextTime]);

  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <main className="mx-auto max-w-lg px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-[14px] text-gray-500">Loading...</div>
          </div>
        ) : currentTopic ? (
          <VoteCard topic={currentTopic} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <p className="text-[14px] text-gray-500">
              현재 진행 중인 투표가 없습니다
            </p>
            {nextScheduledAt && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-[12px] text-gray-500">다음 투표까지</p>
                <CountdownTimer targetDate={nextScheduledAt} />
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <TopicTabs activeIndex={activeTab} onTabChange={setActiveTab} />
        </div>
      </main>
    </div>
  );
}
