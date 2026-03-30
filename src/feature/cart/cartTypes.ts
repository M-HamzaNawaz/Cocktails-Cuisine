import type { CartItem } from '../../types/product';

export interface CartState {
  items: CartItem[];
  total: number;
}
