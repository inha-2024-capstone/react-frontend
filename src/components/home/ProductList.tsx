import React, { useState } from 'react';
import styled from 'styled-components';
import {
  DivideThreeIcon,
  DivideTwoIcon,
  LifeProductImg,
  ShirtProductImg,
  ShowerProductImg,
  TeaProductImg,
} from '../../assets/home';

const ProductList: React.FC = () => {
  const [divideCount, setDivideCount] = useState<number>(2);

  return (
    <Container>
      {/* 상품 리스트 옵션 */}
      <OptionBtns>
        <OptionBtn>전체 상품</OptionBtn>
        <DivideBtn onClick={() => setDivideCount(divideCount === 2 ? 3 : 2)}>
          {divideCount === 2 ? (
            <DivideIcon src={DivideThreeIcon} alt="3개씩 보기" />
          ) : (
            <DivideIcon src={DivideTwoIcon} alt="2개씩 보기" />
          )}
        </DivideBtn>
      </OptionBtns>

      {/* 상품 리스트 */}
      <ProductUl $divide={divideCount}>
        {productList.map((product) => (
          <ProductLi key={product.id}>
            <ProductArticle>
              <ProductImg src={product.img} alt="상품 이미지" />
              <ProductDetail>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
              </ProductDetail>
            </ProductArticle>
          </ProductLi>
        ))}
      </ProductUl>
    </Container>
  );
};

export default ProductList;

interface ProductUlProps {
  $divide: number;
}

const Container = styled.section`
  width: calc(100% - 2rem);
`;
const OptionBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0.5rem 0;
`;
const OptionBtn = styled.button`
  border: none;
  background-color: #444;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 5px;
`;
const DivideBtn = styled.button`
  height: 1.6rem;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
`;
const DivideIcon = styled.img`
  height: 100%;
  width: auto;
`;
// 상품 리스트
const ProductUl = styled.ul<ProductUlProps>`
  display: grid;
  grid-template-columns: ${({ $divide }) =>
    $divide === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  list-style-type: none;
  padding: 0;
  gap: 0.5rem;
`;
const ProductLi = styled.li`
  border-radius: 5px;
`;
const ProductArticle = styled.article`
  //   height: 17rem;
  height: fit-content;
`;
const ProductImg = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const ProductBrand = styled.p`
  font-size: 0.7rem;
  font-weight: 900;
  margin: 0.1rem 0;
  color: #8e8982;
`;
const ProductName = styled.h3`
  color: #333;
  font-size: 0.9rem;
  font-weight: normal;
  margin: 0;
  white-space: normal;

  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;
const ProductPrice = styled.p`
  color: #333;
  font-size: 0.9rem;
  font-weight: 800;
  margin: 0.5rem 0 0 0;
`;
const ProductDetail = styled.div`
  padding: 0 0.2rem;
  height: 6rem;
`;

const productList = [
  {
    id: 1,
    brand: '차마시기',
    name: '스페셜 찻잔',
    price: '가격 미정',
    img: TeaProductImg,
  },
  {
    id: 2,
    brand: '셀프산타',
    name: '라이프 셀프 패키지 (오리지널 프리미엄 라인)',
    price: '가격 미정',
    img: LifeProductImg,
  },
  {
    id: 3,
    brand: '휴먼워셔',
    name: '목욕 패키지',
    price: '가격 미정',
    img: ShowerProductImg,
  },
  {
    id: 4,
    brand: '김기정',
    name: '괴물쥐 티셔츠 3종 세트',
    price: '가격 미정',
    img: ShirtProductImg,
  },
  {
    id: 5,
    brand: '차마시기',
    name: '스페셜 찻잔',
    price: '가격 미정',
    img: TeaProductImg,
  },
  {
    id: 6,
    brand: '셀프산타',
    name: '라이프 셀프 패키지',
    price: '가격 미정',
    img: LifeProductImg,
  },
  {
    id: 7,
    brand: '휴먼워셔',
    name: '목욕 패키지',
    price: '가격 미정',
    img: ShowerProductImg,
  },
  {
    id: 8,
    brand: '김기정',
    name: '괴물쥐 티셔츠 3종 세트',
    price: '가격 미정',
    img: ShirtProductImg,
  },
  {
    id: 9,
    brand: '차마시기',
    name: '스페셜 찻잔',
    price: '가격 미정',
    img: TeaProductImg,
  },
];
