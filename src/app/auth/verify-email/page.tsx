'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Check Your Email</h1>
        <p className="text-gray-600 text-center mb-6">
          We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-gray-500 text-sm text-center">
          Can&apos;t find the email? Check your spam folder or contact support.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <p className="text-sm text-gray-500 text-center">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                try signing up again
              </Link>
            </p>

            <div className="text-sm text-center">
              <Link
                href="/auth/signin"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 