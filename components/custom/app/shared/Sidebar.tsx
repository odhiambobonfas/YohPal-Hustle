"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Briefcase,
  History,
  Award,
  MessageSquare,
  Bell,
  Settings,
  User,
  Info,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { href: "/dashboard",       icon: LayoutDashboard, label: "Dashboard" },
  { href: "/myjobs",          icon: Briefcase,       label: "My Jobs" },
  { href: "/notifications",   icon: Bell,            label: "Notifications" },
  { href: "/workhistory",     icon: History,         label: "Work History" },
  { href: "/badges",          icon: Award,           label: "Badges" },
  { href: "/reviews",         icon: MessageSquare,   label: "Reviews" },
  { href: "/edit-profile",    icon: User,            label: "Profile" },
  { href: "/about",           icon: Info,            label: "About" },
  { href: "/help-and-support",icon: HelpCircle,      label: "Help & Support" },
  { href: "/settings",        icon: Settings,        label: "Settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-64
        `}
      >
        {/* ── CRIMSON HEADER ─────────────────────────────────── */}
        <div
          className="relative px-6 pt-8 pb-6 overflow-hidden flex-shrink-0"
          style={{ background: "linear-gradient(160deg, #6a0015 0%, #94041d 55%, #b5052a 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:hidden"
          >
            <X size={15} className="text-white" />
          </button>

          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#94041d] font-black text-[18px] shadow-lg mb-4">
            YH
          </div>

          {/* Big title */}
          <h1 className="text-[28px] font-black text-white leading-none tracking-tight">
            Hustle
          </h1>

          {/* Welcome + tagline */}
          <p className="text-white/70 text-[12px] font-medium mt-1.5">Welcome back 👋</p>
          <p className="text-white/50 text-[11px] mt-0.5 leading-snug">
            Filled with professional skills
          </p>

          {/* Online badge */}
          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-[11px] font-semibold">Available for work</span>
          </div>
        </div>

        {/* ── NAV PANEL (white / dark-aware) ─────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#94041d] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[13px] font-medium">{label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom version tag */}
          <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[11px] text-gray-400 dark:text-gray-600">YohPal Hustle v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
