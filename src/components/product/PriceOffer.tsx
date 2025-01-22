import { useState } from 'react';
import ModalComponent from '../common/ModalComponent';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import { FiDelete } from 'react-icons/fi';
import styled from 'styled-components';

interface Item {
  quantity: number;
  price: number;
}

const PriceOffer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const priceFormatter = usePriceFormatter();

  const handleAddItem = () => {
    if (quantity > 0 && price) {
      const newItem = {
        quantity,
        price,
      };
      setItems([...items, newItem]);
      setQuantity(0);
      setPrice(0);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <>
      {/* 가격제안 버튼 */}
      {isOpen === false && (
        <OfferSection>
          <OfferTitle>가격제안</OfferTitle>
          <OfferButton onClick={() => setIsOpen(true)}>
            가격제안 하기
          </OfferButton>
        </OfferSection>
      )}

      {/* 입력 모달 */}
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contentLabel="가격제안"
        modalType="bottom"
      >
        <OfferInputSection>
          {/* 가격제안 입력 리스트 */}
          <OfferList>
            {items.map((item, index) => (
              <OfferItem key={index}>
                <OfferQuantity>
                  {priceFormatter(item.quantity)} 개
                </OfferQuantity>
                <OfferItemDivider>
                  <OfferPrice>{priceFormatter(item.price)} 원</OfferPrice>
                  <OfferRemoveBtn onClick={() => handleRemoveItem(index)}>
                    <FiDelete />
                  </OfferRemoveBtn>
                </OfferItemDivider>
              </OfferItem>
            ))}
          </OfferList>

          {/* 가격제안 입력 섹션 */}
          <OfferInputTitle>가격제안 입력 섹션</OfferInputTitle>
          <OfferFieldset>
            <OfferLegend>상품 정보 입력</OfferLegend>
            <OfferLabel>
              개수
              <OfferInput
                type="number"
                name="quantity"
                value={quantity || ''}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </OfferLabel>
            <OfferLabel>
              가격
              <OfferInput
                type="number"
                name="price"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </OfferLabel>
          </OfferFieldset>

          {/* 가격제안 제출 버튼 */}
          <OfferBtns>
            <OfferBtn onClick={handleAddItem} $type="add">
              추가하기
            </OfferBtn>
            <OfferBtn $type="submit">제안하기</OfferBtn>
          </OfferBtns>
        </OfferInputSection>
      </ModalComponent>
    </>
  );
};

export default PriceOffer;

const OfferSection = styled.section`
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  position: fixed;
  bottom: 0;
`;
const OfferTitle = styled.h2`
  display: none;
`;
const OfferButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background-color: #8e8982;
  border: none;
`;
// 가격제안 리스트
const OfferList = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  max-height: 10rem;
  overflow-y: auto;
`;
const OfferItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
const OfferQuantity = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #585147;
`;
const OfferItemDivider = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
const OfferPrice = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #585147;
`;
const OfferRemoveBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  height: 1.5rem;
  color: #8e8982;
  padding: 0;
  margin: 0 0 0 0.8rem;
`;
// 가격제안 입력 섹션
const OfferInputSection = styled.section`
  padding: 1.2rem 1rem 1rem 1rem;
  background-color: #f7f5f2;
`;
const OfferInputTitle = styled.h2`
  display: none;
`;
const OfferFieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;
const OfferLegend = styled.legend`
  display: none;
`;
const OfferLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  color: #585147;
  margin-left: 0.5rem;
  margin-bottom: 0.7rem;
`;
const OfferInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #585147;
  background-color: #fff;
  border: 1px solid #8e8982;
  border-radius: 6px;
  margin-left: 0.8rem;
  &:focus {
    outline-color: #585147;
    outline: solid 1px;
  }
`;
// 가격제안 추가 및 제출 버튼
const OfferBtns = styled.div`
  display: flex;
  justify-content: space-between;
`;
interface OfferBtnProps {
  $type: string;
}
const OfferBtn = styled.button<OfferBtnProps>`
  width: 48%;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => (props.$type === 'add' ? '#8e8982' : '#fff')};
  background-color: ${(props) => (props.$type === 'add' ? '#fff' : '#8e8982')};
  border: none;
  box-shadow: inset 0 0 0 1px #8e8982;
  border-radius: 6px;
`;
