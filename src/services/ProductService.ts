import { axiosInstance } from '../utils/axios';

class ProductService {
  // 판매 가능 상품 전체 조회
  public static async getProducts() {
    const response = await axiosInstance.get('/api/products');
    return response.data;
  }

  // 상품 상세 조회
  public static async getProduct(productId: string) {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    return response.data;
  }
}

export default ProductService;
