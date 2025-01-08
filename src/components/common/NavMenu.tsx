import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  HomeNavyIcon,
  HomeWhiteIcon,
  MyNavyIcon,
  MyWhiteIcon,
  RegisterNavyIcon,
  RegisterWhiteIcon,
} from '../../assets/navMenu';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/store';
import { useScrollDirection } from '../../hooks/useScrollDirection';

const NavMenu: React.FC = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const isAuth = useAuthStore((state) => state.isAuth);
  const scrollDirection = useScrollDirection();

  return (
    <Nav $hidden={scrollDirection === 'down'}>
      <NavTitle>Global Navigation Menu</NavTitle>
      <NavUl>
        {navList.map((nav) => (
          <NavLi
            key={nav.url}
            $active={currentUrl === nav.url ? 'true' : 'false'}
          >
            <Link to={nav.url === '/mypage' && !isAuth ? '/login' : nav.url}>
              <NavIcon
                src={currentUrl === nav.url ? nav.activeIcon : nav.inactiveIcon}
                alt={nav.title}
              />
              {nav.title}
            </Link>
          </NavLi>
        ))}
      </NavUl>
    </Nav>
  );
};

export default NavMenu;

const navList = [
  {
    title: '상품 등록',
    url: '/product/register',
    activeIcon: RegisterNavyIcon,
    inactiveIcon: RegisterWhiteIcon,
  },
  {
    title: '요거 홈',
    url: '/',
    activeIcon: HomeNavyIcon,
    inactiveIcon: HomeWhiteIcon,
  },
  {
    title: '마이',
    url: '/mypage',
    activeIcon: MyNavyIcon,
    inactiveIcon: MyWhiteIcon,
  },
];

interface NavLiProps {
  $active: string;
}
interface NavProps {
  $hidden: boolean;
}

const Nav = styled.nav<NavProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 4rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  height: fit-content;
  padding: 0 1rem;
  padding-bottom: calc(env(safe-area-inset-bottom) + 0rem);
  padding-bottom: calc(constant(safe-area-inset-bottom) + 0rem);
  z-index: 100;
  background-color: #fff;
  color: #666;
  border-top: 1px solid rgba(138, 138, 138, 0.1);
  transform: ${({ $hidden }) =>
    $hidden ? 'translateY(100%)' : 'translateY(0)'};
  transition: transform 0.3s ease-in-out;
`;
const NavTitle = styled.h1`
  display: none;
`;
const NavUl = styled.ul`
  width: 100%;
  display: flex;
  list-style-type: none;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;
const NavLi = styled.li<NavLiProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #1e3050;
    font-size: 0.7rem;
    font-weight: ${({ $active }) => ($active === 'true' ? 700 : 500)};
    line-height: 0.8rem;
    text-decoration: none;
    margin: 0.45rem 0 0.3rem 0;
  }
`;
const NavIcon = styled.img`
  margin-bottom: 0.3rem;
  height: 1.6rem;
  width: auto;
`;
