import type { AuthTokens } from '@/src/shared/types';

let accessToken: string | null = null;

const REFRESH_TOKEN_KEY = 'gray-zone-refresh-token';

/** Get the current in-memory access token */
export function getAccessToken(): string | null {
  return accessToken;
}

/** Get the refresh token from localStorage */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/** Store both tokens (access in memory, refresh in localStorage) */
export function setTokens(tokens: AuthTokens): void {
  accessToken = tokens.accessToken;
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}

/** Clear all tokens */
export function clearTokens(): void {
  accessToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
