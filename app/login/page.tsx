"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore, KakaoLoginButton } from "@/src/features/auth";

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-gray-900">
            GrayZone
          </h1>
          <p className="text-center text-[14px] leading-[1.6] text-gray-500">
            선과 악의 경계에서 당신의 선택은?
          </p>
        </div>

        <KakaoLoginButton />

        <Link
          href="/"
          className="text-[12px] text-gray-500 transition-colors hover:text-gray-700"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
