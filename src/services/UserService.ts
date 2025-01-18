import {
  CheckEmailResponse,
  CheckNicknameResponse,
  LogoutResponse,
  OAuthLoginResponse,
  SignInResponse,
  SignUpResponse,
} from '../types/signUpTypes';
import { axiosInstance } from '../utils/axios';

// UTF-8 문자열을 Base64로 변환
const utf8ToBase64 = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str); // UTF-8로 문자열 변환
  const base64String = btoa(String.fromCharCode(...utf8Bytes)); // Base64 인코딩
  return base64String;
};

class UserService {
  // 유저 로그인
  public static async signIn(
    email: string,
    password: string,
  ): Promise<SignInResponse> {
    const response = await axiosInstance.get<SignInResponse>(
      '/api/auth/sign-in',
      {
        params: {},
        headers: {
          Authorization: `Basic ${utf8ToBase64(`${email}:${password}`)}`,
        },
      },
    );

    const accessToken = response.headers['access-token'];
    const refreshToken = response.headers['refresh-token'];

    return {
      ...response.data,
      accessToken,
      refreshToken,
    };
  }

  // 유저 회원가입
  public static async signUp(data: FormData): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      '/api/user/sign-up',
      {
        email: data.get('email'),
        username: data.get('username'),
        password: data.get('password'),
        role: data.get('role'),
        gender: data.get('gender'),
        phoneNumber: data.get('phoneNumber'),
        address: data.get('address'),
        nickName: data.get('nickName'),
        loginSource: data.get('loginSource'),
      },
    );

    console.log('response signUp : ', response);

    return response.data;
  }

  // 닉네임 중복 확인
  public static async checkNickname(
    nickname: string,
  ): Promise<CheckNicknameResponse> {
    const response = await axiosInstance.post<CheckNicknameResponse>(
      '/api/user/nickname',
      {
        nickname,
      },
    );
    console.log('response', response);

    return response.data;
  }

  // 이메일 중복 확인
  public static async checkEmail(email: string): Promise<CheckEmailResponse> {
    const response = await axiosInstance.post<CheckEmailResponse>(
      '/api/auth/email',
      {
        email,
      },
    );

    return response.data;
  }

  // 로그아웃
  public static async logout(): Promise<LogoutResponse> {
    const response = await axiosInstance.get<LogoutResponse>(
      '/api/auth/sign-out',
      {
        headers: {
          'Refresh-Token': localStorage.getItem('yogerRefreshToken'),
        },
      },
    );

    return response.data;
  }

  // 리프레시 토큰 재발급
  public static async refreshToken(): Promise<SignInResponse> {
    const response = await axiosInstance.get<SignInResponse>(
      '/api/auth/refresh',
      {
        headers: {
          'Refresh-Token': localStorage.getItem('yogerRefreshToken'),
        },
      },
    );

    const accessToken = response.headers['access-token'];
    const refreshToken = response.headers['refresh-token'];

    return {
      ...response.data,
      accessToken,
      refreshToken,
    };
  }
}

export default UserService;
