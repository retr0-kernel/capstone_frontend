// src/providers/AuthProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1,
            refetchOnMount: true,
        },
        mutations: {
            retry: 1,
        },
    },
});

interface AuthProviderProps {
    children: ReactNode;
}



export function AuthProvider({ children }: AuthProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}