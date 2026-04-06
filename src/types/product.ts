export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  weight?: string;
  tags?: string[];
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
