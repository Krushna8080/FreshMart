'use client';

import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, ChevronLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products, getRelatedProducts } from '@/data/products';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ProductPage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const relatedProducts = getRelatedProducts(resolvedParams.id, 4);

  if (!product) {
    notFound();
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    setError(null);
    try {
      await addToCart(product, quantity);
      setQuantity(1);
      setIsAdding(false);
    } catch (err) {
      setError('Failed to add to cart. Please try again.');
      setIsAdding(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRelatedProductAdd = async (relatedProduct: typeof product) => {
    setError(null);
    try {
      await addToCart(relatedProduct, 1);
    } catch (err) {
      setError('Failed to add to cart. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/categories"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Categories</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">per {product.unit}</span>
            </div>

            {/* Nutrition Information */}
            {product.nutritionInfo && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Nutrition Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.nutritionInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                  disabled={isAdding}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                  disabled={isAdding}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock} units available
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-8 rounded-lg transition-colors ${
                isAdding
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-green-600"
                    >
                      {relatedProduct.name}
                    </Link>
                    <p className="text-gray-500 text-sm mb-4">{relatedProduct.unit}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRelatedProductAdd(relatedProduct)}
                        className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 