'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';
import type { Product } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  totalItems: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const CART_STORAGE_KEY = 'cart';
const MAX_QUANTITY_PER_ITEM = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        if (auth?.user) {
          // Load cart from Supabase for authenticated users
          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', auth.user.id);

          if (error) {
            console.error('Error loading cart from Supabase:', error);
            throw error;
          }

          if (cartItems) {
            const formattedItems = cartItems.map(item => ({
              id: item.id,
              product: products.find(p => p.id === item.product_id)!,
              quantity: item.quantity
            })).filter(item => item.product);
            setItems(formattedItems);
          }
        } else {
          // Load cart from localStorage for guest users
          const savedCart = localStorage.getItem(CART_STORAGE_KEY);
          if (savedCart) {
            try {
              const parsedCart = JSON.parse(savedCart);
              if (Array.isArray(parsedCart)) {
                setItems(parsedCart);
              }
            } catch (error) {
              console.error('Error parsing cart from localStorage:', error);
              localStorage.removeItem(CART_STORAGE_KEY);
            }
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [auth?.user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!auth?.user) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, auth?.user]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
      throw new Error(`Quantity must be between 1 and ${MAX_QUANTITY_PER_ITEM}`);
    }

    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      const newQuantity = Math.min(existingItem.quantity + quantity, MAX_QUANTITY_PER_ITEM);
      await updateQuantity(existingItem.id, newQuantity);
      return;
    }

    if (auth?.user) {
      const { data: newItem, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: auth.user.id,
          product_id: product.id,
          quantity
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding item to cart:', error);
        throw error;
      }

      setItems(prev => [...prev, {
        id: newItem.id,
        product,
        quantity
      }]);
    } else {
      setItems(prev => [...prev, {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity
      }]);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (auth?.user) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) {
        console.error('Error removing item from cart:', error);
        throw error;
      }
    }

    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
      throw new Error(`Quantity must be between 1 and ${MAX_QUANTITY_PER_ITEM}`);
    }

    if (auth?.user) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
      }
    }

    setItems(prev => prev.map(item =>
      item.id === cartItemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    if (auth?.user) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', auth.user.id);

      if (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
    }

    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      total,
      totalItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 