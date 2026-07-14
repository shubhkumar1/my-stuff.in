"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock submission
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <div className="p-4 rounded-xl bg-[#5DCAA5]/10 border border-[#5DCAA5]/20 text-center">
          <p className="text-white font-semibold">🎉 Thanks for joining!</p>
          <p className="text-slate-300 text-sm mt-1">We've sent a welcome email to your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-5 py-3 rounded-xl bg-[#0B132B] border border-[#2A3454] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5DCAA5]/50 transition-all"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#5DCAA5] hover:bg-[#7ED6B7] text-[#0B132B] font-bold rounded-xl transition-all shadow-md shadow-[#5DCAA5]/20 whitespace-nowrap"
          >
            Join Free
          </button>
        </form>
      )}
    </div>
  );
}
