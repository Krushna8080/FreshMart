'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getNewArrivals } from '@/data/products';

export default function NewArrivals() {
  const [sortBy, setSortBy] = useState('newest');
  const newProducts = getNewArrivals();

  const sortProducts = (products: any[]) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(newProducts);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our latest products, fresh from local farms and suppliers
            </p>
          </motion.div>
        </div>

        {/* Sorting Options */}
        <div className="flex justify-end mb-8">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative">
                <ProductCard product={product} />
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Clock className="h-3 w-3 mr-1" />
                    New
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No new products</h3>
            <p className="mt-1 text-sm text-gray-500">
              Check back soon for new arrivals!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 