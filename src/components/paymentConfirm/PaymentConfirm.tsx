import { Link } from 'react-router-dom';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import { ShirtProductImg, TeaProductImg } from '../../assets/home';
import { FaRegCircleCheck } from 'react-icons/fa6';
import styled, { keyframes } from 'styled-components';

const PaymentConfirmPage: React.FC = () => {
  const priceFormatter = usePriceFormatter();

  return (
    <ConfirmArticle>
      <GradientIcon />
      <ConfirmH1>결제 승인 완료</ConfirmH1>
      <ConfirmP>결제가 승인되었습니다.</ConfirmP>

      <ConfirmList>
        {orderedProduct.map((product) => (
          <OrderItem key={product.id}>
            <ItemImg src={product.img} alt="상품 이미지" />
            <ItemInfoWrapper>
              <ItemBrand>{product.brand}</ItemBrand>
              <ItemName>{product.name}</ItemName>
              <ItemCount>기본 / {product.quantity}개</ItemCount>
              <ItemPrice>{priceFormatter(product.price)}원</ItemPrice>
            </ItemInfoWrapper>
          </OrderItem>
        ))}
      </ConfirmList>

      <ConfirmLink to="/">홈으로 돌아가기</ConfirmLink>
    </ConfirmArticle>
  );
};

export default PaymentConfirmPage;

const ConfirmArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding-bottom: 4rem;
`;
const ConfirmH1 = styled.h1`
  margin: 1rem 0 0.5rem;
`;
const ConfirmP = styled.p`
  margin-top: 1rem;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
`;
const ConfirmList = styled.ul`
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 30rem;
  max-width: 80vw;
  max-height: 30vh;
  overflow-y: auto;
  list-style: none;
  border-radius: 12px;
  padding: 1rem;
`;
const OrderItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
const ItemInfoWrapper = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0 0 0;
  cursor: default;
`;
const ItemImg = styled.img`
  width: 7rem;
  height: 7rem;
  margin-right: 1rem;
`;
const ItemBrand = styled.strong`
  font-size: 0.9rem;
  color: #333;
  margin: 0 0 0.2rem 0;
`;
const ItemName = styled.p`
  margin: 0 0 0.2rem 0;
  font-size: 0.9rem;
  color: #333;
`;
const ItemCount = styled.p`
  margin: 0 0 0.2rem 0;
  font-size: 0.9rem;
  color: #333;
`;
const ItemPrice = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #333;
  margin-top: auto;
`;

const ConfirmLink = styled(Link)`
  text-align: center;
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  position: fixed;
  bottom: 0;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background-color: #8e8982;
  border: none;
  text-decoration: none;
`;

// 그라데이션 애니메이션 정의
const gradientAnimation = keyframes`
  0% { color: #ff6b6b; }
  25% { color: #feca57; }
  50% { color: #1dd1a1; }
  75% { color: #54a0ff; }
  100% { color: #ff6b6b; }
`;

// 아이콘 스타일 정의
const GradientIcon = styled(FaRegCircleCheck)`
  font-size: 5rem;
  animation: ${gradientAnimation} 3s infinite linear;
`;

const orderedProduct = [
  {
    id: 1,
    brand: '브랜드 1',
    name: '상품 1',
    price: 10000,
    quantity: 2,
    img: TeaProductImg,
  },
  {
    id: 2,
    brand: '브랜드 2',
    name: '상품 2',
    price: 20000,
    quantity: 1,
    img: ShirtProductImg,
  },
  {
    id: 3,
    brand: '브랜드 3',
    name: '상품 3',
    price: 30000,
    quantity: 3,
    img: TeaProductImg,
  },
  {
    id: 4,
    brand: '브랜드 4',
    name: '상품 4',
    price: 40000,
    quantity: 4,
    img: ShirtProductImg,
  },
  {
    id: 5,
    brand: '브랜드 5',
    name: '상품 5',
    price: 50000,
    quantity: 5,
    img: TeaProductImg,
  },
  {
    id: 6,
    brand: '브랜드 6',
    name: '상품 6',
    price: 60000,
    quantity: 6,
    img: ShirtProductImg,
  },
];
