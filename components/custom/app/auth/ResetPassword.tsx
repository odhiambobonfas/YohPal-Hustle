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
    <div className="max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">Reset your password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="text-sm font-bold text-black uppercase">
            Email address
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
            placeholder="you@example.com"
          />
        </label>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f44236] hover:bg-black text-white font-black py-3 rounded-[10px] border border-[#f44236] transition-all duration-100 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Sending…" : "Send reset email"}
          </button>
        </div>
      </form>

      {message && <p className="mt-3 text-green-600">{message}</p>}
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
}
