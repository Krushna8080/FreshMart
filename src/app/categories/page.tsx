'use client';

import { motion } from 'framer-motion';
import { categories } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

// Function to get the correct image URL
const getImageUrl = (imageUrl: string) => {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // If it's an Unsplash ID (no slashes), construct the Unsplash URL
  if (!imageUrl.includes('/')) {
    return `https://source.unsplash.com/${imageUrl}/800x600`;
  }
  // For local images starting with '/', use as is
  return imageUrl;
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Shop by Category</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore our wide selection of fresh and quality products
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block group"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  {category.subcategories && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="text-sm bg-white/20 text-white px-3 py-1 rounded-full"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-white font-medium group">
                    <span>Shop Now</span>
                    <ChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 