import { Header } from '../components/common';
import PaymentConfirm from '../components/paymentConfirm/PaymentConfirm';
import useDocumentTitle from '../hooks/useDocumentTitle';

const PaymentConfirmPage: React.FC = () => {
  useDocumentTitle('결제 승인 완료 | Yoger');

  return (
    <>
      <Header />
      <PaymentConfirm />
    </>
  );
};

export default PaymentConfirmPage;
