import { create } from 'zustand';
import type { User, AuthTokens } from '@/src/shared/types';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/src/shared/lib/auth';
import { apiPost, refreshTokens } from '@/src/shared/api/client';
import { getMyProfile } from '@/src/entities/user';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsSignup: boolean;
  authReady: boolean;
};

type AuthActions = {
  signup: (signupToken: string, nickname: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setNeedsSignup: (val: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  needsSignup: false,
  authReady: false,

  signup: async (signupToken: string, nickname: string) => {
    set({ isLoading: true });
    try {
      const tokens = await apiPost<AuthTokens>('/auth/signup', { signupToken, nickname });
      console.log('[signup] accessToken:', tokens.accessToken);
      setTokens(tokens);
      await get().fetchUser();
      set({ needsSignup: false });
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiPost('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getMyProfile();
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken && !refreshToken) {
      set({ user: null, isAuthenticated: false, authReady: true });
      return;
    }

    // accessToken이 없으면 refreshToken으로 먼저 갱신
    if (!accessToken && refreshToken) {
      const refreshed = await refreshTokens();
      if (!refreshed) {
        set({ user: null, isAuthenticated: false, authReady: true });
        return;
      }
    }

    await get().fetchUser();
    set({ authReady: true });
  },

  setNeedsSignup: (val: boolean) => {
    set({ needsSignup: val });
  },
}));
