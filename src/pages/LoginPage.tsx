import React from 'react';
import Header from '../components/common/Header';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Footer from '../components/common/Footer';
import Login from '../components/login/Login';

const LoginPage: React.FC = () => {
  useDocumentTitle('로그인 | Yoger');

  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
