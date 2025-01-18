import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

interface FormData {
  email: string;
  name: string;
  nickName: string;
  password: string;
  phoneNumber: string;
  zipcode: string;
  address: string;
  detailAddress: string;
  briefDescription: string;
  detailDescription: string;
}

interface ZipCodeSearchProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({
  setFormData,
  formData,
  setModalOpen,
}) => {
  return (
    <>
      <ZipCodeSection>
        <ZipCodeTitle>우편번호 검색</ZipCodeTitle>
      </ZipCodeSection>
      <DaumPostcode
        onComplete={(data) => {
          setFormData({
            ...formData,
            zipcode: data.zonecode || '',
            address: data.address,
          });
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default ZipCodeSearch;

const ZipCodeSection = styled.section``;
const ZipCodeTitle = styled.h3`
  padding-top: 0.2rem;
`;
