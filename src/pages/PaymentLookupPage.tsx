import { Header, Footer } from '../components/common';
import PaymentLookup from '../components/paymentLookup/PaymentLookup';

const PaymentLookupPage: React.FC = () => {
  return (
    <>
      <Header />
      <PaymentLookup />
      <Footer />
    </>
  );
};

export default PaymentLookupPage;
