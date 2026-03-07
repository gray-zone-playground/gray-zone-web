import { create } from 'zustand';
import type { User } from '@/src/shared/types';
import { getAccessToken, clearTokens } from '@/src/shared/lib/auth';
import { getMyProfile } from '@/src/entities/user';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsSignup: boolean;
};

type AuthActions = {
  login: () => Promise<void>;
  signup: (nickname: string) => Promise<void>;
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

  login: async () => {
    // TODO: 카카오 로그인 연동
    // 카카오 OAuth 리다이렉트 URL로 이동
  },

  signup: async (nickname: string) => {
    set({ isLoading: true });
    try {
      // TODO: POST /auth/signup { nickname }
      // const tokens = await apiPost<AuthTokens>('/auth/signup', { nickname });
      // setTokens(tokens);
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
      // TODO: POST /auth/logout
      // await apiPost('/auth/logout');
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
    const token = getAccessToken();
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }
    await get().fetchUser();
  },

  setNeedsSignup: (val: boolean) => {
    set({ needsSignup: val });
  },
}));
