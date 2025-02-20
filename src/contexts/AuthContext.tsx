'use client';

import { createContext, useContext, useEffect, useState, useCallback, Suspense } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface UserData {
  full_name?: string;
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  error: AuthError | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, userData: UserData) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: true
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateState = useCallback((newState: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  const handleError = useCallback((error: AuthError | null) => {
    if (error) {
      updateState({ error });
    }
    return error;
  }, [updateState]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          handleError(error);
        }
        updateState({ 
          user: session?.user ?? null,
          loading: false 
        });
      } catch (error) {
        if (error instanceof AuthError) {
          handleError(error);
        }
        updateState({ loading: false });
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      updateState({ 
        user: session?.user ?? null,
        error: null 
      });

      if (session?.user) {
        const redirectTo = searchParams.get('redirectedFrom');
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, searchParams, handleError, updateState]);

  const signUp = async (email: string, password: string, userData: UserData) => {
    updateState({ error: null });
    
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (signUpError) {
        return { error: handleError(signUpError) };
      }

      if (!authData.user) {
        return { error: handleError(new AuthError('Failed to create user account')) };
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email,
          full_name: userData.full_name || '',
          phone: userData.phone || '',
          address: userData.address || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        return { error: handleError(new AuthError(profileError.message)) };
      }

      return { error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: handleError(error) };
      }
      return { error: handleError(new AuthError('An unexpected error occurred')) };
    }
  };

  const signIn = async (email: string, password: string) => {
    updateState({ error: null });
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        return { error: handleError(signInError) };
      }

      return { error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: handleError(error) };
      }
      return { error: handleError(new AuthError('An unexpected error occurred')) };
    }
  };

  const signOut = async () => {
    updateState({ error: null });
    
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        handleError(signOutError);
        throw signOutError;
      }
      
      router.push('/');
    } catch (error) {
      if (error instanceof AuthError) {
        handleError(error);
        throw error;
      }
      const authError = new AuthError('Failed to sign out');
      handleError(authError);
      throw authError;
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 