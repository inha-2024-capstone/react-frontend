import { useNavigate, useLocation } from 'react-router-dom';
import { PrevIcon, YogerLogoIcon } from '../../assets/common';
import styled from 'styled-components';
import { HomeWhiteIcon } from '../../assets/navMenu';
import { MdOutlineLogout } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import UserService from '../../services/UserService';
import {
  useAuthStore,
  useCompanyInfoStore,
  useUserInfoStore,
} from '../../store/store';

const Header: React.FC = () => {
  const productRegex = /^\/product\/([^/]+)$/;
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // UserService.logout().then((response) => {
    //   if (response.isSucceeded === false) {
    //     alert('로그아웃에 실패했습니다.');
    //     return;
    //   }
    //   localStorage.removeItem('yogerAccessToken');
    //   localStorage.removeItem('yogerRefreshToken');
    //   useAuthStore.getState().logout();
    //   useUserInfoStore.getState().logout();
    //   useCompanyInfoStore.getState().logout();
    //   navigate('/');
    // });
    localStorage.removeItem('yogerAccessToken');
    localStorage.removeItem('yogerRefreshToken');
    useAuthStore.getState().logout();
    useUserInfoStore.getState().logout();
    useCompanyInfoStore.getState().logout();
    navigate('/');
  };

  return (
    <Container>
      {location.pathname === '/login' || location.pathname === '/signUp' ? (
        <PrevButton onClick={goBack}>
          <PrevImg src={PrevIcon} alt="뒤로가기" />
        </PrevButton>
      ) : location.pathname === '/ordersheet' ||
        location.pathname === '/payment-lookup' ? (
        <>
          <IconButton onClick={goBack}>
            <IconImg src={PrevIcon} alt="이전 페이지" />
          </IconButton>
          <OrdersheetTitle>
            {location.pathname === '/ordersheet' ? '주문서' : '주문 내역'}
          </OrdersheetTitle>
        </>
      ) : productRegex.test(location.pathname) ||
        location.pathname === '/chat' ? (
        <>
          <IconButton onClick={goBack}>
            <IconImg src={PrevIcon} alt="이전 페이지" />
          </IconButton>
          {location.pathname === '/chat' && (
            <ChatHeaderTitle>Seller Name</ChatHeaderTitle>
          )}
          <IconButton onClick={() => navigate('/')}>
            <IconImg src={HomeWhiteIcon} alt="홈으로" />
          </IconButton>
        </>
      ) : location.pathname === '/mypage' ? (
        <>
          <HeaderLogo src={YogerLogoIcon} alt="Yoger" />
          <Title>My</Title>
          <IconButtons>
            <IconBtn>
              <RiEdit2Fill color="#2C3E50" />
            </IconBtn>
            <IconBtn onClick={(e) => handleLogout(e)}>
              <MdOutlineLogout color="#2C3E50" />
            </IconBtn>
          </IconButtons>
        </>
      ) : (
        <>
          <HeaderLogo src={YogerLogoIcon} alt="Yoger" />
          <Title>Yoger</Title>
        </>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  z-index: 100;
  padding: 1.5rem 1rem 1rem 1rem;
  position: sticky;
  top: 0;
  background-color: #fff;
  align-items: anchor-center;
`;
const PrevButton = styled.button`
  background-color: transparent;
  border: none;
  height: 1.5rem;
`;
const PrevImg = styled.img`
  height: 1.5rem;
`;
const OrdersheetTitle = styled.h1`
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;
const HeaderLogo = styled.img`
  width: 2rem;
  margin-right: 0.6rem;
  padding-bottom: 0.2rem;
`;
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  height: 1.5rem;
  padding: 0;

  &:first-child {
    img {
      height: 1.3rem;
      padding-top: 0.2rem;
    }
  }

  &:last-child {
    margin-left: auto;
  }
`;
const IconImg = styled.img`
  height: 1.5rem;
  width: auto;
`;
const IconButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const IconBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.6rem;
  margin: 0;
  padding: 0;
  margin-left: 1.2rem;
  display: flex;
`;
const ChatHeaderTitle = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  font-weight: 600;
`;
