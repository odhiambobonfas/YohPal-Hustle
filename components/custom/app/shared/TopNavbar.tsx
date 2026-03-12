"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Menu, ArrowLeft, MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/providers/LanguageProvider";

interface TopNavbarProps {
  title: string;
  location?: string | null;
  locationLoading?: boolean;
  showBack?: boolean;
  backHref?: string;
  notificationCount?: number;
  userInitials?: string;
  userImage?: string | null;
  onMenuClick?: () => void;
}

export default function TopNavbar({
  title,
  location,
  locationLoading = false,
  showBack = false,
  backHref = "/dashboard",
  notificationCount = 0,
  userInitials = "YH",
  userImage,
  onMenuClick,
}: TopNavbarProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  return (
    <header className="bg-brand sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-md">
      {/* Left — Back or Menu */}
      {showBack ? (
        <Link
          href={backHref}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={18} className="text-white" />
        </Link>
      ) : (
        <button
          onClick={onMenuClick}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Menu size={18} className="text-white" />
        </button>
      )}

      {/* Center — Location city or page title */}
      <div className="flex flex-col items-center min-w-0">
        {locationLoading ? (
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-white/50 flex-shrink-0" />
            <span className="text-[13px] text-white/50 font-medium animate-pulse">{t('common.locating')}…</span>
          </div>
        ) : location ? (
          <>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-white/70 flex-shrink-0" />
              <p className="text-[11px] text-white/70 font-medium leading-none">
                {t('common.yourLocation')}
              </p>
            </div>
            <p className="text-[14px] font-bold text-white mt-0.5 leading-none tracking-wide truncate max-w-[160px]">
              {location}
            </p>
          </>
        ) : (
          <h1 className="text-[15px] font-bold text-white tracking-wide">{title}</h1>
        )}
      </div>

      {/* Right — Language + Theme toggle + Notifications + Avatar */}
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          {resolvedTheme === "dark" ? (
            <Sun size={16} className="text-white/90" />
          ) : (
            <Moon size={16} className="text-white/90" />
          )}
        </button>
        <Link
          href="/notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Bell size={17} className="text-white" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-brand text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Link>

        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-brand font-bold text-[13px] hover:opacity-90 transition-opacity shadow-sm overflow-hidden"
        >
          {userImage ? (
            <Image
              src={userImage}
              alt="Profile"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <span>{userInitials}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
