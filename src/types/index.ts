// Product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

// CartItem interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart interface
export interface Cart {
  items: CartItem[];
  total: number;
}

// Order interface
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}
