'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, categories } from '@/data/products';
import type { Product, Category } from '@/types';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [priceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  
  // Get all products with error handling
  let allProducts: Product[] = [];
  try {
    allProducts = getAllProducts();
  } catch (err) {
    console.error('Error loading products:', err);
    setError('Failed to load products. Please try again later.');
  }
  
  // Filter products based on category and search query
  const filteredProducts = allProducts.filter((product: Product) => {
    if (!product) return false;
    
    try {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = 
        (product.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      const matchesPrice = 
        typeof product.price === 'number' &&
        product.price >= priceRange[0] && 
        product.price <= priceRange[1];
      
      return matchesCategory && matchesSearch && matchesPrice;
    } catch (err) {
      console.error('Error filtering product:', err);
      return false;
    }
  });

  // Sort filtered products with error handling
  const sortedProducts = (() => {
    try {
      return [...filteredProducts].sort((a, b) => {
        if (!a || !b) return 0;
        
        switch (sortOption) {
          case 'price-asc':
            return (a.price || 0) - (b.price || 0);
          case 'price-desc':
            return (b.price || 0) - (a.price || 0);
          case 'name':
            return (a.name || '').localeCompare(b.name || '');
          default:
            return 0;
        }
      });
    } catch (err) {
      console.error('Error sorting products:', err);
      setError('Error sorting products. Please try again.');
      return filteredProducts;
    }
  })();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div className="w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative w-full md:w-48">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {sortedProducts.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 