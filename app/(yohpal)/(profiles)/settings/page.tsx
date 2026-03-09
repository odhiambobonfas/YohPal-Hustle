"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Bell, Shield, Globe, Sun, Moon, LogOut } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "@/services/server/firebase";
import { useTheme } from "@/providers/ThemeProvider";

const SETTINGS_ITEMS = [
  { id: "notifications", label: "Notifications",    icon: Bell,    href: null },
  { id: "privacy",       label: "Privacy & Security",icon: Shield,  href: null },
  { id: "language",      label: "Language & Region", icon: Globe,   href: null },
  { id: "appearance",    label: "Appearance",         icon: Moon,    href: null },
];

export default function SettingsPage() {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    if (typeof window !== "undefined") localStorage.removeItem("auth_token");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-page text-fg pb-24">
      <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-alt hover:bg-rim transition">
          <ArrowLeft size={16} className="text-fg" />
        </button>
        <h1 className="text-[17px] font-bold text-fg">Settings</h1>
      </div>

      {/* Settings list */}
      <div className="mx-5 flex flex-col gap-2">
        {SETTINGS_ITEMS.filter((i) => i.id !== "appearance").map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-surface-alt transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
                <Icon size={15} className="text-fg-secondary" />
              </div>
              <span className="text-[13px] font-medium text-fg">{label}</span>
            </div>
            <ChevronRight size={14} className="text-fg-muted" />
          </button>
        ))}
        {/* Appearance — theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-surface-alt transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
              {resolvedTheme === "dark" ? (
                <Sun size={15} className="text-yellow-400" />
              ) : (
                <Moon size={15} className="text-gray-500" />
              )}
            </div>
            <span className="text-[13px] font-medium text-fg">Appearance</span>
          </div>
          <span className="text-xs font-semibold text-fg-muted capitalize">{resolvedTheme}</span>
        </button>
      </div>

      {/* Logout */}
      <div className="mx-5 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[13px] font-semibold rounded-2xl py-3 transition"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
      </div>
    </div>
  );
}
