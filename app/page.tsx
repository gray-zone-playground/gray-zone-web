"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GNB } from "@/src/widgets/gnb";
import { VoteCard } from "@/src/widgets/vote-card";
import { CountdownTimer } from "@/src/shared/ui";
import { useVotingStore } from "@/src/features/voting";
import { useAuthStore } from "@/src/features/auth";
import { TopicStatus } from "@/src/shared/types";

export default function Home() {
  const router = useRouter();
  const authReady = useAuthStore((s) => s.authReady);
  const currentTopic = useVotingStore((s) => s.currentTopic);
  const nextTopic = useVotingStore((s) => s.nextTopic);
  const isTopicLoading = useVotingStore((s) => s.isTopicLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // 인증 상태 확인 후 토픽 fetch
  useEffect(() => {
    if (!authReady) return;
    const { fetchCurrentTopic, fetchNextTopic } = useVotingStore.getState();
    fetchCurrentTopic();
    fetchNextTopic();
  }, [authReady]);

  // 인증된 사용자만 topic 소켓 구독
  useEffect(() => {
    if (!authReady || !isAuthenticated) return;
    const { subscribeTopicStatus, unsubscribeTopicStatus } = useVotingStore.getState();
    subscribeTopicStatus();
    return () => unsubscribeTopicStatus();
  }, [authReady, isAuthenticated]);

  // CHATTING 상태면 자동으로 채팅 페이지로 이동
  useEffect(() => {
    if (currentTopic?.status === TopicStatus.CHATTING) {
      router.push(`/topics/${currentTopic.id}`);
    }
  }, [currentTopic?.status, currentTopic?.id, router]);

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
      </main>
    </div>
  );
}
