import React, { useState, useRef } from 'react';
import { YogerLogoIcon } from '../../assets/common';
import styled from 'styled-components';

interface ProductRegisterProps {
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  creatorName: string;
}

const ProductRegister: React.FC = () => {
  const productImgInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailImgInputRef = useRef<HTMLInputElement | null>(null);
  const [registerProduct, setRegisterProduct] = useState<ProductRegisterProps>({
    name: '',
    description: '',
    image: '',
    thumbnail: '',
    creatorName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(registerProduct);
  };

  const triggerFileInput = (
    e: React.MouseEvent<HTMLButtonElement>,
    fileInputRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <RegisterMain>
      {/* 상품 등록 타이틀 */}
      <RegisterTitle>
        <TitleLogo src={YogerLogoIcon} alt="Yoger Logo" />
        상품 등록
      </RegisterTitle>
      <RegisterDescription>상품 정보를 입력하세요.</RegisterDescription>

      {/* 상품 등록 폼 */}
      <RegisterForm onSubmit={handleSubmit}>
        {registerInputs.map((input, index) => (
          <RegisterLabel key={index}>
            {input.name}

            {/* 파일 형식일 경우 */}
            {input.type === 'file' && (
              <FileInputWrapper>
                <FileInputButton
                  onClick={(e) =>
                    triggerFileInput(
                      e,
                      input.name === '상품 이미지'
                        ? productImgInputRef
                        : thumbnailImgInputRef,
                    )
                  }
                >
                  업로드
                </FileInputButton>
                <FileInputText>
                  {registerProduct[
                    input.value === 'thumbnail' ? 'thumbnail' : 'image'
                  ] || input.placeholder}
                </FileInputText>
              </FileInputWrapper>
            )}

            {/* 등록 폼 인풋 */}
            <RegisterInput
              ref={
                input.type === 'file'
                  ? input.name === '상품 이미지'
                    ? productImgInputRef
                    : thumbnailImgInputRef
                  : null
              }
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  [input.value]: e.target.value,
                })
              }
            />
          </RegisterLabel>
        ))}

        {/* 제출 버튼 */}
        <RegisterButton type="submit">등록</RegisterButton>
      </RegisterForm>
    </RegisterMain>
  );
};

export default ProductRegister;

const registerInputs = [
  {
    value: 'name',
    name: '상품 이름',
    type: 'text',
    placeholder: '상품 이름을 입력하세요',
  },
  {
    value: 'description',
    name: '상품 설명',
    type: 'text',
    placeholder: '상품 설명을 입력하세요',
  },
  {
    value: 'image',
    name: '상품 이미지',
    type: 'file',
    placeholder: '상품 이미지를 업로드하세요',
  },
  {
    value: 'thumbnail',
    name: '썸네일 이미지',
    type: 'file',
    placeholder: '썸네일 이미지를 업로드하세요',
  },
  {
    value: 'creatorName',
    name: '상품 제작자 이름',
    type: 'text',
    placeholder: '상품 제작자 이름을 입력하세요',
  },
];

const RegisterMain = styled.main`
  flex: 1;
  padding: 0 1rem;
`;
const RegisterTitle = styled.h1`
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  display: flex;
`;
const TitleLogo = styled.img`
  width: 2rem;
  margin-right: 0.6rem;
  padding-bottom: 0.2rem;
`;
const RegisterDescription = styled.p`
  font-size: 0.9rem;
  padding: 0;
  margin: 0;
  margin: 0.5rem 0 1.5rem 0;
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #333;
  padding-bottom: 3rem;
`;
const RegisterLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;
const RegisterInput = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.8rem;

  &:focus {
    outline: 1px solid #8e8982;
  }

  &[type='file'] {
    display: none;
  }
`;
// 파일 인풋 버튼
const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;
const FileInputButton = styled.button`
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;

  &:hover {
    background-color: #333;
  }
`;
const FileInputText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: 0.5rem;
  color: #666;
`;
// 등록하기 버튼
const RegisterButton = styled.button`
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 1rem;
  margin-left: -1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background-color: #8e8982;
  border: none;
`;
