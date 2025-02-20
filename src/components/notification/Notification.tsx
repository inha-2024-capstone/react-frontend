import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa6'; // start
import { HiShoppingBag } from 'react-icons/hi2'; // complete
import { FaCircleXmark } from 'react-icons/fa6'; // cancel
import { BsGiftFill } from 'react-icons/bs'; // end
import { FaMoneyCheckDollar } from 'react-icons/fa6'; // refund
import styled from 'styled-components';

type NotificationType = {
  id: number;
  brand: string;
  title: string;
  content: string;
  state: 'start' | 'complete' | 'cancel' | 'end' | 'refund';
  orderNumber: string;
};

const iconList = {
  start: <FaTruck />,
  complete: <HiShoppingBag />,
  cancel: <FaCircleXmark />,
  end: <BsGiftFill />,
  refund: <FaMoneyCheckDollar />,
};

const Notification: React.FC = () => {
  return (
    <NotificationMain>
      <NotificationList>
        {notificationList.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationIcon>{iconList[notification.state]}</NotificationIcon>
            <NotificationContent>
              <NotificationBrand>{notification.brand}</NotificationBrand>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationText>{notification.content}</NotificationText>
              <NotificationNumber to="/ordersheet" state={{ fromList: true }}>
                {notification.orderNumber}
              </NotificationNumber>
            </NotificationContent>
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationMain>
  );
};

export default Notification;

const NotificationMain = styled.main`
  display: flex;
  flex: 1;
`;
const NotificationList = styled.ul`
  width: 100%;
  padding: 0rem;
  margin: 0;
`;
const NotificationItem = styled.li`
  display: flex;
  padding: 1rem 1.2rem 1.2rem;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
`;
const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  border-radius: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const NotificationTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;
const NotificationBrand = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-size: 0.8rem;
  font-weight: bold;
`;
const NotificationText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
`;
const NotificationNumber = styled(Link)`
  font-size: 0.9rem;
  color: #2c3d4f;
  margin: 0;
  margin-top: 0.5rem;
  font-weight: bold;
`;

const notificationList: NotificationType[] = [
  {
    id: 1,
    brand: 'Yoger Store',
    title: '주문이 완료되었습니다.',
    content: '주문이 완료되었습니다. 주문 내역을 확인해보세요.',
    state: 'complete',
    orderNumber: '202106230001',
  },
  {
    id: 2,
    brand: 'Yellow',
    title: '배송이 시작되었습니다.',
    content: '배송이 시작되었습니다. 배송 추적을 확인해보세요.',
    state: 'start',
    orderNumber: '202106230002',
  },
  {
    id: 3,
    brand: 'Crown Store',
    title: '배송이 완료되었습니다.',
    content: '배송이 완료되었습니다. 배송 완료 확인을 해주세요.',
    state: 'end',
    orderNumber: '202106230003',
  },
  {
    id: 4,
    brand: 'Ricky Store',
    title: '환불이 완료되었습니다.',
    content: '환불이 완료되었습니다. 환불 내역을 확인해주세요.',
    state: 'refund',
    orderNumber: '202106230004',
  },
  {
    id: 5,
    brand: '2026 Store',
    title: '주문이 취소되었습니다.',
    content: '주문이 취소되었습니다. 취소 내역을 확인해주세요.',
    state: 'cancel',
    orderNumber: '202106230005',
  },
  {
    id: 6,
    brand: 'Apple Store',
    title: '주문이 완료되었습니다.',
    content: '주문이 완료되었습니다. 주문 내역을 확인해보세요.',
    state: 'complete',
    orderNumber: '202106230006',
  },
];
