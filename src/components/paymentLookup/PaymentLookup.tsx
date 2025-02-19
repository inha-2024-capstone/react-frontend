import { Link } from 'react-router-dom';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import { IoDocumentTextOutline } from 'react-icons/io5';
import styled from 'styled-components';

const PaymentLookup: React.FC = () => {
  const priceFormatter = usePriceFormatter();

  return (
    <LookupSection>
      {/* 주문 내역 테이블 */}
      <StyledTable>
        {/* 테이블 헤더 */}
        <TableHead>
          <TableRow>
            <TableHeader>주문번호</TableHeader>
            <TableHeader>주문날짜</TableHeader>
            <TableHeader>결제금액</TableHeader>
            <TableHeader>주문상태</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>

        {/* 테이블 요소 */}
        <TableBody>
          {paymentList.map((payment) => (
            <TableRow key={payment.id}>
              <TableCellLink to="/ordersheet" state={{ fromList: true }}>
                {payment.paymentId}
              </TableCellLink>
              <TableCell>{payment.paymentDate}</TableCell>
              <TableCell>{priceFormatter(payment.paymentAmount)}원</TableCell>
              <TableCell>{payment.paymentStatus}</TableCell>
              <TableCellLink to="/ordersheet" state={{ fromList: true }}>
                <LookupLinkIcon />
              </TableCellLink>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </LookupSection>
  );
};

export default PaymentLookup;

// 주문 내역 리스트
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  padding: 1rem;
`;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
`;
const TableHeader = styled.th`
  font-size: 0.9rem;
  color: #333;
  text-align: left;
  padding: 1rem;
  background-color: #f8f8f8;
  font-weight: bold;
`;
const TableCell = styled.td`
  font-size: 0.8rem;
  color: #333;
  height: 3rem;
  padding: 0 1rem;
  text-align: left;
`;
const TableCellLink = styled(Link)`
  font-size: 0.8rem;
  color: #333;
  height: 3rem;
  padding: 0 1rem;
  display: block;
  align-content: center;
  text-align: left;
  font-weight: bold;
`;
const LookupLinkIcon = styled(IoDocumentTextOutline)`
  font-size: 1.5rem;
  color: #333;
`;
const LookupSection = styled.section`
  padding: 1rem;
  word-break: keep-all;
  overflow: auto;
`;

const paymentList = [
  {
    id: 1,
    paymentId: '202101010001',
    paymentDate: '2021-01-01',
    paymentAmount: 10000,
    paymentStatus: '결제완료',
  },
  {
    id: 2,
    paymentId: '202101010002',
    paymentDate: '2021-01-01',
    paymentAmount: 20000,
    paymentStatus: '결제완료',
  },
  {
    id: 3,
    paymentId: '202101010003',
    paymentDate: '2021-01-01',
    paymentAmount: 30000,
    paymentStatus: '결제완료',
  },
  {
    id: 4,
    paymentId: '202101010004',
    paymentDate: '2021-01-01',
    paymentAmount: 40000,
    paymentStatus: '결제완료',
  },
  {
    id: 5,
    paymentId: '202101010005',
    paymentDate: '2021-01-01',
    paymentAmount: 50000,
    paymentStatus: '결제완료',
  },
  {
    id: 6,
    paymentId: '202101010006',
    paymentDate: '2021-01-01',
    paymentAmount: 60000,
    paymentStatus: '결제완료',
  },
  {
    id: 7,
    paymentId: '202101010007',
    paymentDate: '2021-01-01',
    paymentAmount: 70000,
    paymentStatus: '결제완료',
  },
  {
    id: 8,
    paymentId: '202101010008',
    paymentDate: '2021-01-01',
    paymentAmount: 80000,
    paymentStatus: '결제완료',
  },
  {
    id: 9,
    paymentId: '202101010009',
    paymentDate: '2021-01-01',
    paymentAmount: 90000,
    paymentStatus: '결제완료',
  },
  {
    id: 10,
    paymentId: '202101010010',
    paymentDate: '2021-01-01',
    paymentAmount: 100000,
    paymentStatus: '결제완료',
  },
];
