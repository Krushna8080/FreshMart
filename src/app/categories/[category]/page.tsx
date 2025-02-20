'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { use } from 'react';
import { getProductsByCategory, categories, sortProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ui/ProductFilter';
import type { Product } from '@/types';

interface PageProps {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const category = categories.find(cat => cat.slug === categorySlug);

  useEffect(() => {
    if (category) {
      let categoryProducts = getProductsByCategory(categorySlug);
      categoryProducts = sortProducts(categoryProducts, sortBy);
      setProducts(categoryProducts);
    }
  }, [categorySlug, category, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[300px] bg-gradient-to-r from-green-900 to-green-700 flex items-center justify-center"
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter
              sortBy={sortBy}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onSortChange={setSortBy}
              onPriceRangeChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
            />

            {/* Subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                <h3 className="font-medium mb-4">Subcategories</h3>
                <div className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      className="text-gray-600 hover:text-green-600 transition-colors w-full text-left py-1"
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 