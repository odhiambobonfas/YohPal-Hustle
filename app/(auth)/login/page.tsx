"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authenticateEmailAndPassword } from "@/services/client/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromQuery,
      }));
    }
  }, [searchParams]);

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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authenticateEmailAndPassword(
        formData.email,
        formData.password
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
          "An error occurred during login. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-fg uppercase tracking-tight">
          Welcome Back
        </h2>
        <p className="text-fg-secondary text-sm mt-1 font-medium">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-700 dark:text-red-400 font-bold">{error}</p>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-fg uppercase">
            Email address
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-fg uppercase">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors pr-12"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-brand transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand hover:bg-brand-dark text-white font-black py-4 rounded-[10px] border border-brand active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 uppercase mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
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
        <Link
          href="/forgot-password"
          className="text-xs font-bold text-brand hover:underline underline-offset-2"
        >
          Forgot password?
        </Link>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-fg-secondary font-medium">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-brand font-black hover:underline underline-offset-4"
          >
            REGISTER
          </Link>
        </p>
      </div>
    </div>
  );
}
