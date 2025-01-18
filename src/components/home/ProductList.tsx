import React, { useEffect, useState } from 'react';
import { DivideThreeIcon, DivideTwoIcon } from '../../assets/home';
import { Link } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import { ProductListType } from '../../types/productTypes';
import styled from 'styled-components';

const ProductList: React.FC = () => {
  const [divideCount, setDivideCount] = useState<number>(2);
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const priceFormatter = usePriceFormatter();

  useEffect(() => {
    ProductService.getProducts().then((response) => {
      setProductList(response);
    });
  }, []);

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
            <Link to={`/product/${product.id}`}>
              <ProductArticle>
                <ProductImg src={product.thumbnailImageUrl} alt="상품 이미지" />
                <ProductDetail>
                  <ProductBrand>{product.creatorName}</ProductBrand>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>
                    {priceFormatter(product.priceByQuantities[0].price)} 원
                  </ProductPrice>
                </ProductDetail>
              </ProductArticle>
            </Link>
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

  a {
    text-decoration: none;
  }
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
