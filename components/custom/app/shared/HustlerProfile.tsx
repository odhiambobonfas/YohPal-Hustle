"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Star,
  Briefcase,
  Award,
  MessageSquarePlus,
  X,
} from "lucide-react";

interface ActivityItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
}

interface HustlerProfileProps {
  username?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  initials?: string;
  hustlerModeEnabled?: boolean;
  onClose?: () => void;
  onHustlerModeToggle?: (val: boolean) => void;
}

const HustlerProfile: React.FC<HustlerProfileProps> = ({
  username = "Hustler",
  rating = 0.0,
  reviewCount = 0,
  location = "Nairobi Central",
  initials = "YH",
  hustlerModeEnabled = false,
  onClose,
  onHustlerModeToggle,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "editProfile">(
    "dashboard",
  );
  const [clientMode, setHustlerMode] = useState(hustlerModeEnabled);

  const activityItems: ActivityItem[] = [
    {
      id: "reviews",
      label: "My Reviews",
      href: "/reviews",
      icon: <MessageSquarePlus size={20} color="#f5c542" />,
      iconBg: "bg-yellow-900",
    },
    {
      id: "workHistory",
      label: "Work History",
      href: "/workhistory",
      icon: <Briefcase size={20} color="#60a5fa" />,
      iconBg: "bg-blue-900",
    },
    {
      id: "badges",
      label: "Badges",
      href: "/badges",
      icon: <Award size={20} color="#a855f7" />,
      iconBg: "bg-purple-900",
    },
  ];

  const handleToggle = () => {
    const next = !clientMode;
    setHustlerMode(next);
    onHustlerModeToggle?.(next);
    if (next) {
      router.push("/hustle");
    }
  };

  return (
    <div className="min-h-screen bg-page text-fg font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card (Sheet) */}
        <div className="mx-4 mt-4 bg-surface rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-fg-muted hover:text-fg transition"
          >
            <X size={22} />
          </button>

          {/* Avatar initials */}
          <div className="flex flex-col items-center pt-6 pb-2">
            <div className="w-20 h-20 rounded-full border-4 border-brand/40 shadow-lg bg-surface flex items-center justify-center text-brand font-black text-2xl">
              {initials}
            </div>

            {/* Name + Rating */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg font-semibold text-fg">{username}</span>
              <div className="flex items-center gap-1 text-sm text-fg-muted">
                <Star
                  size={14}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                <span>{rating.toFixed(1)}</span>
                <span>
                  (
                  {reviewCount === 0
                    ? "No reviews yet"
                    : `${reviewCount} reviews`}
                  )
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mx-4 mt-3 border border-rim rounded-xl overflow-hidden">
            {(["dashboard", "editProfile"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "dashboard") router.push("/dashboard");
                  if (tab === "editProfile") router.push("/edit-profile");
                }}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-surface-alt text-fg"
                    : "bg-transparent text-fg-secondary hover:text-fg"
                }`}
              >
                {tab === "dashboard" ? "Dashboard" : "Edit Profile"}
              </button>
            ))}
          </div>

          {/* Activity Section */}
          <div className="px-4 mt-5">
            <p className="text-xs font-bold text-fg-muted tracking-widest uppercase mb-3">
              Activity
            </p>
            <div className="flex flex-col gap-3">
              {activityItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className="flex items-center justify-between bg-surface-alt rounded-xl px-4 py-4 hover:bg-rim transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-fg">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-fg-muted" />
                </button>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="px-4 mt-6 pb-6">
            <p className="text-xs font-bold text-fg-muted tracking-widest uppercase mb-3">
              Settings
            </p>
            <div className="flex items-center justify-between bg-surface-alt rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rim flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-fg">
                  Hustler Mode
                </span>
              </div>
              {/* Toggle */}
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  clientMode ? "bg-brand" : "bg-gray-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    clientMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Settings link */}
            <button
              onClick={() => router.push("/settings")}
              className="mt-3 flex items-center justify-between w-full bg-surface-alt rounded-xl px-4 py-4 hover:bg-rim transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rim flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-fg">Settings</span>
              </div>
              <ChevronRight size={16} className="text-fg-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HustlerProfile;
