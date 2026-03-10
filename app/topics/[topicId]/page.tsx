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

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;

  const { currentTopic, isTopicLoading, fetchResult, fetchCurrentTopic } =
    useVotingStore();
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    fetchCurrentTopic();
    fetchResult(topicId);
  }, [topicId, fetchResult, fetchCurrentTopic]);

  const canChat =
    currentTopic?.myVote !== null &&
    currentTopic?.myVote !== undefined &&
    currentTopic?.status === TopicStatus.CHATTING;

  useEffect(() => {
    if (currentTopic?.status === TopicStatus.CLOSED) {
      setIsClosed(true);
      const timer = setTimeout(() => {
        router.replace("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentTopic?.status, router]);

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
