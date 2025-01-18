import styled from 'styled-components';

interface InputItemProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputItem: React.FC<InputItemProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <SignUpLabel>
      {label}
      <SignUpInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </SignUpLabel>
  );
};

export default InputItem;

const SignUpLabel = styled.label`
  display: block;
  width: 100%;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;
const SignUpInput = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #858b95;
  border-radius: 0.5rem;
  font-size: 0.8rem;

  &:focus-visible {
    outline: 1px solid #1e3050;
  }
`;
