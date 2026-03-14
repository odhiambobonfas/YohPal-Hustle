"use client";

import HustlerProfile from "@/components/custom/app/hustler/HustlerProfile";
import HustlerSkills from "@/components/custom/app/hustler/HustlerSkills";
import HustlerBio from "@/components/custom/app/hustler/HustlerBio";

export default function HustlerProfilePage() {
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

      {/* Hustler Profile Card */}
      <HustlerProfile
        name="Sarah Johnson"
        location="Nairobi Central, Kenya"
        phone="+254 700 123 456"
        email="sarah.johnson@email.com"
        initials="SJ"
        isActive={true}
      />

      {/* Profile Summary */}
      <HustlerBio
        bio="Passionate and skilled hustler with a proven track record of delivering quality work. Committed to excellence and customer satisfaction. Available for web development, mobile apps, and UI/UX design projects."
        onSave={(bio) => console.log("Bio saved:", bio)}
      />

      {/* Skills */}
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
    </div>
  );
}
