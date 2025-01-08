import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useAuthStore } from './store/store';
import { LoginPage, SignUpPage, HomePage, ProductPage } from './pages';
import ProductRegisterPage from './pages/ProductRegisterPage';

const MyPage: React.FC = () => {
  return <h1>My Page</h1>;
};

const App: React.FC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/mypage"
          element={isAuth ? <MyPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signUp"
          element={isAuth ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route path="/product/register" element={<ProductRegisterPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
