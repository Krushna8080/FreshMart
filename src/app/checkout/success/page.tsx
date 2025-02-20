'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth/signin');
          return;
        }

        const { data: orderData, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setOrder(orderData);
      } catch (error) {
        console.error('Error loading order:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Order Not Found</h1>
        <Link
          href="/catalog"
          className="text-green-600 hover:text-green-700 underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
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
            <p className="mt-4 text-sm">
              Shipping Address:<br />
              {order.shipping_address}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            href="/account"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View Order History
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 