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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,20}$/;

  const validateNickname = (value: string): string | null => {
    if (value.length === 0) return "닉네임을 입력해주세요.";
    if (value.length < 2) return "닉네임은 2자 이상이어야 합니다.";
    if (value.length > 20) return "닉네임은 20자 이하여야 합니다.";
    if (!NICKNAME_REGEX.test(value)) return "한글, 영문, 숫자만 사용할 수 있습니다.";
    return null;
  };

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
    const validationError = validateNickname(nickname.trim());
    if (validationError) {
      setNicknameError(validationError);
      return;
    }
    if (nickname.trim() === user.nickname) return;
    setIsUpdating(true);
    setErrorMessage(null);
    setNicknameError(null);
    try {
      await updateNickname(nickname.trim());
      await fetchUser();
    } catch (error) {
      const message = error instanceof Error ? error.message : "닉네임 변경에 실패했습니다.";
      setErrorMessage(message);
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
      const message = error instanceof Error ? error.message : "회원 탈퇴에 실패했습니다.";
      setErrorMessage(message);
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

        {errorMessage && (
          <div className="mt-4 rounded-lg border border-error-500 bg-error-100 p-3 text-[14px] text-error-900">
            {errorMessage}
          </div>
        )}

        {/* Nickname Change */}
        <section className="mt-4 rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 text-[18px] font-semibold leading-[1.4] text-heading">
            닉네임 변경
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (nicknameError) setNicknameError(validateNickname(e.target.value));
                }}
                placeholder="한글/영문/숫자 2-20자"
                maxLength={20}
                className="flex-1"
              />
              <Button
                onClick={handleUpdateNickname}
                disabled={isUpdating || !nickname.trim() || nickname === user.nickname}
              >
                {isUpdating ? "변경 중..." : "변경"}
              </Button>
            </div>
            {nicknameError && (
              <p className="text-[12px] font-medium text-error-500">{nicknameError}</p>
            )}
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
