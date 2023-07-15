import { OrderItemPaymentRequest } from "./OrderItemPaymentRequest";

export interface OrderItemsProcessingRequest {
  comment: string;
  items: OrderItemPaymentRequest[];
}
