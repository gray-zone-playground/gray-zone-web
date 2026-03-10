"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GNB } from "@/src/widgets/gnb";
import { useAuthStore } from "@/src/features/auth";
import { Button, Input } from "@/src/shared/ui";
import { formatDate } from "@/src/shared/lib";
import { updateNickname, deleteAccount } from "@/src/entities/user";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, fetchUser } = useAuthStore();
  const [nickname, setNickname] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  if (!isAuthenticated || !user) return null;

  const handleUpdateNickname = async () => {
    if (!nickname.trim() || nickname === user.nickname) return;
    setIsUpdating(true);
    try {
      await updateNickname(nickname.trim());
      await fetchUser();
    } catch (error) {
      console.error("Failed to update nickname:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (!confirmed) return;

    try {
      await deleteAccount();
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <main className="mx-auto max-w-lg px-4 py-6">
        {/* User Info */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 text-[18px] font-semibold leading-[1.4] text-heading">
            내 정보
          </h2>
          <div className="flex flex-col gap-3 text-[14px] leading-[1.6]">
            <div className="flex justify-between">
              <span className="text-caption">닉네임</span>
              <span className="text-foreground">{user.nickname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption">가입일</span>
              <span className="text-foreground">
                {formatDate(user.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption">투표 수</span>
              <span className="text-foreground">-</span>
            </div>
          </div>
        </section>

        {/* Nickname Change */}
        <section className="mt-4 rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 text-[18px] font-semibold leading-[1.4] text-heading">
            닉네임 변경
          </h2>
          <div className="flex gap-2">
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="새 닉네임"
              className="flex-1"
            />
            <Button
              onClick={handleUpdateNickname}
              disabled={isUpdating || !nickname.trim() || nickname === user.nickname}
            >
              {isUpdating ? "변경 중..." : "변경"}
            </Button>
          </div>
        </section>

        {/* Account Actions */}
        <section className="mt-4 flex flex-col gap-3">
          <Button onClick={handleLogout} variant="secondary">
            로그아웃
          </Button>
          <Button onClick={handleDeleteAccount} variant="danger">
            회원 탈퇴
          </Button>
        </section>
      </main>
    </div>
  );
}
