"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => {},
});

export const useAuthLoading = () => useContext(LoadingContext);

function LoadingOverlay({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const { status } = useSession();

    // Reset loading overlay whenever the route changes
    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    // Reset loading overlay when auth session status resolves
    useEffect(() => {
        if (status !== "loading") {
            setIsLoading(false);
        }
    }, [status]);

    // Reset loading overlay when navigating back/forward (browser bfcache restoration)
    useEffect(() => {
        const handlePageShow = () => {
            setIsLoading(false);
        };

        window.addEventListener("pageshow", handlePageShow);
        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}
        </LoadingContext.Provider>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <LoadingOverlay>{children}</LoadingOverlay>
            </ThemeProvider>
        </SessionProvider>
    );
}
