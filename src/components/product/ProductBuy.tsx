import styled from 'styled-components';

const ProductBuy: React.FC = () => {
  return (
    <BuySection>
      <BuyTitle>상품 구매</BuyTitle>
      <BuyButton>구매하기</BuyButton>
    </BuySection>
  );
};

export default ProductBuy;

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
