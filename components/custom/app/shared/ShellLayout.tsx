"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useLocationCity } from "@/hooks/useLocationCity";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/myjobs": "My Jobs",
  "/notifications": "Notifications",
  "/workhistory": "Work History",
  "/badges": "Badges",
  "/reviews": "Reviews",
  "/edit-profile": "Edit Profile",
  "/help-and-support": "Help & Support",
  "/settings": "Settings",
};

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "YohPal Hustle";
  const { city, loading: locationLoading } = useLocationCity();
  const { initials, displayName, photoURL } = useCurrentUser();

  return (
    <div className="min-h-screen bg-page">
      {/* Sidebar — crimson header + semantic nav panel */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userInitials={initials}
        userName={displayName}
        userImage={photoURL}
      />

      {/* Main area — offset by sidebar on lg+ */}
      <div className="lg:pl-56 flex flex-col min-h-screen">
        {/* Sticky crimson top bar */}
        <TopNavbar
          title={title}
          location={city}
          locationLoading={locationLoading}
          notificationCount={0}
          userInitials={initials}
          userImage={photoURL}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content — centred & max-width capped for large screens */}
        <main className="flex-1 overflow-x-hidden">
          <div className="w-full max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
