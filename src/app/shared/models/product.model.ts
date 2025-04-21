export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  quantity?: number;
  total?: number;
  rating?: {
    count: number;
    rate: number;
  };
}
