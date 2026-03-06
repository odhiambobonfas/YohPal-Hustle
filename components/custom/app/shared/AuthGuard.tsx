"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Loader2 } from "lucide-react";

/**
 * AuthGuard
 * ─────────────────────────────────────────────────────────
 * Wraps protected routes. Redirects unauthenticated visitors
 * to /login while Firebase resolves the auth state.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // While Firebase is resolving auth state, show a full-screen spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated – render nothing (redirect in progress)
  if (!user) return null;

  return <>{children}</>;
}
