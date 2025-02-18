import { Header } from '../components/common';
import Chat from '../components/chat/Chat';
import useDocumentTitle from '../hooks/useDocumentTitle';
import styled from 'styled-components';

const ChatPage: React.FC = () => {
  useDocumentTitle('채팅 | Yoger');

  return (
    <ChatPageContainer>
      <Header />
      <Chat />
    </ChatPageContainer>
  );
};

export default ChatPage;

// 채팅 화면
const ChatPageContainer = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;
