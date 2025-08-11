export interface IOrder {
  customer_name: string;
  customer_phone: string
  customer_email: string
  item_id: number
  item_price: number
  quantity: number
  status: ORDER_STATUS
  created_at: Date
  id: number
}

export enum ORDER_STATUS {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}