'use client';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { initializeApiClient } from '@/lib/apiClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize API client on mount
    initializeApiClient();

    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // This would check localStorage for tokens
        const stored = localStorage.getItem('auth-store');
        if (stored) {
          const auth = JSON.parse(stored);
          if (auth.state?.accessToken) {
            useAuthStore.getState().setTokens(auth.state.accessToken, auth.state.refreshToken);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
