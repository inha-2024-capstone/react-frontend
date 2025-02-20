import { Link } from 'react-router-dom';
import { YogerLogoIcon } from '../../assets/common';
import styled from 'styled-components';

const ChatList: React.FC = () => {
  return (
    <ChatListMain>
      {/* 채팅 목록 */}
      <ChatListSection>
        <ChatListContainer>
          {chatListItems.map((chat) => (
            <ChatListItem key={chat.id} item={chat} />
          ))}
        </ChatListContainer>
      </ChatListSection>
    </ChatListMain>
  );
};

export default ChatList;

const ChatListItem: React.FC<{ item: ChatListItemType }> = ({ item }) => {
  return (
    <ChatListItemContainer>
      <ChatListItemImage src={YogerLogoIcon} alt="logo" />
      <ChatLink to="/chat">
        <ChatListItemTop>
          <ChatListItemTitle>{item.name}</ChatListItemTitle>
          <ChatListItemDate>{item.date}</ChatListItemDate>
        </ChatListItemTop>

        <ChatListItemBottom>
          <ChatListItemMessage>{item.message}</ChatListItemMessage>
          <ChatListItemAlarm cnt={item.alarmCount}>
            {item.alarmCount}
          </ChatListItemAlarm>
        </ChatListItemBottom>
      </ChatLink>
    </ChatListItemContainer>
  );
};

const ChatListMain = styled.main`
  flex: 1;
`;
const ChatListSection = styled.section``;
const ChatListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ChatListItemContainer = styled.li`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;
const ChatLink = styled(Link)`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
`;
const ChatListItemImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  box-shadow: 0 0 0 1px #52525270;
  border-radius: 50%;
  margin-right: 0.7rem;
  align-self: center;
`;
const ChatListItemTop = styled.div`
  flex: 1;
  display: flex;
`;
const ChatListItemTitle = styled.h3`
  margin: 0;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  font-weight: bold;
`;
const ChatListItemMessage = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #666;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.7;
  max-height: 3.2em;
`;
const ChatListItemDate = styled.span`
  font-size: 0.7rem;
  color: #888;
  margin-left: auto;
`;
const ChatListItemAlarm = styled.span<{ cnt: number }>`
  margin-left: 2rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  color: #fff;
  background: #ff5a44;
  border-radius: 1rem;
  font-weight: bold;
  height: 1.45rem;
  visibility: ${(props) => (props.cnt > 0 ? 'visible' : 'hidden')};
`;
const ChatListItemBottom = styled.div`
  display: flex;
`;

type ChatListItemType = {
  id: number;
  name: string;
  message: string;
  date: string;
  alarmCount: number;
};

const chatListItems = [
  {
    id: 1,
    name: '요거프레소',
    message:
      '안녕하세요! 요거프레소입니다. 최근에 새로 출시된 제품에 대해 궁금한 점이 있어서 문의드립니다. 특히, 제품의 원재료와 보관 방법에 대해 알고 싶어요.',
    date: '2025.08.01',
    alarmCount: 0,
  },
  {
    id: 2,
    name: '요거 오피스',
    message:
      '안녕하세요 고객님! 주문하신 상품의 재고가 부족하여 예약하셔야 할 것 같습니다. 원하시는 상품의 배송 일정과 대체 상품에 대한 정보도 함께 알려주시면 감사하겠습니다. 그리고 추가로 궁금한 사항이 있으시면 언제든지 문의해 주세요.',
    date: '2025.08.01',
    alarmCount: 1,
  },
  {
    id: 3,
    name: '커피하우스',
    message:
      '안녕하세요! 커피하우스입니다. 이번에 신제품 출시 일정이 궁금해서 연락드렸습니다. 특히, 언제쯤 새로운 맛의 커피를 만나볼 수 있을지 알고 싶어요.',
    date: '2025.08.02',
    alarmCount: 0,
  },
  {
    id: 4,
    name: '프레시 마켓',
    message:
      '안녕하세요! 주문하신 상품이 현재 배송 중입니다. 배송 추적 번호도 함께 보내드릴 수 있으니, 필요하시면 말씀해 주세요. 항상 저희를 이용해 주셔서 감사합니다!',
    date: '2025.08.03',
    alarmCount: 2,
  },
  {
    id: 5,
    name: '스낵바',
    message:
      '안녕하세요! 최근에 주문한 상품에 대해 반품 신청을 하고 싶습니다. 반품 절차와 필요한 서류에 대해 자세히 안내해 주시면 감사하겠습니다.',
    date: '2025.08.04',
    alarmCount: 0,
  },
  {
    id: 6,
    name: '요거프레소',
    message:
      '안녕하세요! 결제 관련 문의드립니다. 카드 결제 시 오류가 발생하여 결제가 완료되지 않았습니다. 이 문제를 해결할 수 있는 방법이 있을까요?',
    date: '2025.08.05',
    alarmCount: 1,
  },
  {
    id: 7,
    name: '커피하우스',
    message:
      '안녕하세요! 쿠폰 사용 방법에 대해 문의드립니다. 할인 쿠폰을 가지고 있는데, 어떻게 적용할 수 있는지 자세히 알고 싶습니다.',
    date: '2025.08.06',
    alarmCount: 0,
  },
  {
    id: 8,
    name: '프레시 마켓',
    message:
      '안녕하세요! 주문하신 상품이 도착했습니다. 빠른 배송에 감사드리며, 품질이 기대 이상이라 매우 기쁩니다. 앞으로도 자주 이용하겠습니다!',
    date: '2025.08.07',
    alarmCount: 0,
  },
  {
    id: 9,
    name: '스낵바',
    message:
      '안녕하세요! 배송이 지연되고 있어서 확인 부탁드립니다. 원래 예정일이 언제인지 알고 싶고, 혹시 다른 배송 옵션이 있는지도 궁금합니다.',
    date: '2025.08.08',
    alarmCount: 3,
  },
  {
    id: 10,
    name: '요거 오피스',
    message:
      '안녕하세요! 주문 내역을 확인할 수 있을까요? 최근에 여러 상품을 주문했는데, 정확한 내역을 알고 싶어서 문의드립니다.',
    date: '2025.08.09',
    alarmCount: 0,
  },
  {
    id: 11,
    name: '커피하우스',
    message:
      '안녕하세요! 새로운 메뉴가 추가되었는지 궁금합니다. 특히, 여름 한정 메뉴가 있다면 미리 알고 싶어요!',
    date: '2025.08.10',
    alarmCount: 0,
  },
  {
    id: 12,
    name: '프레시 마켓',
    message:
      '안녕하세요! 이벤트 쿠폰을 받을 수 있는 방법이 있을까요? 자주 이용하는 고객으로서 혜택을 누릴 수 있다면 좋겠습니다.',
    date: '2025.08.11',
    alarmCount: 1,
  },
  {
    id: 13,
    name: '스낵바',
    message:
      '안녕하세요! 상품 리뷰를 남기고 싶습니다. 어떻게 진행해야 하는지, 그리고 리뷰 작성 후 혜택이 있는지도 궁금합니다.',
    date: '2025.08.12',
    alarmCount: 0,
  },
  {
    id: 14,
    name: '요거프레소',
    message:
      '안녕하세요! 환불 처리 상태를 알고 싶습니다. 지난주에 환불 요청을 했는데, 현재 진행 상황이 궁금합니다.',
    date: '2025.08.13',
    alarmCount: 2,
  },
  {
    id: 15,
    name: '요거 오피스',
    message:
      '안녕하세요! 고객센터에 문의하고 싶습니다. 전화로 문의하기 어려운 상황이라, 가능한 방법이 있다면 알려주세요.',
    date: '2025.08.14',
    alarmCount: 0,
  },
];
