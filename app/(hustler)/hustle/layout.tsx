"use client";

import { useState } from "react";
import Sidebar from "@/components/custom/app/shared/Sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HustleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // In a real app this data comes from an auth provider or context
  const userInitials = "SJ";
  const userName = "Sarah Johnson";

  return (
    <div className="min-h-screen bg-page text-fg flex font-sans">
      {/* Persistent Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userName={userName}
        userInitials={userInitials}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen transition-all">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-surface border-b border-rim px-4 lg:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-fg hover:bg-surface-alt rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <div className="font-['Sora'] font-bold text-lg lg:hidden">
              YohPal <span className="text-brand">Hustle</span>
            </div>
            <div className="hidden lg:block text-sm font-semibold text-fg-secondary">
              Dashboard
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Circular Profile Button representing logged in user */}
            <Link
              href="/hustle/profile"
              className="group relative w-10 h-10 rounded-full border-2 border-brand/20 overflow-hidden shadow-sm hover:ring-2 hover:ring-brand hover:border-brand transition-all flexitems-center justify-center bg-brand/5"
              title="Go to Profile"
            >
              <div className="absolute inset-0 flex items-center justify-center text-brand font-black text-sm group-hover:bg-brand/10 transition-colors">
                {userInitials}
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
