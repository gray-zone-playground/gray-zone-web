import { getAccessToken, setTokens, clearTokens, getRefreshToken } from '@/src/shared/lib/auth';
import type { AuthTokens } from '@/src/shared/types';

// TODO: .env.local 파일에 NEXT_PUBLIC_API_URL 설정 필요
// 예시: NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
};

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(path, BASE_URL || 'http://localhost');
  if (!BASE_URL) {
    // fallback: construct relative-ish URL when BASE_URL not set
  }
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return BASE_URL ? url.toString() : `${path}${url.search}`;
}

function authHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(buildUrl('/auth/refresh'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const tokens: AuthTokens = await res.json();
    setTokens(tokens);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path, options.params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...options.headers,
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (options.body !== undefined) {
    config.body = JSON.stringify(options.body);
  }

  let res = await fetch(url, config);

  // If 401, attempt token refresh and retry once
  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const retryHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...authHeaders(),
        ...options.headers,
      };
      res = await fetch(url, { ...config, headers: retryHeaders });
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `API error: ${res.status}`);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export function apiGet<T>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>('GET', path, options);
}

export function apiPost<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
  return request<T>('POST', path, { ...options, body });
}

export function apiPatch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
  return request<T>('PATCH', path, { ...options, body });
}

export function apiDelete<T>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>('DELETE', path, options);
}
