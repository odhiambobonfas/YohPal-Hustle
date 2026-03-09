"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  verifyPasswordReset,
  confirmNewPassword,
} from "@/services/client/password-reset";

export default function ConfirmResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code =
      searchParams.get("oobCode") || searchParams.get("oobcode") || null;
    setOobCode(code);
    if (code) {
      (async () => {
        const res = await verifyPasswordReset(code);
        if (res.success) {
          const emailVal = res.email || null;
          setEmail(emailVal);
          setVerifiedEmail(emailVal);
        } else {
          setError(res.message || "Invalid or expired code.");
        }
      })();
    } else {
      setError("Missing password reset code.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!oobCode) return setError("Missing reset code.");
    if (newPassword.length < 6)
      return setError("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);
    const res = await confirmNewPassword(oobCode, newPassword);
    setLoading(false);
    if (res.success) {
      setMessage(res.message);
      const emailToPass = verifiedEmail || email || "";
      console.log(
        "Password reset successful. Redirecting to login with email:",
        emailToPass
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">Set a new password</h2>

      {email && (
        <p className="text-sm mb-3">
          Resetting password for <strong>{email}</strong>
        </p>
      )}
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="text-sm font-bold text-black uppercase">
            New password
          </span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-black uppercase">
            Confirm password
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
          />
        </label>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f44236] hover:bg-black text-white font-black py-3 rounded-[10px] border border-[#f44236] transition-all duration-100 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Updating…" : "Set new password"}
          </button>
        </div>
      </form>
    </div>
  );
}
