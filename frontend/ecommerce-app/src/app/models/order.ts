import { CartItem } from './cart';

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentStatus: 'success' | 'failure';
};
