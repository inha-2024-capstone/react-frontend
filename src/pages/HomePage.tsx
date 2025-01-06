import React from 'react';
import { Header, Footer, NavMenu } from '../components/common';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Hero, ProductList } from '../components/home';
import styled from 'styled-components';

const HomePage: React.FC = () => {
  useDocumentTitle('홈 | Yoger');
  return (
    <>
      <Header />
      <HomeMain>
        <Hero />
        <ProductList />
      </HomeMain>
      <Footer />
      <NavMenu />
    </>
  );
};

export default HomePage;

const HomeMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: calc(100vh - 14rem);
`;
