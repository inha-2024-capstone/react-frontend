import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, useUserTypeStore } from '../../store/store';
import {
  GoogleCircleImg,
  KakaoCircleImg,
  NaverCircleImg,
} from '../../assets/login';
import { YogerLogoIcon } from '../../assets/common';
import styled from 'styled-components';
import UserService from '../../services/UserService';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<string>('user');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // useUserTypeStore.getState().setUserType(userType);
    // UserService.signIn(inputEmail, inputPassword).then((response) => {
    //   if (response.isSucceeded === false) {
    //     alert('로그인에 실패했습니다.');
    //     return;
    //   }

    //   localStorage.setItem('yogerAccessToken', response.accessToken);
    //   localStorage.setItem('yogerRefreshToken', response.refreshToken);
    //   login(response.accessToken, response.refreshToken);
    //   navigate('/');
    // });
    localStorage.setItem('yogerAccessToken', 'token');
    localStorage.setItem('yogerRefreshToken', 'token');
    login('token', 'token');
    navigate('/');
  };

  const handleOAuthLogin = (loginSource: string) => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}oauth2/authorization/${loginSource}?redirect_uri=http://localhost:3000/oauth2/redirect&mode=login`;
  };

  return (
    <Container>
      {/* 로그인 타이틀 */}
      <Title>
        <Logo src={YogerLogoIcon} alt="Yoger" />
        로그인
      </Title>

      {/* 사용자 유형 선택 */}
      <UserType>
        <UserTypeTitle>사용자 유형 선택</UserTypeTitle>
        <UserTypeButton
          $active={userType === 'user' ? 'true' : 'false'}
          onClick={() => setUserType('user')}
        >
          회원 로그인
        </UserTypeButton>
        <UserTypeButton
          $active={userType === 'company' ? 'true' : 'false'}
          onClick={() => setUserType('company')}
        >
          기업 로그인
        </UserTypeButton>
      </UserType>

      {/* 로그인 폼 */}
      <LoginForm onSubmit={handleSubmit}>
        <LoginLabel htmlFor="email">
          이메일
          <LoginInput
            type="email"
            id="email"
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            required
          />
        </LoginLabel>

        <LoginLabel htmlFor="password">
          비밀번호
          <LoginInput
            type="password"
            id="password"
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </LoginLabel>
        <LoginButton type="submit">로그인</LoginButton>
      </LoginForm>

      {/* 회원가입 링크 */}
      <Aside>
        회원이 아니신가요? <Link to="/signUp">회원가입 하기</Link>
      </Aside>

      {/* 간편 로그인 */}
      <QuickLogin>
        <QuickLoginTitle>
          간편 로그인
          <QuickLoginHr></QuickLoginHr>
        </QuickLoginTitle>
        <QuickLoginButton>
          <QuickLoginImg
            src={GoogleCircleImg}
            onClick={() => handleOAuthLogin('google')}
            alt="구글 로그인"
          />
        </QuickLoginButton>
        <QuickLoginButton>
          <QuickLoginImg
            src={KakaoCircleImg}
            onClick={() => handleOAuthLogin('kakao')}
            alt="카카오 로그인"
          />
        </QuickLoginButton>
        <QuickLoginButton>
          <QuickLoginImg
            src={NaverCircleImg}
            onClick={() => handleOAuthLogin('naver')}
            alt="네이버 로그인"
          />
        </QuickLoginButton>
      </QuickLogin>
    </Container>
  );
};

export default Login;

interface ButtonProps {
  $active: string;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: calc(100% - 3rem);
  flex: 1;
  justify-content: center;
  padding-bottom: 4rem;
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #1e3050;
`;
const Logo = styled.img`
  width: 2rem;
  margin-right: 0.6rem;
  padding-bottom: 0.2rem;
`;

// 사용자 유형 선택
const UserType = styled.section`
  width: 100%;
`;
const UserTypeTitle = styled.h2`
  display: none;
`;
const UserTypeButton = styled.button<ButtonProps>`
  width: 50%;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.$active === 'true' ? '#1E3050' : '#1E305025')};
  padding: 0.6rem 0;
  border-bottom: ${(props) =>
    props.$active === 'true' ? '2px solid #1E3050' : '2px solid #1E305025'};
`;

// 로그인 폼
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const LoginLabel = styled.label`
  display: block;
  width: 100%;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
`;
const LoginInput = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.7rem;
  border: 1px solid #858b95;
  border-radius: 0.5rem;
  font-size: 0.8rem;

  &:focus-visible {
    outline: 1px solid #1e3050;
  }
`;
const LoginButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 1rem;
  padding: 0.8rem 0;
  background-color: #1e3050;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 0.2rem;
`;

// 회원이 아니신가요?
const Aside = styled.aside`
  margin-top: 1rem;
  font-size: 0.8rem;

  a {
    color: #8e8982;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.2rem;
  }
`;

// 간편 로그인
const QuickLogin = styled.section`
  width: 100%;
`;
const QuickLoginTitle = styled.h2`
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #1e3050;
`;
const QuickLoginHr = styled.div`
  height: 1px;
  background-color: #1e305070;
  border: none;
  flex: 1;
  margin-left: 0.5rem;
`;
const QuickLoginButton = styled.button`
  background-color: transparent;
  border: none;
  width: 33.333%;
`;
const QuickLoginImg = styled.img``;
