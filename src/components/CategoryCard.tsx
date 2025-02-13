'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

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

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
      >
        <Image
          src={getImageUrl(category.image)}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
          <p className="text-sm text-white/90">{category.description}</p>
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {category.subcategories.slice(0, 3).map((sub) => (
                <span
                  key={sub}
                  className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
} 