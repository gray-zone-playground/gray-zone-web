"use client";

import { useEffect, useState } from "react";
import { GNB } from "@/src/widgets/gnb";
import { VoteCard } from "@/src/widgets/vote-card";
import { TopicTabs } from "@/src/widgets/topic-tabs";
import { CountdownTimer } from "@/src/shared/ui";
import { useVotingStore } from "@/src/features/voting";
import { useAuthStore } from "@/src/features/auth";

export default function Home() {
  const authReady = useAuthStore((s) => s.authReady);
  const { currentTopic, nextTopic, isTopicLoading, fetchCurrentTopic, fetchNextTopic } =
    useVotingStore();
  const [activeTab, setActiveTab] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 0;
    if (hour < 20) return 1;
    return 2;
  });

  const subscribeTopicStatus = useVotingStore((s) => s.subscribeTopicStatus);
  const unsubscribeTopicStatus = useVotingStore((s) => s.unsubscribeTopicStatus);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // 인증 상태 확인 후 토픽 fetch (myVote를 정확히 받기 위해)
  useEffect(() => {
    if (!authReady) return;
    fetchCurrentTopic();
    fetchNextTopic();
  }, [authReady, fetchCurrentTopic, fetchNextTopic]);

  // 인증된 사용자만 topic 소켓 구독
  useEffect(() => {
    if (!authReady || !isAuthenticated) return;
    subscribeTopicStatus();
    return () => unsubscribeTopicStatus();
  }, [authReady, isAuthenticated, subscribeTopicStatus, unsubscribeTopicStatus]);

  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <main className="mx-auto max-w-lg px-4 py-6">
        {!authReady || isTopicLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-[14px] text-caption">Loading...</div>
          </div>
        ) : currentTopic ? (
          <VoteCard topic={currentTopic} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <p className="text-[14px] text-caption">
              현재 진행 중인 투표가 없습니다
            </p>
            {nextTopic && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-[12px] text-caption">다음 투표까지</p>
                <CountdownTimer targetDate={nextTopic.scheduledAt} />
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
