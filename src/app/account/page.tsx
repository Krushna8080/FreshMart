'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        if (!authUser?.id) {
          console.log('No authenticated user found');
          router.push('/auth/signin');
          return;
        }

        console.log('Fetching profile for user:', authUser.id);
        const { data: profileData, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            console.log('No profile found, creating new profile');
            // Create new profile
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: authUser.id,
                  email: authUser.email,
                  full_name: '',
                  phone: '',
                  address: '',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }
              ])
              .select()
              .single();

            if (createError) {
              console.error('Error creating profile:', createError);
              throw createError;
            }

            if (newProfile) {
              console.log('New profile created:', newProfile);
              setFormData({
                full_name: '',
                phone: '',
                address: ''
              });
            }
          } else {
            console.error('Error fetching profile:', fetchError);
            throw fetchError;
          }
        } else if (profileData) {
          console.log('Existing profile found:', profileData);
          setFormData({
            full_name: profileData.full_name || '',
            phone: profileData.phone || '',
            address: profileData.address || ''
          });
        }
      } catch (error) {
        console.error('Profile loading error:', error);
        setMessage({ 
          type: 'error', 
          text: error instanceof Error ? error.message : 'Failed to load profile data' 
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [authUser, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (message.type === 'error') {
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      if (!authUser?.id) {
        throw new Error('Not authenticated');
      }

      console.log('Updating profile:', { id: authUser.id, ...formData });
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: authUser.id,
          email: authUser.email,
          ...formData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Error updating profile' 
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={authUser?.email || ''}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Updating...
              </span>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 