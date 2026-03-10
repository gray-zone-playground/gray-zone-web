"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NicknameForm } from "@/src/features/auth";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupToken = searchParams.get("signupToken");

  useEffect(() => {
    if (!signupToken) {
      router.replace("/login");
    }
  }, [signupToken, router]);

  if (!signupToken) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-heading">
            닉네임을 설정하세요
          </h1>
          <p className="text-center text-[14px] leading-[1.6] text-caption">
            다른 사용자에게 보여질 이름입니다
          </p>
        </div>

        <NicknameForm signupToken={signupToken} />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-[14px] text-caption">로딩 중...</p>
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
