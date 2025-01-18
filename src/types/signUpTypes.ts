interface Response {
  isSucceeded: boolean;
  code: string;
  message: string;
}

export interface SignInResponse extends Response {
  result: Record<string, unknown>;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpResponse extends Response {
  result: Record<string, unknown>;
}

export interface CheckNicknameResponse extends Response {
  result: boolean;
}

export interface CheckEmailResponse extends Response {
  result: boolean;
}

export interface LogoutResponse extends Response {
  result: Record<string, unknown>;
}

export interface OAuthLoginResponse {
  redirectedURL: string;
}

export interface AuthInfoResponse extends Response {
  result: {
    address: string;
    email: string;
    gender: string;
    imageUri: string;
    nickName: string;
    phoneNumber: string;
    username: string;
  };
}

export interface CompanyAuthInfoResponse extends Response {
  result: {
    companyName: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
  };
}
