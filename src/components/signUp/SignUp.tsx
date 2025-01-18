import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputItem from '../common/InputItem';
import styled from 'styled-components';
import { YogerLogoIcon } from '../../assets/common';
import UserService from '../../services/UserService';

interface SignUpFormData {
  email: string;
  name: string;
  nickName: string;
  password: string;
  phoneNumber: string;
  zipcode: string;
  address: string;
  detailAddress: string;
  briefDescription: string;
  detailDescription: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>('user');
  const [gender, setGender] = useState<string | null>('남자');
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    name: '',
    nickName: '',
    password: '',
    phoneNumber: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    briefDescription: '',
    detailDescription: '',
  });

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const getSignUpData = (): FormData => {
    const signUpFormData = new FormData();

    if (userType === 'user') {
      // user
      signUpFormData.append('email', formData.email ? formData.email : '');
      signUpFormData.append('username', formData.name);
      signUpFormData.append('password', formData.password);
      signUpFormData.append('role', 'USER');
      signUpFormData.append('gender', gender === '남자' ? 'MALE' : 'FEMALE');
      signUpFormData.append('phoneNumber', formData.phoneNumber);
      signUpFormData.append(
        'address',
        formData.zipcode + formData.address + formData.detailAddress,
      );
      signUpFormData.append('nickName', formData.nickName);
      signUpFormData.append('loginSource', 'THIS');
    } else {
      // company
      signUpFormData.append('companyName', formData.name);
      signUpFormData.append('email', formData.email);
      signUpFormData.append('password', formData.password);
      signUpFormData.append('phoneNumber', formData.phoneNumber);
      signUpFormData.append(
        'address',
        formData.zipcode +
          ' ' +
          formData.address +
          ' ' +
          formData.detailAddress,
      );
      signUpFormData.append('shortDescription', formData.briefDescription);
      signUpFormData.append('description', formData.detailDescription);
    }

    return signUpFormData;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = getSignUpData();
    console.log('sign up');

    // 닉네임 중복 확인
    UserService.checkNickname(formData.nickName)
      .then((response) => {
        console.log('닉네임 : ', response);
        if (response.isSucceeded) {
          alert('이미 존재하는 닉네임입니다.');
          return;
        }

        // 이메일 중복 확인
        UserService.checkNickname(formData.nickName)
          .then((response) => {
            console.log('이메일 : ', response);
            if (response.isSucceeded) {
              alert('이미 존재하는 닉네임입니다.');
              return;
            }

            console.log('회원가입 데이터 : ', data);
            console.log({ ...data });

            // 회원가입
            UserService.signUp(data)
              .then((response) => {
                console.log(response);
                if (response.isSucceeded) {
                  navigate('/login');
                } else {
                  alert(response.message);
                }
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      {/* 회원가입 페이지 타이틀 */}
      <Title>
        <Logo src={YogerLogoIcon} alt="Yoger" />
        회원가입
      </Title>

      {/* 사용자 유형 선택 */}
      <UserType>
        <UserTypeTitle>사용자 유형 선택</UserTypeTitle>
        <UserTypeButton
          $active={userType === 'user' ? 'true' : 'false'}
          onClick={() => setUserType('user')}
        >
          회원 로그인
        </UserTypeButton>
        <UserTypeButton
          $active={userType === 'company' ? 'true' : 'false'}
          onClick={() => setUserType('company')}
        >
          기업 로그인
        </UserTypeButton>
      </UserType>

      {/* 회원가입 폼 */}
      <SignUpForm onSubmit={handleSubmit}>
        {inputFields.map((inputField) => {
          if (
            inputField.fieldType === 'all' ||
            inputField.fieldType === userType
          ) {
            return inputField.label === '성별' ? (
              <SignUpLabel key={inputField.label}>
                {inputField.label}
                <RadioWrapper>
                  {genderOptions.map((option) => (
                    <RadioLabel key={option}>
                      <RadioInput
                        type="radio"
                        value={option}
                        checked={gender === option}
                        onChange={handleGenderChange}
                      />
                      <CustomRadio
                        $checked={gender === option ? 'true' : 'false'}
                      >
                        {option}
                      </CustomRadio>
                    </RadioLabel>
                  ))}
                </RadioWrapper>
              </SignUpLabel>
            ) : inputField.label === '상세 회사 소개' ? (
              <SignUpLabel key={inputField.label}>
                {inputField.label}
                <CustomTextArea
                  value={formData[inputField.name as keyof SignUpFormData]}
                  placeholder={inputField.placeholder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [inputField.name]: e.target.value,
                    })
                  }
                />
              </SignUpLabel>
            ) : inputField.label === '우편번호' ? (
              <ZipcodeContainer key={inputField.label}>
                <InputItem
                  key={inputField.label}
                  label={inputField.label}
                  type={inputField.type}
                  placeholder={inputField.placeholder}
                  value={formData[inputField.name as keyof SignUpFormData]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [inputField.name]: e.target.value,
                    })
                  }
                />
                <ZipcodeSearchButton>우편번호 검색</ZipcodeSearchButton>
              </ZipcodeContainer>
            ) : (
              <InputItem
                key={inputField.label}
                label={inputField.label}
                type={inputField.type}
                placeholder={inputField.placeholder}
                value={formData[inputField.name as keyof SignUpFormData]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [inputField.name]: e.target.value,
                  })
                }
              />
            );
          }
        })}
        <SignUpButton type="submit">회원가입</SignUpButton>
      </SignUpForm>
    </Container>
  );
};

export default SignUp;

const genderOptions = ['남자', '여자'];
const inputFields = [
  {
    fieldType: 'company',
    label: '회사명',
    type: 'text',
    name: 'name',
    placeholder: '회사명을 입력해주세요',
  },
  {
    fieldType: 'all',
    label: '이메일',
    type: 'email',
    name: 'email',
    placeholder: '이메일을 입력해주세요',
  },
  {
    fieldType: 'user',
    label: '이름',
    type: 'text',
    name: 'name',
    placeholder: '이름을 입력해주세요',
  },
  {
    fieldType: 'user',
    label: '닉네임',
    type: 'text',
    name: 'nickName',
    placeholder: '닉네임을 입력해주세요',
  },
  {
    fieldType: 'all',
    label: '비밀번호',
    type: 'password',
    name: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
  {
    fieldType: 'user',
    label: '성별',
    type: 'radio',
    name: 'gender',
    placeholder: '성별을 선택해주세요',
  },
  {
    fieldType: 'all',
    label: '전화번호',
    type: 'tel',
    name: 'phoneNumber',
    placeholder: '전화번호를 입력해주세요',
  },
  {
    fieldType: 'all',
    label: '우편번호',
    type: 'text',
    name: 'zipcode',
    placeholder: '우편번호를 입력해주세요',
  },
  {
    fieldType: 'all',
    label: '주소',
    type: 'text',
    name: 'address',
    placeholder: '주소를 입력해주세요',
  },
  {
    fieldType: 'all',
    label: '상세 주소',
    type: 'text',
    name: 'detailAddress',
    placeholder: '상세 주소를 입력해주세요',
  },
  {
    fieldType: 'company',
    label: '회사 소개',
    type: 'text',
    name: 'briefDescription',
    placeholder: '회사 소개를 입력해주세요',
  },
  {
    fieldType: 'company',
    label: '상세 회사 소개',
    type: 'textarea',
    name: 'detailDescription',
    placeholder: '상세 회사 소개를 입력해주세요',
  },
];

interface ButtonProps {
  $active: string;
}

interface RadioButtonProps {
  $checked: string;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: calc(100% - 3rem);
  flex: 1;
  margin-bottom: 3rem;
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #1e3050;
  margin: 0 0 0.5rem 0;
`;
const Logo = styled.img`
  width: 2rem;
  margin-right: 0.6rem;
  padding-bottom: 0.2rem;
`;

// 사용자 유형 선택
const UserType = styled.section`
  width: 100%;
`;
const UserTypeTitle = styled.h2`
  display: none;
`;
const UserTypeButton = styled.button<ButtonProps>`
  width: 50%;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.$active === 'true' ? '#1E3050' : '#1E305025')};
  padding: 0.6rem 0;
  border-bottom: ${(props) =>
    props.$active === 'true' ? '2px solid #1E3050' : '2px solid #1E305025'};
`;

// 회원가입 폼
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const SignUpLabel = styled.label`
  display: block;
  width: 100%;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;
const SignUpButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.8rem 0;
  background-color: #1e3050;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 0.2rem;
`;
const CustomTextArea = styled.textarea`
  display: block;
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #858b95;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  resize: none;
  height: 5rem;

  &:focus-visible {
    outline: 1px solid #1e3050;
  }
`;
const RadioLabel = styled.label`
  display: block;
  width: 100%;
  font-size: 0.8rem;
  font-weight: 500;
`;
const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
`;
const RadioInput = styled.input`
  display: none;
`;
const CustomRadio = styled.span<RadioButtonProps>`
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: none;
  box-shadow: ${(props) =>
    props.$checked === 'true' ? 'inset 0 0 0 2px #536878' : 'none'};
  color: ${(props) => (props.$checked === 'true' ? '#536878' : '#fff')};
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.$checked === 'true' ? '#fff' : '#9F9F9F50'};
  text-align: center;
`;

// 우편 번호
const ZipcodeContainer = styled.div`
  display: flex;
  width: 100%;
  place-items: flex-end;
`;
const ZipcodeSearchButton = styled.button`
  display: block;
  width: 8rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid #536878;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  background-color: #536878;
  color: white;
  font-weight: 500;
  height: 100%;
  margin-left: 0.4rem;
`;
