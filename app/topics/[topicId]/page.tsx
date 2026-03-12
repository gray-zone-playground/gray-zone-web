"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GNB } from "@/src/widgets/gnb";
import { ResultView } from "@/src/widgets/result-view";
import { ChatRoom } from "@/src/widgets/chat-room";
import { CountdownTimer } from "@/src/shared/ui";
import { TopicStatus } from "@/src/shared/types";
import { useVotingStore } from "@/src/features/voting";
import { useAuthStore } from "@/src/features/auth";
import { useChatStore } from "@/src/features/chatting";

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;

  const currentTopic = useVotingStore((s) => s.currentTopic);
  const isTopicLoading = useVotingStore((s) => s.isTopicLoading);
  const authReady = useAuthStore((s) => s.authReady);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isChatOpen = useChatStore((s) => s.isChatOpen);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const { fetchCurrentTopic, fetchResult } = useVotingStore.getState();
    fetchCurrentTopic();
    fetchResult(topicId);
  }, [topicId]);

  // topic 소켓 구독
  useEffect(() => {
    if (!authReady || !isAuthenticated) return;
    const { subscribeTopicStatus, unsubscribeTopicStatus } = useVotingStore.getState();
    subscribeTopicStatus();
    return () => unsubscribeTopicStatus();
  }, [authReady, isAuthenticated]);

  const canChat =
    currentTopic?.myVote !== null &&
    currentTopic?.myVote !== undefined &&
    currentTopic?.status === TopicStatus.CHATTING;

  // 채팅 종료 시 (topic:statusChanged 또는 chat:closed) → 홈으로 이동
  useEffect(() => {
    if (currentTopic?.status === TopicStatus.CLOSED || !isChatOpen) {
      setIsClosed(true);
      const timer = setTimeout(() => {
        router.replace("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentTopic?.status, isChatOpen, router]);

  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <main className="mx-auto max-w-lg px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; 홈으로
        </Link>

        {isTopicLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted text-sm">Loading...</div>
          </div>
        ) : (
          <>
            <ResultView topicId={topicId} />

            {isClosed ? (
              <div className="mt-6 rounded-lg border border-border bg-surface p-6 text-center">
                <p className="text-muted text-sm">
                  채팅이 종료되었습니다
                </p>
                <p className="mt-2 text-xs text-muted">
                  잠시 후 홈으로 이동합니다...
                </p>
              </div>
            ) : (
              <>
                {currentTopic?.chattingEndsAt && canChat && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-xs text-muted">채팅 종료까지</span>
                    <CountdownTimer targetDate={currentTopic.chattingEndsAt} />
                  </div>
                )}

                <div className="mt-4">
                  <ChatRoom topicId={topicId} canChat={canChat} />
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
