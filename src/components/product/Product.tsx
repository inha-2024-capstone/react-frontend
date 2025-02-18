import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ProductService from '../../services/ProductService';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import { ProductDetailType } from '../../types/productTypes';
import { useUserTypeStore } from '../../store/store';
import PriceOffer from './PriceOffer';
import ProductBuy from './ProductBuy';
import { RecImg } from '../../assets/common';
import styled from 'styled-components';
import { IoLogoWechat } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Product: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductDetailType>({
    id: 0,
    name: 'product name',
    priceByQuantities: [{ quantity: 1, price: 1000 }],
    description: 'product description\nproduct description',
    imageUrl:
      'https://i.pinimg.com/236x/32/71/f1/3271f1c9fba13eeb7bea0275eda72e52.jpg',
    state: '',
    creatorId: 0,
    creatorName: 'seller name',
    dueDate: '',
    soldQuantity: 0,
  });
  const priceFormatter = usePriceFormatter();
  const { id } = useParams<{ id: string }>(); // id를 가져옴
  const name = `Product ${id}`;
  const brand = `Brand ${id}`;
  const userType = useUserTypeStore((state) => state.userType);

  useDocumentTitle(`${name} - ${brand} | Yoger`);

  useEffect(() => {
    ProductService.getProduct(id ? id : '0').then((response) => {
      setProductInfo(response);
    });
  }, [id]);

  return (
    <ProductContainer>
      {/* 제품 상세 설명 */}
      <ProductArticle>
        <ProductTitle>
          {name} - {brand} | Yoger
        </ProductTitle>

        {/* 제품 정보 */}
        <ProductInfo>
          <ProductImg src={productInfo.imageUrl || RecImg} alt="상품 이미지" />
          <BrandWrapper>
            <ProductBrand>{productInfo.creatorName}</ProductBrand>
            <Link to="/chat">
              <IoLogoWechat />
            </Link>
          </BrandWrapper>
          <ProductName>{productInfo.name}</ProductName>
          <ProductPrice>
            {priceFormatter(productInfo.priceByQuantities[0]?.price || 0)} 원
          </ProductPrice>
        </ProductInfo>

        {/* 구분선 역할 */}
        <DivideBox />

        {/* 제품 설명 */}
        <ProductDetail>
          <DetailTitle>상품 상세 설명</DetailTitle>
          <DetailDesc>
            {productInfo.description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </DetailDesc>
        </ProductDetail>
      </ProductArticle>

      {/* 구매하기 버튼 */}
      {userType === 'user' ? <ProductBuy /> : <PriceOffer />}
    </ProductContainer>
  );
};

export default Product;

const ProductContainer = styled.main`
  flex: 1;
`;
const ProductArticle = styled.article``;
const ProductTitle = styled.h1`
  display: none;
`;
// 제품 정보
const ProductInfo = styled.section`
  width: 100%;
`;
const ProductImg = styled.img`
  width: 100%;
  height: 100dvw;
  min-height: 320px;
  max-height: 600px;
`;
const ProductBrand = styled.h2`
  margin: 0;
  padding: 0.7rem 1rem 0.3rem 1rem;
  font-size: 0.9rem;
  color: #8e8982;
  font-weight: 600;
`;
const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #8e8982;

  & > a {
    color: #8e8982;
    margin-left: auto;
    font-size: 2rem;
    margin-right: 1rem;
    margin-top: 0.3rem;
  }
`;
const ProductName = styled.h3`
  margin: 0;
  padding: 0 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;
const ProductPrice = styled.p`
  margin: 1rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;
  font-weight: 700;
`;
// 구분선 역할
const DivideBox = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #f8f8f8;
`;
// 상품 설명
const ProductDetail = styled.section`
  padding: 0 1rem;
  color: #333;
`;
const DetailTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
`;
const DetailDesc = styled.p`
  font-size: 1rem;
  font-weight: 400;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.6;
`;
