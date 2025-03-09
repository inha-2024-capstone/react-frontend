import { axiosInstance } from '../utils/axios';

class OrderService {
  // 주문하기
  public static async orderProduct(productId: string, quantity: number) {
    const response = await axiosInstance.post(
      `/api/orders/products/${productId}`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('yogerAccessToken')}`,
        },
      },
    );
    return response.data;
  }
}

export default OrderService;
