export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  unit: string;
  stock: number;
  isPopular: boolean;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  discount?: number;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  subcategories: string[];
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  shipping_address: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Review {
  id: string;
  productId: number;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
  images?: string[];
} 