import { useLocation } from 'react-router-dom';
import { ShirtProductImg, TeaProductImg } from '../../assets/home';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import styled from 'styled-components';

const Ordersheet: React.FC = () => {
  const location = useLocation();
  const fromList = location.state?.fromList;

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const priceFormatter = usePriceFormatter();

  return (
    <Container>
      <OrdersheetArticle>
        <HiddenTitle>주문 내역</HiddenTitle>

        <OrdersheetSection>
          <SectionTitle>배송지</SectionTitle>
          {Object.entries(addressInfo).map(([key, value]) => (
            <>
              <HiddenText>{keyLabels[key] || key}</HiddenText>
              <OrdersheetText>
                {key === 'name' ? (
                  <OrdersheetStrong>{value}</OrdersheetStrong>
                ) : (
                  value
                )}
              </OrdersheetText>
            </>
          ))}
        </OrdersheetSection>

        <OrdersheetSection>
          <SectionTitle>주문 상품</SectionTitle>
          <OrderList>
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
          </OrderList>
        </OrdersheetSection>

        <OrdersheetSection>
          <SectionTitle>결제 금액</SectionTitle>
          {Object.entries(paymentAmount).map(([key, value]) => (
            <PaymentText>
              {key === 'total' ? (
                <>
                  <PaymentStrong>{keyLabels[key] || key}</PaymentStrong>
                  <PaymentStrong>{formatNumber(value)}원</PaymentStrong>
                </>
              ) : (
                <>
                  <PaymentSpan>{keyLabels[key] || key}</PaymentSpan>
                  <PaymentSpan>{formatNumber(value)}원</PaymentSpan>
                </>
              )}
            </PaymentText>
          ))}
        </OrdersheetSection>
      </OrdersheetArticle>

      {fromList !== true && (
        <PaymentButton>
          {formatNumber(paymentAmount.total)}원 결제하기
        </PaymentButton>
      )}
    </Container>
  );
};

export default Ordersheet;

const Container = styled.main`
  flex: 1;
`;
const OrdersheetArticle = styled.article``;
const SectionTitle = styled.h3`
  margin: 0 -0.7rem;
  padding: 0.3rem 0.7rem 0.2rem 0.7rem;
  margin-bottom: 0.7rem;
  color: #fff;
  background-color: #605043;
  font-size: 1rem;
`;
const OrdersheetSection = styled.section`
  padding: 1rem 1.7rem;
  margin: 0;
  color: #333;
  line-height: 1.5;

  &:first-of-type {
    padding-top: 0;
  }
`;
const OrdersheetText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;

  &:last-of-type {
    margin-top: 0.5rem;
  }
`;
const OrdersheetStrong = styled.strong`
  font-size: 1rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 0.3rem;
`;
const HiddenTitle = styled.h2`
  display: none;
`;
const HiddenText = styled.span`
  display: none;
`;
// 주문 상품 정보
const OrderList = styled.ul`
  padding: 0;
  margin: 0;
`;
const OrderItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;
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

// 결제 금액
const PaymentText = styled.p`
  margin: 0;
  padding: 0;
  padding-bottom: 0.2rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
`;
const PaymentStrong = styled.strong`
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0.5rem;
`;
const PaymentSpan = styled.span``;

// 결제하기 버튼
const PaymentButton = styled.button`
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
`;
const keyLabels: Record<string, string> = {
  name: '이름',
  phone: '전화번호',
  address: '주소',
  request: '배송 요청사항',
  subtotal: '상품 금액',
  shipping: '배송비',
  total: '총 결제 금액',
};

const addressInfo = {
  name: '홍길동',
  address: '서울시 강남구 테헤란로 123 10층 1001호',
  phone: '010-1234-5678',
  request: '부재시 경비실에 맡겨주세요.',
};
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
];
const paymentAmount = {
  subtotal: 40000,
  shipping: 3000,
  total: 43000,
};
