'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { ShoppingBag } from 'lucide-react';

interface FormData {
  full_name: string;
  email: string;
  address: string;
  phone: string;
  card_number: string;
  expiry: string;
  cvv: string;
}

export default function Checkout() {
  const router = useRouter();
  const cart = useCart();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    address: '',
    phone: '',
    card_number: '',
    expiry: '',
    cvv: ''
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!loading && (!cart || cart.items.length === 0)) {
      router.push('/cart');
    }
  }, [loading, cart, router]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth/signin');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        if (profileData) {
          setFormData(prev => ({
            ...prev,
            full_name: profileData.full_name || '',
            email: profileData.email || '',
            address: profileData.address || '',
            phone: profileData.phone || ''
          }));
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateShippingInfo = () => {
    if (!formData.full_name || !formData.email || !formData.address || !formData.phone) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const validatePaymentInfo = () => {
    if (!formData.card_number || !formData.expiry || !formData.cvv) {
      setError('Please fill in all payment details');
      return false;
    }
    return true;
  };

  const simulatePayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart) {
      setError('Cart is not initialized');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (step === 'shipping') {
        if (validateShippingInfo()) {
          setStep('payment');
        }
        setProcessing(false);
        return;
      }

      if (!validatePaymentInfo()) {
        setProcessing(false);
        return;
      }

      // Simulate payment processing
      const paymentSuccess = await simulatePayment();
      if (!paymentSuccess) {
        throw new Error('Payment failed');
      }

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: cart.total,
          status: 'paid',
          shipping_address: formData.address,
          contact_phone: formData.phone,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      if (!order) {
        throw new Error('Order was not created');
      }

      // Create order items
      const orderItems = cart.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        created_at: new Date().toISOString()
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items creation error:', itemsError);
        // Rollback order if items insertion fails
        const { error: deleteError } = await supabase
          .from('orders')
          .delete()
          .eq('id', order.id);
          
        if (deleteError) {
          console.error('Failed to rollback order:', deleteError);
        }
        throw new Error(`Failed to create order items: ${itemsError.message}`);
      }

      // Clear cart and redirect to success page
      await cart.clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (err) {
      console.error('Error processing order:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to process order. Please try again.'
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (cart && cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push('/catalog')} variant="primary">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow p-6">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-medium">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${cart.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {step === 'shipping' ? 'Shipping Information' : 'Payment Information'}
          </h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            {step === 'shipping' ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  type="text"
                  id="card_number"
                  name="card_number"
                  value={formData.card_number}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />

                  <Input
                    label="CVV"
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={processing}
              isLoading={processing}
              className="mt-6 w-full"
            >
              {processing ? 'Processing...' : step === 'shipping' ? 'Continue to Payment' : 'Place Order'}
            </Button>

            {step === 'payment' && (
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="mt-4 text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back to Shipping Information
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 