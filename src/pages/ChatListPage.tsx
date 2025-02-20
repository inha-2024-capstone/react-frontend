import useDocumentTitle from '../hooks/useDocumentTitle';
import { Header, Footer } from '../components/common';
import ChatList from '../components/chatList/ChatList';

const ChatListPage: React.FC = () => {
  useDocumentTitle('채팅 목록 | Yoger');
  return (
    <>
      <Header />
      <ChatList />
      <Footer />
    </>
  );
};

export default ChatListPage;
