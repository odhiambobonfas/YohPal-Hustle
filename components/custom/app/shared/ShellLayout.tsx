"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useLocationCity } from "@/hooks/useLocationCity";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":        "Dashboard",
  "/myjobs":           "My Jobs",
  "/notifications":    "Notifications",
  "/workhistory":      "Work History",
  "/badges":           "Badges",
  "/reviews":          "Reviews",
  "/edit-profile":     "Edit Profile",
  "/about":            "About",
  "/help-and-support": "Help & Support",
  "/settings":         "Settings",
};

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "YohPal Hustle";
  const { city, loading: locationLoading } = useLocationCity();

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-gray-950">
      {/* Sidebar — crimson header + white/dark nav panel */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area — offset by sidebar on lg+ */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky crimson top bar */}
        <TopNavbar
          title={title}
          location={city}
          locationLoading={locationLoading}
          notificationCount={0}
          userInitials="YH"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
