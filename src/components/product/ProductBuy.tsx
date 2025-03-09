import { useEffect, useState } from 'react';
import ModalComponent from '../common/ModalComponent';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import styled from 'styled-components';
import OptionList from './OptionList';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaX } from 'react-icons/fa6';
import { ProductDetailType } from '../../types/productTypes';

interface Item {
  quantity: number;
  price: number;
  option: string | null;
}

const ProductBuy: React.FC<{ productInfo: ProductDetailType }> = ({
  productInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const priceFormatter = usePriceFormatter();
  const navigate = useNavigate();
  const [productOptions, setProductOptions] = useState({
    option: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<Item[]>([]);

  useEffect(() => {
    if (productOptions.option) {
      setSelectedOptions([
        ...selectedOptions,
        {
          quantity: 1,
          price: productInfo.priceByQuantities[0].price,
          option: productOptions.option,
        },
      ]);

      setProductOptions({ option: '' });
    }
  }, [productOptions]);

  const handleRemoveItem = (index: number) => {
    const newSelectedOptions = selectedOptions.filter(
      (_, itemIndex) => itemIndex !== index,
    );
    setSelectedOptions(newSelectedOptions);
  };

  const handleItemQuantity = (quantity: number, index: number) => {
    if (quantity < 1) {
      return;
    }
    const newSelectedOptions = selectedOptions.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          quantity,
        };
      }
      return item;
    });
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <>
      {/* 구매하기 버튼 */}
      {isOpen === false && (
        <BuySection>
          <BuyTitle>구매</BuyTitle>
          <BuyButton onClick={() => setIsOpen(true)}>구매하기</BuyButton>
        </BuySection>
      )}

      {/* 입력 모달 */}
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contentLabel="구매입력"
        modalType="bottom"
      >
        <BuyInputSection>
          {/* 구매 입력 섹션 */}
          <BuyInputTitle>구매 입력 섹션</BuyInputTitle>
          <BuyFieldset>
            <BuyLegend>구매 정보 입력</BuyLegend>

            <OptionList
              optionName={
                productOptions.option == '' ? '옵션' : productOptions.option
              }
              options={generalOptions}
              selectedOptions={[]}
              onChange={(value) => {
                setProductOptions({ ...productOptions, option: value });
              }}
            />
          </BuyFieldset>

          {/* 구매 입력 리스트 */}
          <BuyList>
            {selectedOptions.map((item, index) => (
              <BuyItem key={index}>
                <BuyInfo>
                  <BuyInfoText>{item.option}</BuyInfoText>
                  <BuyRemoveBtn onClick={() => handleRemoveItem(index)}>
                    <FaX />
                  </BuyRemoveBtn>
                </BuyInfo>

                <BuyBottom>
                  <BuyInfoBtn
                    onClick={() => handleItemQuantity(item.quantity - 1, index)}
                  >
                    <FaMinus />
                  </BuyInfoBtn>
                  <BuyQuantity>{item.quantity}</BuyQuantity>

                  <BuyInfoBtn
                    onClick={() => handleItemQuantity(item.quantity + 1, index)}
                  >
                    <FaPlus />
                  </BuyInfoBtn>
                  <BuyItemDivider>
                    <BuyPrice>
                      {priceFormatter(item.price * item.quantity)}원
                    </BuyPrice>
                  </BuyItemDivider>
                </BuyBottom>
              </BuyItem>
            ))}
          </BuyList>

          {/* 구매하기 버튼 */}
          <BuyBtns>
            <BuyBtn
              $type="submit"
              onClick={() =>
                navigate('/ordersheet', {
                  state: { productInfo, selectedOptions },
                })
              }
            >
              구매하기
            </BuyBtn>
          </BuyBtns>
        </BuyInputSection>
      </ModalComponent>
    </>
  );
};

export default ProductBuy;

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
// 구매 리스트
const BuyList = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  max-height: 40vh;
  overflow-y: auto;
`;
const BuyItem = styled.li`
  // display: flex;
  color: #585147;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
const BuyQuantity = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #585147;
  width: 2.5rem;
  text-align: center;
`;
const BuyItemDivider = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
const BuyPrice = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #585147;
`;
const BuyRemoveBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  color: #8e8982;
  padding: 0;
  margin: 0 0 0 0.8rem;
  margin-left: auto;
`;
const BuyInfo = styled.div`
  display: flex;
  width: 100%;
`;
const BuyInfoText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #585147;
`;
const BuyBottom = styled.div`
  display: flex;
  // align-items: center;
  margin-top: 0.7rem;
  align-items: center;
`;
const BuyInfoBtn = styled.button`
  background-color: #585147;
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.9rem;
  color: #fff;
  padding: 0.3rem;
  border-radius: 6px;
`;
// 구매 입력 섹션
const BuyInputSection = styled.section`
  padding: 1rem;
  background-color: #f7f5f2;
`;
const BuyInputTitle = styled.h2`
  display: none;
`;
const BuyFieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;
const BuyLegend = styled.legend`
  display: none;
`;
// 구매 추가 및 제출 버튼
const BuyBtns = styled.div`
  display: flex;
  justify-content: space-between;
`;
interface BuyBtnProps {
  $type: string;
}
const BuyBtn = styled.button<BuyBtnProps>`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => (props.$type === 'add' ? '#8e8982' : '#fff')};
  background-color: ${(props) => (props.$type === 'add' ? '#fff' : '#8e8982')};
  border: none;
  box-shadow: inset 0 0 0 1px #8e8982;
  border-radius: 6px;
`;

const colorOptions = [
  { value: 'Pink', label: 'Pink' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' },
];
const sizeOptions = [
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
];

const generalOptions = [{ value: '일반', label: 'general' }];
