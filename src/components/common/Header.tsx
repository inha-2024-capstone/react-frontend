import { useNavigate, useLocation } from 'react-router-dom';
import { PrevIcon } from '../../assets/common';
import styled from 'styled-components';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {location.pathname === '/login' || location.pathname === '/signUp' ? (
        <PrevButton onClick={goBack}>
          <PrevImg src={PrevIcon} alt="뒤로가기" />
        </PrevButton>
      ) : (
        <Title>Yoger</Title>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  z-index: 100;
  padding-top: 3rem;
  padding-left: 1rem;
`;
const PrevButton = styled.button`
  background-color: transparent;
  border: none;
  height: 1.5rem;
`;
const PrevImg = styled.img`
  height: 1.5rem;
`;
const Title = styled.h1``;
