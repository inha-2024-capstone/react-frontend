import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuthStore } from '../store/store';
import styled from 'styled-components';
import { YogerLogoIcon } from '../assets/common';

const OAuthRedirectPage: React.FC = () => {
  useDocumentTitle('로그인 | Yoger');
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const accessToken: string = url.searchParams.get('Access-Token') || '';
  const refreshToken: string = url.searchParams.get('Refresh-Token') || '';
  if (accessToken && refreshToken) {
    localStorage.setItem('yogerAccessToken', accessToken);
    localStorage.setItem('yogerRefreshToken', refreshToken);
    useAuthStore.getState().login(accessToken, refreshToken);
    navigate('/');
  } else {
    navigate('/login');
  }

  return (
    <Container>
      <RedirectTitle>
        <Logo src={YogerLogoIcon} alt="Yoger" />
        간편 로그인
      </RedirectTitle>
      <RedirectText>로그인 중입니다...</RedirectText>
    </Container>
  );
};

export default OAuthRedirectPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;
`;

const RedirectTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const RedirectText = styled.p`
  font-size: 1rem;
`;
