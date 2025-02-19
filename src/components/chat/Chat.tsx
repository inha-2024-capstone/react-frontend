import useDocumentTitle from '../../hooks/useDocumentTitle';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillPicture } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';

type ChatItemType = {
  id: number;
  message: string;
  sender: 'seller' | 'user';
};

const Chat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null); // 마지막 메시지에 대한 ref
  useDocumentTitle('채팅 | Yoger');

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      {/* 채팅 내역 */}
      <ChatList>
        {chatList.map((chat, index) => (
          <ChatItem
            key={chat.id}
            item={chat}
            showIcon={index === 0 || chatList[index - 1].sender !== chat.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </ChatList>

      {/* 채팅 입력 */}
      <ChatBottom>
        <ChatBtns>
          <AiFillPicture />
        </ChatBtns>
        <ChatForm>
          <ChatInput type="text" />
          <ChatBtns type="submit">
            <FiSend />
          </ChatBtns>
        </ChatForm>
      </ChatBottom>
    </>
  );
};

export default Chat;

const ChatItem: React.FC<{ item: ChatItemType; showIcon: boolean }> = ({
  item,
  showIcon,
}) => {
  return (
    <ChatItemContainer type={item.sender}>
      {item.sender === 'seller' && (
        <FaUserCircle style={{ visibility: showIcon ? 'visible' : 'hidden' }} />
      )}
      <ChatItemMessage type={item.sender}>{item.message}</ChatItemMessage>
    </ChatItemContainer>
  );
};

// 채팅 하단
const ChatBottom = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0.6rem;
  border-top: 1px solid #ccc;
`;
const ChatBtns = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  padding: 0;
  & > svg {
    font-size: 1.5rem !important;
  }
`;
const ChatForm = styled.form`
  display: flex;
  flex: 1;
`;
const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.7rem;
  border: none;
  border-radius: 5px;
  margin: 0 0.5rem;
  background-color: #f5f5f5;
  &:focus {
    outline: none;
  }
`;
// 채팅 리스트
const ChatList = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  flex: 1;
  overflow-y: auto;
`;
const ChatItemContainer = styled.article<{ type: string }>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.type === 'user' ? 'auto' : '0')};
  margin-bottom: 0.8rem;
  align-items: end;
  & > svg {
    font-size: 2rem !important;
    margin-right: 0.8rem;
  }
`;
const ChatItemMessage = styled.div<{ type: string }>`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: ${(props) =>
    props.type === 'user' ? '6px 6px 1px 6px' : '6px 6px 6px 1px'};
  padding: 0.4rem 0.8rem 0.3rem;
  max-width: min(28rem, 65vw);
`;

const chatList: ChatItemType[] = [
  {
    id: 1,
    message: 'hello',
    sender: 'seller',
  },
  {
    id: 2,
    message: 'hi',
    sender: 'user',
  },
  {
    id: 3,
    message: 'good',
    sender: 'seller',
  },
  {
    id: 4,
    message: 'bye',
    sender: 'user',
  },
  {
    id: 5,
    message:
      "long long text please check this out and see what happens and ? hi hello i'm here and you are there i want to go there and see you",
    sender: 'user',
  },
  {
    id: 6,
    message:
      'i am here and you are there and i want to go there and see you and say hi and hello and good bye and good night and good morning and what are you doing now and what what hi hello',
    sender: 'seller',
  },
  {
    id: 7,
    message: 'hello',
    sender: 'seller',
  },
  {
    id: 8,
    message: 'hi',
    sender: 'user',
  },
  {
    id: 9,
    message: 'good',
    sender: 'seller',
  },
];
