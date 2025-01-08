import { Footer, Header } from '../components/common';
import ProductRegister from '../components/productRegister/ProductRegister';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ProductRegisterPage: React.FC = () => {
  useDocumentTitle('상품 등록 | Yoger');

  return (
    <>
      <Header />
      <ProductRegister />
      <Footer />
    </>
  );
};

export default ProductRegisterPage;
