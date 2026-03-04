"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authenticateEmailAndPassword } from "@/services/client/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authenticateEmailAndPassword(
        formData.email,
        formData.password,
      );

      if (response.success) {
        console.log("Login successful:", response.data);
        // Redirect to dashboard or home after successful login
        router.push("/dashboard");
      } else {
        setError(response.message || "Invalid email or password");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error?.message ||
          "An error occurred during login. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-700 font-bold">{error}</p>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-black uppercase">
            Email address
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-black uppercase">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-[#f44236] hover:underline underline-offset-2"
            >
              FORGOT?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors pr-12"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f44236] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#f44236] hover:bg-black text-white font-black py-4 rounded-[10px] border border-[#f44236] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 uppercase mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-black font-medium">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#f44236] font-black hover:underline underline-offset-4"
          >
            REGISTER
          </Link>
        </p>
      </div>
    </div>
  );
}
