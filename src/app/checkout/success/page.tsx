'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        const { data: orderData, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(orderData);
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, router, supabase]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Order Not Found</h1>
        <Link
          href="/"
          className="text-green-600 hover:text-green-700 underline"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your order has been successfully placed and is being processed.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Details
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>Order ID: {order.id}</p>
            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
            <p>Status: {order.status}</p>
          </div>
        </div>

        <div className="space-x-4">
          <Link
            href="/account"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
          >
            View Order History
          </Link>
          <Link
            href="/catalog"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 