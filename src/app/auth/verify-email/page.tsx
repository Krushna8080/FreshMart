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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Check your email
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-sm mx-auto">
          We've sent you an email with a link to verify your account. Please check your inbox and follow the instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <p className="text-sm text-gray-500 text-center">
              Didn't receive the email? Check your spam folder or{' '}
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