import useDocumentTitle from '../hooks/useDocumentTitle';
import { Footer, Header } from '../components/common';
import Notification from '../components/notification/Notification';

const NotificationPage: React.FC = () => {
  useDocumentTitle('알림 | Yoger');

  return (
    <>
      <Header />
      <Notification />
      <Footer />
    </>
  );
};

export default NotificationPage;
