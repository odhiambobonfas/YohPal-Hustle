"use client";

import React, { useState } from "react";
import { sendPasswordReset } from "@/services/client/password-reset";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    const res = await sendPasswordReset(email.trim());
    setLoading(false);
    if (res.success) {
      setMessage(res.message);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md w-full bg-surface border border-rim rounded-[10px] p-8">
      <h2 className="text-lg font-semibold mb-4 text-fg">Reset your password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="text-sm font-bold text-fg uppercase">
            Email address
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
            placeholder="you@example.com"
          />
        </label>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-black py-3 rounded-[10px] border border-brand transition-all duration-100 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Sending…" : "Send reset email"}
          </button>
        </div>
      </form>

      {message && <p className="mt-3 text-green-600 dark:text-green-400">{message}</p>}
      {error && <p className="mt-3 text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
