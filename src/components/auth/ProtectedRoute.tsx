'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user && !isRedirecting) {
      setIsRedirecting(true);
      const currentPath = encodeURIComponent(pathname);
      router.push(`/auth/signin?redirectedFrom=${currentPath}`);
    }
  }, [user, loading, router, pathname, isRedirecting]);

  if (loading || isRedirecting) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <p className="text-sm text-gray-500">
          {loading ? 'Checking authentication...' : 'Redirecting to login...'}
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
} 