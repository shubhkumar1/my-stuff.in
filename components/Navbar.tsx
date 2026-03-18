"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    // Hide on admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 h-16 flex items-center justify-between">
                
                {/* Mobile Menu Button (Left Side) */}
                <div className="md:hidden flex flex-1 justify-start">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-text-secondary hover:text-primary transition"
                        aria-label="Open Menu"
                    >
                        <FaBars className="text-xl" />
                    </button>
                </div>

                {/* Logo (Center on mobile, Left on desktop) */}
                <div className="flex flex-1 md:flex-none justify-center md:justify-start">
                    <Link
                        href="/"
                        className="text-xl font-serif font-bold text-foreground hover:text-primary transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        my-stuff<span className="text-primary">.in</span>
                    </Link>
                </div>

                {/* Right empty space for mobile center alignment */}
                <div className="md:hidden flex flex-1 justify-end"></div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Navigation Links */}
                    <div className="flex items-center gap-4 mr-2">
                        <Link href="/explore" className="text-sm font-medium text-text-secondary hover:text-primary transition">
                            Explore Blogs
                        </Link>
                    </div>

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-border transition text-text-secondary"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>
                    )}

                    {/* Auth Actions */}
                    {session ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {session.user?.image ? (
                                    <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full border border-border object-cover" />
                                ) : (
                                    <FaUserCircle className="text-2xl text-text-secondary" />
                                )}
                                <span className="text-sm font-medium text-foreground">{session.user?.name?.split(' ')[0]}</span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => signIn("google")}
                                className="font-medium text-text-secondary hover:text-primary transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => signIn("google")}
                                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition shadow-sm shadow-primary/30"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed top-0 left-0 w-screen h-[100dvh] bg-black/60 dark:bg-black/80 z-40 md:hidden backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-[100dvh] w-3/4 max-w-sm bg-background border-r border-border z-50 md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <span className="text-lg font-serif font-bold text-foreground">Menu</span>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="p-2 text-text-secondary hover:text-primary transition rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>

                            <div className="flex flex-col p-6 overflow-y-auto flex-1 h-full">
                                {/* Top Section */}
                                <div>
                                    <Link 
                                        href="/explore" 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-text-secondary hover:text-primary transition block py-2"
                                    >
                                        Explore Blogs
                                    </Link>
                                </div>
                                
                                {/* Bottom Section */}
                                <div className="flex flex-col gap-6 mt-auto pt-6">
                                    <div className="h-px bg-border"></div>

                                    {/* Theme Toggle */}
                                {mounted && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-medium text-text-secondary">Theme</span>
                                        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-border">
                                            <button
                                                onClick={() => setTheme("light")}
                                                className={`p-2 rounded-full transition ${theme === "light" ? "bg-background shadow-sm text-primary" : "text-text-secondary hover:text-foreground"}`}
                                                aria-label="Light Theme"
                                            >
                                                <FaSun />
                                            </button>
                                            <button
                                                onClick={() => setTheme("dark")}
                                                className={`p-2 rounded-full transition ${theme === "dark" ? "bg-background shadow-sm text-primary" : "text-text-secondary hover:text-foreground"}`}
                                                aria-label="Dark Theme"
                                            >
                                                <FaMoon />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="h-px bg-border my-2"></div>

                                {/* Auth Actions */}
                                {session ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-border overflow-hidden">
                                            {session.user?.image ? (
                                                <img src={session.user.image} alt={session.user.name || "User"} className="w-10 h-10 rounded-full border border-border object-cover flex-shrink-0" />
                                            ) : (
                                                <FaUserCircle className="text-4xl text-text-secondary flex-shrink-0" />
                                            )}
                                            <div className="flex flex-col overflow-hidden min-w-0">
                                                <span className="text-sm font-medium text-foreground truncate block">{session.user?.name}</span>
                                                <span className="text-xs text-text-secondary truncate block">{session.user?.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition w-full"
                                        >
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <button
                                            onClick={() => signIn("google")}
                                            className="w-full py-3 border border-border rounded-lg font-medium text-text-secondary hover:text-primary hover:border-primary transition"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => signIn("google")}
                                            className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition shadow-sm shadow-primary/30"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
