'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, ChevronLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products, getRelatedProducts } from '@/data/products';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id.toString() === params.id);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const relatedProducts = getRelatedProducts(Number(params.id), 4);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
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
          <div>
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
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
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
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
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
                        onClick={() => addItem(relatedProduct)}
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