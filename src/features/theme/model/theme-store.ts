import { create } from 'zustand';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  hydrated: boolean;
};

type ThemeActions = {
  toggleTheme: () => void;
  hydrate: () => void;
};

export const useThemeStore = create<ThemeState & ThemeActions>((set, get) => ({
  theme: 'light',
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    const saved = localStorage.getItem('theme') as Theme | null;
    const theme = saved ?? 'light';

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    set({ theme, hydrated: true });
  },

  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);

    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    set({ theme: next });
  },
}));
