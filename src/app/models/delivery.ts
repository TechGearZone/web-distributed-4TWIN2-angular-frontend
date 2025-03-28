export interface Delivery {
  id: number;
  orderId: number;
  status: string;
  shippingAddress: string;
  trackingNumber: string;
  estimatedDeliveryDate: string;
  driverId: number | null;
}
