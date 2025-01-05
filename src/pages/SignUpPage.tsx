import React from 'react';
import Header from '../components/common/Header';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Footer from '../components/common/Footer';
import SignUp from '../components/signUp/SignUp';

const SignUpPage: React.FC = () => {
  useDocumentTitle('회원가입 | Yoger');

  return (
    <>
      <Header />
      <SignUp />
      <Footer />
    </>
  );
};

export default SignUpPage;
