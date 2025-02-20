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
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const CART_STORAGE_KEY = 'cart';
const MAX_QUANTITY_PER_ITEM = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // Load cart from Supabase for authenticated users
          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', user.id);

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
  }, [user]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!product?.id || quantity < 1) {
      throw new Error('Invalid product or quantity');
    }

    try {
      if (user) {
        // Add item to Supabase for authenticated users
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM)
          })
          .select()
          .single();

        if (error) {
          console.error('Error adding to Supabase cart:', error);
          throw error;
        }

        if (data) {
          // Update local state with the returned data from Supabase
          const newItem = {
            id: data.id,
            product,
            quantity: data.quantity
          };
          setItems(currentItems => [...currentItems, newItem]);
        }
      } else {
        // Handle guest cart in localStorage
        const newItem = {
          id: crypto.randomUUID(), // Use crypto.randomUUID() for guest cart items
          product,
          quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM)
        };

        setItems(currentItems => {
          const updatedItems = [...currentItems, newItem];
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
          return updatedItems;
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!cartItemId) {
      console.error('Invalid cart item ID');
      return;
    }

    try {
      if (user) {
        // Remove from Supabase for authenticated users
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('id', cartItemId);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
      }

      // Update local state
      setItems(currentItems => {
        const updatedItems = currentItems.filter(item => item.id !== cartItemId);
        if (!user) {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        }
        return updatedItems;
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!cartItemId) {
      console.error('Invalid cart item ID');
      return;
    }

    if (quantity < 1) {
      return removeFromCart(cartItemId);
    }

    try {
      const newQuantity = Math.min(quantity, MAX_QUANTITY_PER_ITEM);

      if (user) {
        // Update quantity in Supabase for authenticated users
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('user_id', user.id)
          .eq('id', cartItemId);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
      }

      // Update local state
      setItems(currentItems => {
        const updatedItems = currentItems.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        );
        if (!user) {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        }
        return updatedItems;
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        // Clear cart in Supabase for authenticated users
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      }
      
      // Clear local state and localStorage
      setItems([]);
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      total, 
      totalItems,
      isLoading 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext); 