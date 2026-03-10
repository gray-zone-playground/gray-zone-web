"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/features/auth";
import { useThemeStore } from "@/src/features/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const hydrate = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
