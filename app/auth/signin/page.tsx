"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { Suspense } from "react";

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-8 text-center">
                    <div className="inline-block p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to access your account</p>

                    <button
                        onClick={() => signIn("google", { callbackUrl })}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200"
                    >
                        <FaGoogle className="text-red-500 text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="mt-8 text-xs text-gray-400">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-950 p-4 text-center border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500">Just visiting? <a href="/" className="text-teal-600 font-medium hover:underline">Go Home</a></p>
                </div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}
