"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaExternalLinkAlt } from "react-icons/fa";

const AdminNavbar = () => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="sticky top-0 z-40 w-full bg-card border-b border-border shadow-sm mb-8">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo / Title */}
                <Link
                    href="/admin"
                    className="text-xl font-serif font-bold text-foreground flex items-center gap-2"
                >
                    <span className="text-primary">Admin</span> Dashboard
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition"
                    >
                        View Site <FaExternalLinkAlt className="text-xs" />
                    </Link>

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
                    <div className="flex items-center gap-4 pl-4 border-l border-border">
                        <div className="hidden md:flex items-center gap-2">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full border border-border" />
                            ) : (
                                <FaUserCircle className="text-2xl text-text-secondary" />
                            )}
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                            title="Logout"
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
