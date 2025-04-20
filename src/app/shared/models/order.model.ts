import { OrderItem } from "./order-item.model";
import { OrderStatus } from "./order-status.model";
import { PaymentMethod } from "./payment-method.model";

export interface Order {
  id?: number;
  orderNumber?: string;
  orderDate?: Date;
  status: OrderStatus;
  user: string; // This could be a User object if you have a User model
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  orderItemsList: OrderItem[];
}
