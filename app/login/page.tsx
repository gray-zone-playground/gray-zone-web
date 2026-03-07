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
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            GrayZone
          </h1>
          <p className="text-center text-sm text-muted">
            선과 악의 경계에서 당신의 선택은?
          </p>
        </div>

        <KakaoLoginButton />

        <Link
          href="/"
          className="text-xs text-muted transition-colors hover:text-foreground"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
