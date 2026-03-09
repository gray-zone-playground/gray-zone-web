"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, NicknameForm } from "@/src/features/auth";

export default function SignupPage() {
  const router = useRouter();
  const needsSignup = useAuthStore((s) => s.needsSignup);

  useEffect(() => {
    if (!needsSignup) {
      router.replace("/");
    }
  }, [needsSignup, router]);

  if (!needsSignup) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-gray-900">
            닉네임을 설정하세요
          </h1>
          <p className="text-center text-[14px] leading-[1.6] text-gray-500">
            다른 사용자에게 보여질 이름입니다
          </p>
        </div>

        <NicknameForm />
      </div>
    </div>
  );
}
