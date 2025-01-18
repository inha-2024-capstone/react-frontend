import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useAuthStore } from './store/store';
import { LoginPage, SignUpPage, HomePage, ProductPage } from './pages';
import ProductRegisterPage from './pages/ProductRegisterPage';
import UserService from './services/UserService';

const MyPage: React.FC = () => {
  return <h1>My Page</h1>;
};

const App: React.FC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    const accessToken = localStorage.getItem('yogerAccessToken');
    const refreshToken = localStorage.getItem('yogerRefreshToken');
    if (accessToken && refreshToken) {
      UserService.refreshToken()
        .then((response) => {
          if (response.isSucceeded === false) {
            localStorage.removeItem('yogerAccessToken');
            localStorage.removeItem('yogerRefreshToken');
            useAuthStore.getState().logout();
            return;
          }
          console.log('refresh token');
          useAuthStore
            .getState()
            .login(response.accessToken, response.refreshToken);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, []);

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
