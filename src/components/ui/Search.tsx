'use client';

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { searchProducts } from '@/data/products';
import type { Product } from '@/types';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length >= 2) {
        setIsLoading(true);
        try {
          const searchResults = searchProducts(debouncedQuery);
          setResults(searchResults);
          setIsOpen(true);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
      setSelectedIndex(-1);
    };

    performSearch();
  }, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < Math.min(results.length - 1, 4) ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex > -1 && selectedIndex < 5) {
        handleProductSelect(results[selectedIndex]);
      } else {
        handleViewAllResults();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleProductSelect = (product: Product) => {
    router.push(`/products/${product.id}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleViewAllResults = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          aria-label="Search products"
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 animate-spin" />
        ) : query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-[calc(100vh-200px)] overflow-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 text-green-500 animate-spin" />
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <>
                {results.slice(0, 5).map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
                      index === selectedIndex ? 'bg-gray-50' : ''
                    }`}
                    role="option"
                    aria-selected={index === selectedIndex}
                  >
                    <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                {results.length > 5 && (
                  <button
                    onClick={handleViewAllResults}
                    className="w-full p-3 flex items-center justify-between text-sm text-green-600 hover:bg-green-50 font-medium"
                  >
                    View all {results.length} results
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No products found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 