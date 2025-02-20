'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);

    try {
      await addToCart(product);
      setTimeout(() => setIsAdding(false), 500);
    } catch (err) {
      setError('Failed to add to cart');
      setIsAdding(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow relative"
    >
      <Link href={`/products/${product.id}`} className="block relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {product.isPopular && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded-full">
              Popular
            </span>
          </div>
        )}
      </Link>
      <div className="p-4">
        <Link
          href={`/products/${product.id}`}
          className="block text-lg font-medium text-gray-900 hover:text-green-600 transition-colors mb-1"
        >
          {product.name}
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.unit}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`p-2 rounded-full ${
              isAdding
                ? 'bg-green-100 text-green-600'
                : error
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
            } transition-all duration-300`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
        {error && (
          <div className="absolute bottom-2 left-2 right-2 bg-red-100 text-red-600 text-sm py-1 px-2 rounded text-center">
            {error}
          </div>
        )}
      </div>
    </motion.div>
  );
} 