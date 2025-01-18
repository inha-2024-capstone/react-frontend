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
  logout: () => void;
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
  logout: () =>
    set({
      address: '',
      email: '',
      gender: '',
      imageUri: '',
      nickName: '',
      phoneNumber: '',
      username: '',
    }),
}));

// 사용자 유형
type UserType = {
  userType: string;
  setUserType: (userType: string) => void;
};

export const useUserTypeStore = create<UserType>((set) => ({
  userType: 'user',
  setUserType: (userType: string) => set({ userType }),
}));

// 회사 정보
type CompanyInfo = {
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
};

type CompanyInfoState = CompanyInfo & {
  setCompanyInfo: (companyInfo: CompanyInfo) => void;
  logout: () => void;
};

export const useCompanyInfoStore = create<CompanyInfoState>((set) => ({
  companyName: '',
  email: '',
  phoneNumber: '',
  address: '',
  description: '',
  shortDescription: '',
  imageUrl: '',
  setCompanyInfo: (companyInfo: CompanyInfo) => set(companyInfo),
  logout: () =>
    set({
      companyName: '',
      email: '',
      phoneNumber: '',
      address: '',
      description: '',
      shortDescription: '',
      imageUrl: '',
    }),
}));
