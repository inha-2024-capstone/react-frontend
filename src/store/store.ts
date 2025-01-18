import { create } from 'zustand';

// login, logout, isAuth
type AuthState = {
  isAuth: boolean;
  accessToken?: string;
  refreshToken?: string;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  login: (accessToken: string, refreshToken: string) => {
    set({ isAuth: true });
    set({ accessToken });
    set({ refreshToken });
  },
  logout: () =>
    set({ isAuth: false, accessToken: undefined, refreshToken: undefined }),
}));
