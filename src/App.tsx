import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {
  useAuthStore,
  useCompanyInfoStore,
  useUserInfoStore,
  useUserTypeStore,
} from './store/store';
import {
  LoginPage,
  SignUpPage,
  HomePage,
  ProductPage,
  OAuthRedirectPage,
  ProductRegisterPage,
  MyPage,
  OrdersheetPage,
  ChatPage,
  PaymentConfirmPage,
  PaymentLookupPage,
  NotificationPage,
  ChatListPage,
} from './pages';
import UserService from './services/UserService';

const App: React.FC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>(
    useUserTypeStore.getState().userType,
  );

  useEffect(() => {
    if (
      useUserInfoStore.getState().nickName === '' &&
      useCompanyInfoStore.getState().companyName === ''
    ) {
      setIsLoaded(true);

      if (useUserTypeStore.getState().userType === 'user') {
        UserService.getAuthInfo()
          .then((response) => {
            if (response.isSucceeded === false) {
              alert('유저 정보를 가져오는데 실패했습니다.');
              return;
            }
            useUserInfoStore.getState().setUserInfo(response.result);
            setIsLoaded(false);
          })
          .catch((error) => {
            useUserTypeStore.getState().setUserType('company');
            setUserType('company');

            UserService.getCompanyAuthInfo()
              .then((response) => {
                if (response.isSucceeded === false) {
                  alert('유저 정보를 가져오는데 실패했습니다.');
                  return;
                }
                useCompanyInfoStore.getState().setCompanyInfo(response.result);
                setIsLoaded(false);
              })
              .catch((error) => {
                useUserTypeStore.getState().setUserType('user');
                setUserType('user');
              });
          });
      } else {
        UserService.getCompanyAuthInfo()
          .then((response) => {
            if (response.isSucceeded === false) {
              alert('유저 정보를 가져오는데 실패했습니다.');
              return;
            }
            useCompanyInfoStore.getState().setCompanyInfo(response.result);
            setIsLoaded(false);
          })
          .catch((error) => {
            useUserTypeStore.getState().setUserType('user');
            setUserType('user');

            UserService.getAuthInfo().then((response) => {
              if (response.isSucceeded === false) {
                alert('유저 정보를 가져오는데 실패했습니다.');
                return;
              }
              useUserInfoStore.getState().setUserInfo(response.result);
              setIsLoaded(false);
            });
          });
      }
    }
  }, []);

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
        <Route path="/oauth2/redirect" element={<OAuthRedirectPage />} />
        <Route
          path="/signUp"
          element={isAuth ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route path="/product/register" element={<ProductRegisterPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/ordersheet" element={<OrdersheetPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmPage />} />
        <Route path="/payment-lookup" element={<PaymentLookupPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/chat-list" element={<ChatListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
