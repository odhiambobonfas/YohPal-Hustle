"use client";

import HustlerProfile from "@/components/custom/app/hustler/HustlerProfile";
import HustlerSkills from "@/components/custom/app/hustler/HustlerSkills";
import HustlerBio from "@/components/custom/app/hustler/HustlerBio";
import { ProfileResponse, HustlerProfileData } from "@/types/users";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserProfile } from "@/lib/api";
import { useState } from "react";
import { useEffect } from "react";

export default function HustlerProfilePage() {
  const [hustlerProfile, setProfile ] = useState<HustlerProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the current user and pass the data as props to the Hustler Profile Component
  const currentUser = useCurrentUser();
  const uid = currentUser.user?.uid;

  useEffect(() => {
    if (uid) {
      getUserProfile(uid)
        .then((response: ProfileResponse) => {
          setProfile(response.profile);
        })
        .catch((err) => console.error("Failed to load profile", err))
        .finally(() => setIsLoading(false));
    }
  }, [uid]);

  console.log("This is the data form profile/hustle", hustlerProfile);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6">
      <div className="mb-2 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-fg tracking-tight">
          Your Profile
        </h1>
        <p className="text-sm text-fg-secondary mt-1 max-w-2xl">
          Manage your public hustler profile, bio, and skills to stand out to
          clients looking for your expertise.
        </p>
      </div>

      {/* 2. FIX: The Type Guard. 
          TypeScript now knows hustlerProfile is NOT null inside this block. */}
          {hustlerProfile && <HustlerProfile hustlerProfile={hustlerProfile} />}

          <HustlerBio
            bio="Passionate and skilled hustler with a proven track record of delivering quality work. Committed to excellence and customer satisfaction. Available for web development, mobile apps, and UI/UX design projects."
            onSave={(bio) => console.log("Bio saved:", bio)}
          />

          <HustlerSkills
            skills={[
              "Web Development",
              "Mobile Apps",
              "UI/UX Design",
              "Frontend",
              "React",
            ]}
            onSave={(skills) => console.log("Skills saved:", skills)}
          />

      {/* 3. Handle the case where UID exists but no profile was found */}
      {!hustlerProfile && !isLoading && (
        <div className="p-6 border rounded-lg border-dashed">
          <p className="text-fg-secondary">No hustler profile found.</p>
        </div>
      )}
    </div>
  );
}
