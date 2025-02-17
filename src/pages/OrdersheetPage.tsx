import { Footer, Header } from '../components/common';
import Ordersheet from '../components/ordersheet/Ordersheet';
import useDocumentTitle from '../hooks/useDocumentTitle';

const OrdersheetPage: React.FC = () => {
  useDocumentTitle('주문서 | Yoger');

  return (
    <>
      <Header />
      <Ordersheet />
      <Footer />
    </>
  );
};

export default OrdersheetPage;
