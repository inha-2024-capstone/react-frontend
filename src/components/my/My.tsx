import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import {
  useCompanyInfoStore,
  useUserInfoStore,
  useUserTypeStore,
} from '../../store/store';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MyWhiteIcon } from '../../assets/navMenu';
import { RiFileList3Fill } from 'react-icons/ri';

const My: React.FC = () => {
  const [userType, setUserType] = useState<string>(
    useUserTypeStore.getState().userType,
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
            console.log('auth info', response);
            useUserInfoStore.getState().setUserInfo(response.result);
            setIsLoaded(false);
          })
          .catch((error) => {
            useUserTypeStore.getState().setUserType('company');
            setUserType('company');
          });
      } else {
        UserService.getCompanyAuthInfo()
          .then((response) => {
            if (response.isSucceeded === false) {
              alert('유저 정보를 가져오는데 실패했습니다.');
              return;
            }
            console.log('company auth info', response);
            useCompanyInfoStore.getState().setCompanyInfo(response.result);
            setIsLoaded(false);
          })
          .catch((error) => {
            useUserTypeStore.getState().setUserType('user');
            setUserType('user');
          });
      }
    }
  }, [userType]);

  return (
    <>
      {isLoaded ? (
        <LoadingSection>
          <LoadingTitle>로딩 중</LoadingTitle>
          <LoadingText>유저 정보를 불러오는 중입니다</LoadingText>
        </LoadingSection>
      ) : (
        <MyMain>
          <MyTitle>My Page</MyTitle>
          {/* 사용자 정보 */}
          <MainBackground>
            <MainSection>
              <MyTitle>My Info</MyTitle>
              <MyImg
                src={
                  (
                    userType === 'user'
                      ? useUserInfoStore.getState().imageUri
                      : useCompanyInfoStore.getState().imageUrl
                  )
                    ? userType === 'user'
                      ? useUserInfoStore.getState().imageUri
                      : useCompanyInfoStore.getState().imageUrl
                    : MyWhiteIcon
                }
                alt="profile"
              />

              <MainInfo>
                <MyNickname>
                  {userType === 'user'
                    ? useUserInfoStore.getState().nickName
                    : useCompanyInfoStore.getState().companyName}
                </MyNickname>
                <MyEmail>
                  Email :{' '}
                  {
                    (userType === 'user'
                      ? useUserInfoStore
                      : useCompanyInfoStore
                    ).getState().email
                  }
                </MyEmail>
              </MainInfo>
            </MainSection>
          </MainBackground>

          {/* 주문 내역 링크 */}
          <PaymentLookupLink to="/payment-lookup">
            <PaymentLookupIcon />
            {userType === 'user' ? '주문' : '판매'}내역 보기
          </PaymentLookupLink>

          {/* 사용자 상세 정보 */}
          <UserDetail>
            <UserDetailTitle>세부 정보</UserDetailTitle>
            {userType === 'user' && (
              <>
                <DetailItem
                  title="이름"
                  content={useUserInfoStore.getState().username}
                />
                <DetailItem
                  title="성별"
                  content={
                    useUserInfoStore.getState().gender == 'MALE'
                      ? '남자'
                      : '여자'
                  }
                />
              </>
            )}
            <DetailItem
              title="전화번호"
              content={
                (userType === 'user'
                  ? useUserInfoStore
                  : useCompanyInfoStore
                ).getState().phoneNumber
              }
            />
            <DetailItem
              title="주소"
              content={
                (userType === 'user'
                  ? useUserInfoStore
                  : useCompanyInfoStore
                ).getState().address
              }
            />
            {userType === 'company' && (
              <>
                <DetailItem
                  title="회사 소개"
                  content={useCompanyInfoStore.getState().shortDescription}
                />
                <DetailItem
                  title="상세 회사 소개"
                  content={useCompanyInfoStore.getState().description}
                />
              </>
            )}
          </UserDetail>
        </MyMain>
      )}
    </>
  );
};

export default My;

const DetailItem: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  return (
    <UserDetailItem>
      <UserDetailItemTitle>{title}</UserDetailItemTitle>
      <UserDetailItemContent>{content}</UserDetailItemContent>
    </UserDetailItem>
  );
};

// 주문 내역 보기 링크
const PaymentLookupLink = styled(Link)`
  margin-top: 1rem;
  text-align: right;
  color: #1e3050;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  background-color: #f1f1f1;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
`;
const PaymentLookupIcon = styled(RiFileList3Fill)`
  margin-right: 0.5rem;
  margin-left: auto;
  font-size: 1.5rem;
`;

const MyMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: calc(100vh - 14rem);
`;
const MyTitle = styled.h2`
  display: none;
`;
const MainBackground = styled.div`
  width: 100%;
  background-color: #9f9f9f;
  padding: 1.5rem 1rem;
`;
const MainSection = styled.section`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem 0.7rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const MyImg = styled.img`
  width: 5rem;
  margin-right: 0.5rem;
  padding-bottom: 0.2rem;
  border-radius: 100%;
`;
const MainInfo = styled.div``;
const MyNickname = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;
const MyEmail = styled.p`
  font-size: 0.8rem;
  margin: 0;
  margin-top: 0.3rem;
`;
const UserDetail = styled.section`
  padding: 1rem;
  padding-top: 0;
`;
const UserDetailTitle = styled.h3`
  margin-bottom: 0.5rem;
`;
const UserDetailItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;
const UserDetailItemTitle = styled.h4`
  margin: 0;
  width: 7rem;
  font-size: 0.9rem;
`;
const UserDetailItemContent = styled.p`
  flex: 1;
  font-size: 0.9rem;
  padding: 0;
  margin: 0;
`;
// 로딩 화면
const LoadingSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 600;
  color: #1e3050;
  background-color: #f1f1f1;
`;
const LoadingTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;
const LoadingText = styled.p`
  font-size: 0.8rem;
`;
