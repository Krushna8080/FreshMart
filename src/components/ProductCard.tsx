'use client';

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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 