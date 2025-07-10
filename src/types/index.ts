// Product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  // stock: number;
  colors?: string[];
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isFavorite?: boolean;
  isFeatured?: boolean;
  description?: string;
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

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface filterTypes {
  colors: string[];
  priceRange: [number, number];
  categories: string[];
}

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  origin: string;
  og: string;
  keywords: string[];
  creator: {
    name: string;
    url: string;
  };
  socials: {
    github: string;
  };
};
