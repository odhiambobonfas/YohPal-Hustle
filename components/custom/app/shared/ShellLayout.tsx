"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useLocationCity } from "@/hooks/useLocationCity";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { city, loading: locationLoading } = useLocationCity();
  const { initials, displayName, photoURL } = useCurrentUser();
  const { t } = useLanguage();

  const PAGE_TITLES: Record<string, string> = {
    "/dashboard":        t('nav.dashboard'),
    "/myjobs":           t('nav.myJobs'),
    "/notifications":    t('nav.notifications'),
    "/workhistory":      t('nav.workHistory'),
    "/badges":           t('nav.badges'),
    "/reviews":          t('nav.reviews'),
    "/edit-profile":     t('nav.editProfile'),
    "/about":            t('nav.about'),
    "/help-and-support": t('nav.helpAndSupport'),
    "/settings":         t('nav.settings'),
  };

  const title = PAGE_TITLES[pathname] ?? "YohPal Hustle";

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
          <div className="w-full max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
