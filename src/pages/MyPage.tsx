import useDocumentTitle from '../hooks/useDocumentTitle';
import { Footer, Header, NavMenu } from '../components/common';
import My from '../components/my/My';

const MyPage: React.FC = () => {
  useDocumentTitle('마이 | Yoger');

  return (
    <>
      <Header />
      <My />
      <Footer />
      <NavMenu />
    </>
  );
};

export default MyPage;
