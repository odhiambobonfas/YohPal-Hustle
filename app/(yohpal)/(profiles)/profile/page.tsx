"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLocationCity } from "@/hooks/useLocationCity";
import HustlerProfile from "@/components/custom/app/shared/HustlerProfile";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, initials, displayName, loading } = useCurrentUser();
  const { city } = useLocationCity();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <HustlerProfile
      username={displayName}
      initials={initials}
      location={city ?? "Your location"}
      rating={0}
      reviewCount={0}
      hustlerModeEnabled={false}
      onClose={() => router.back()}
    />
  );
}
