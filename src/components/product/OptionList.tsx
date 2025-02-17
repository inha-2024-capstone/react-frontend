import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface OptionListProps {
  optionName: string;
  options: Option[];
  selectedOptions: Option[];
  onChange: (value: string) => void;
}

const OptionList: React.FC<OptionListProps> = ({
  optionName,
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <OptionListWrapper>
      <OptionOpenBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{optionName}</span>
        {isOpen ? (
          <IoIosArrowUp style={{ marginLeft: 'auto' }} />
        ) : (
          <IoIosArrowDown style={{ marginLeft: 'auto' }} />
        )}
      </OptionOpenBtn>

      {isOpen &&
        options.map((option) => {
          const isSelected = selectedOptions.some(
            (selectedOption) => selectedOption.value === option.value,
          );
          return (
            <OptionItem
              key={option.value}
              isSelected={isSelected}
              onClick={() => handleOnClick(option.value)}
            >
              {option.value}
            </OptionItem>
          );
        })}
    </OptionListWrapper>
  );
};

export default OptionList;

const OptionListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;
const OptionOpenBtn = styled.button<{ isOpen: boolean }>`
  display: flex;
  width: 100%;
  padding: 0.5rem 0.7rem 0.4rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #8e898250;
  border-radius: ${(props) => (props.isOpen ? '6px 6px 0 0' : '6px')};
  background-color: #fff;
  color: #585147;
  text-align: left;
  align-items: center;
`;
const OptionItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  padding: 0.5rem 0.7rem;
  background-color: ${(props) => (props.isSelected ? '#8e8982' : '#fff')};
  color: ${(props) => (props.isSelected ? '#fff' : '#8e8982')};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  border-left: 1px solid #8e898250;
  border-right: 1px solid #8e898250;

  &:last-child {
    border-radius: 0 0 6px 6px;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid #8e898250;
  }
`;
