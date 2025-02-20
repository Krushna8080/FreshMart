'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!auth) {
      return;
    }

    if (!isRedirecting && !auth.loading && !auth.user) {
      setIsRedirecting(true);
      const redirectUrl = `/auth/signin?redirectedFrom=${encodeURIComponent(pathname)}`;
      router.push(redirectUrl);
    }
  }, [auth, router, pathname, isRedirecting]);

  if (!auth || auth.loading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (!auth.user) {
    return null;
  }

  return <>{children}</>;
} 