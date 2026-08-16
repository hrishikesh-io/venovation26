import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'venovation26_admin_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      // 1. Check Supabase auth if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              email: session.user.email || 'admin@venovation.org',
              role: 'superadmin',
              name: session.user.user_metadata?.name || 'Administrator',
            });
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Supabase auth session check error:', e);
        }
      }

      // 2. Fallback to persisted demo session
      const savedUser = localStorage.getItem(ADMIN_SESSION_KEY);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      }
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // 1. Try Supabase Auth first
    if (isSupabaseConfigured && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const adminUser: AdminUser = {
            email: data.user.email || email,
            role: 'superadmin',
            name: data.user.user_metadata?.name || 'Fest Administrator',
          };
          setUser(adminUser);
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn('Supabase login exception:', err);
      }
    }

    // 2. Fallback / Demo Credentials
    // Default demo credentials: admin@venovation26.com / venovation2026 or any valid email
    if (
      (email === 'admin@venovation26.com' && password === 'venovation2026') ||
      (email === 'admin@fest.edu' && password === 'admin123') ||
      password === 'venovation2026'
    ) {
      const demoUser: AdminUser = {
        email: email,
        role: 'superadmin',
        name: 'Head Coordinator',
      };
      setUser(demoUser);
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(demoUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid email or password. Use demo credentials: admin@venovation26.com / venovation2026',
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout error:', e);
      }
    }
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
