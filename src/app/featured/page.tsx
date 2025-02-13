'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, sortProducts } from '@/data/products';

export default function Featured() {
  const [sortBy, setSortBy] = useState('featured');
  const featuredProducts = getFeaturedProducts();

  const sortedProducts = sortProducts(featuredProducts, sortBy);

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our handpicked selection of premium products at great prices
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
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Star className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No featured products</h3>
            <p className="mt-1 text-sm text-gray-500">
              Check back soon for our featured selections!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 