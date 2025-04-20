export interface CheckoutRequest {
  user: {
    id: number;
  };
  products: {
    id: number;
    name?: string;
    price?: number;
    stock: number; // Used as quantity in this context
    image?: string;
  }[];
  shippingAddress: string;
  billingAddress: string;
}
