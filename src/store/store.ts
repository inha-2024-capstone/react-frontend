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

// 유저 정보
type UserInfo = {
  address: string;
  email: string;
  gender: string;
  imageUri: string;
  nickName: string;
  phoneNumber: string;
  username: string;
};

type UserInfoState = UserInfo & {
  setUserInfo: (userInfo: UserInfo) => void;
};

export const useUserInfoStore = create<UserInfoState>((set) => ({
  address: '',
  email: '',
  gender: '',
  imageUri: '',
  nickName: '',
  phoneNumber: '',
  username: '',
  setUserInfo: (userInfo: UserInfo) => set(userInfo),
}));
