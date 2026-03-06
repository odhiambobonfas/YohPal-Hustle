"use client";

import { useRouter } from "next/navigation";
import { Award, ArrowLeft, Lock } from "lucide-react";

const ALL_BADGES = [
  { id: "first_job",   label: "First Job",       desc: "Complete your first hustle",        color: "#f5c542", earned: false },
  { id: "top_rated",   label: "Top Rated",        desc: "Maintain a 4.5+ rating",            color: "#60a5fa", earned: false },
  { id: "speed_demon", label: "Speed Demon",      desc: "Complete a job in under 1 hour",    color: "#f87171", earned: false },
  { id: "reliable",   label: "Reliable",          desc: "Zero cancellations for 30 days",   color: "#34d399", earned: false },
  { id: "century",    label: "Century",           desc: "Complete 100 jobs",                 color: "#a855f7", earned: false },
  { id: "veteran",    label: "Veteran",           desc: "1 year on the platform",            color: "#fb923c", earned: false },
];

export default function BadgesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-page text-fg pb-24">
      <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-alt hover:bg-rim transition">
          <ArrowLeft size={18} className="text-fg" />
        </button>
        <h1 className="text-xl font-bold text-fg">Badges</h1>
      </div>

      {/* Empty state */}
      <div className="mx-5 mb-6 bg-surface rounded-2xl px-5 py-6 flex flex-col items-center text-center gap-2">
        <Award size={36} className="text-fg-muted" />
        <p className="text-fg-secondary text-sm">Complete hustles to unlock badges and showcase your achievements.</p>
      </div>

      {/* Badge grid */}
      <div className="px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {ALL_BADGES.map((badge) => (
          <div
            key={badge.id}
            className="bg-surface rounded-2xl p-4 flex flex-col items-center gap-2 border border-rim"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: badge.earned ? badge.color + "22" : "#27272a" }}
            >
              {badge.earned ? (
                <Award size={28} style={{ color: badge.color }} />
              ) : (
                <Lock size={22} className="text-gray-400 dark:text-zinc-600" />
              )}
            </div>
            <p className="text-[13px] font-semibold text-center text-fg">{badge.label}</p>
            <p className="text-[11px] text-fg-secondary text-center leading-snug">{badge.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
