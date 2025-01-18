interface ProductType {
  id: number;
  name: string;
  priceByQuantities: {
    quantity: number;
    price: number;
  }[];
  state: string;
  creatorName: string;
  dueDate: string;
  soldQuantity: number;
}

export interface ProductListType extends ProductType {
  thumbnailImageUrl: string;
}

export interface ProductDetailType extends ProductType {
  description: string;
  imageUrl: string;
  creatorId: number;
}
