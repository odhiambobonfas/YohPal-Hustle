"use client";

import Link from "next/link";
import Image from "next/image";
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
  { href: "/profile",         icon: User,            label: "Profile" },
  { href: "/about",           icon: Info,            label: "About" },
  { href: "/help-and-support",icon: HelpCircle,      label: "Help & Support" },
  { href: "/settings",        icon: Settings,        label: "Settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userInitials?: string;
  userName?: string;
  userImage?: string | null;
}

export default function Sidebar({ isOpen = false, onClose, userInitials = "YH", userName, userImage }: SidebarProps) {
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
          fixed inset-y-0 left-0 z-50 w-60 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-56
        `}
      >
        {/* ── CRIMSON HEADER ─────────────────────────────────── */}
        <div
          className="relative px-5 pt-5 pb-4 overflow-hidden flex-shrink-0 bg-sidebar-gradient"
        >
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:hidden"
          >
            <X size={15} className="text-white" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-brand font-black text-[14px] shadow-lg mb-3 overflow-hidden">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName ?? "Profile"}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span>{userInitials}</span>
            )}
          </div>

          {/* Big title */}
          <h1 className="text-[20px] font-black text-white leading-none tracking-tight">
            Hustle
          </h1>

          {/* Welcome + tagline */}
          <p className="text-white/70 text-[11px] font-medium mt-1">
            {userName ? `Hey, ${userName.split(" ")[0]} 👋` : "Welcome back 👋"}
          </p>
          <p className="text-white/50 text-[11px] mt-0.5 leading-snug">
            Filled with professional skills
          </p>

          {/* Online badge */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-[11px] font-semibold">Available for work</span>
          </div>
        </div>

        {/* ── NAV PANEL ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-surface">
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : "text-fg-secondary hover:bg-surface-alt hover:text-fg"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-[12px] font-medium">{label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom version tag */}
          <div className="px-5 py-3 border-t border-rim">
            <p className="text-[11px] text-fg-muted">YohPal Hustle v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
