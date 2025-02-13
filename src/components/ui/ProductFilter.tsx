'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFilterProps {
  onSortChange: (value: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  sortBy: string;
  minPrice: number;
  maxPrice: number;
}

export default function ProductFilter({
  onSortChange,
  onPriceRangeChange,
  sortBy,
  minPrice,
  maxPrice
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {isOpen ? 'Hide' : 'Show'} Filters
          <ChevronDown
            className={`inline-block ml-1 h-4 w-4 transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-6">
              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) =>
                        onPriceRangeChange(Number(e.target.value), maxPrice)
                      }
                      min={0}
                      placeholder="Min"
                      className="w-full rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) =>
                        onPriceRangeChange(minPrice, Number(e.target.value))
                      }
                      min={minPrice}
                      placeholder="Max"
                      className="w-full rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 