'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, total } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link
          href="/catalog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.product.id} className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} / {item.product.unit}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-4 text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">Total</p>
            <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => router.push('/checkout')}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 