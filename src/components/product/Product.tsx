import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { TeaProductImg } from '../../assets/home';
import styled from 'styled-components';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id를 가져옴
  const name = `Product ${id}`;
  const brand = `Brand ${id}`;

  useDocumentTitle(`${name} - ${brand} | Yoger`);

  return (
    <ProductContainer>
      {/* 제품 상세 설명 */}
      <ProductArticle>
        <ProductTitle>
          {name} - {brand} | Yoger
        </ProductTitle>

        {/* 제품 정보 */}
        <ProductInfo>
          <ProductImg src={productInfo.img} alt="상품 이미지" />
          <ProductBrand>{productInfo.brand}</ProductBrand>
          <ProductName>{productInfo.name}</ProductName>
          <ProductPrice>{productInfo.price}</ProductPrice>
        </ProductInfo>

        {/* 구분선 역할 */}
        <DivideBox />

        {/* 제품 설명 */}
        <ProductDetail>
          <DetailTitle>상품 상세 설명</DetailTitle>
          <DetailDesc>
            {productInfo.detail.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </DetailDesc>
        </ProductDetail>
      </ProductArticle>

      {/* 구매하기 버튼 */}
      <BuySection>
        <BuyTitle>상품 구매</BuyTitle>
        <BuyButton>구매하기</BuyButton>
      </BuySection>
    </ProductContainer>
  );
};

export default Product;

const productInfo = {
  id: '1',
  name: '스페셜 찻잔',
  brand: '차마시기',
  price: '가격 미정',
  img: TeaProductImg,
  detail:
    '특수 소재 찻잔으로 보온성을 강화시켰습니다.\n차를 마실 때 더욱 특별한 시간을 보내세요. \n\n찻잔 사이즈: 100ml\n찻잔 소재: 특수 소재\n찻잔 색상: 블랙, 화이트\n찻잔 무게: 100g\n찻잔 크기: 10cm x 10cm x 5cm',
};

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
// 구매하기 버튼
const BuySection = styled.section`
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  position: fixed;
  bottom: 0;
`;
const BuyTitle = styled.h2`
  display: none;
`;
const BuyButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background-color: #8e8982;
  border: none;
`;
