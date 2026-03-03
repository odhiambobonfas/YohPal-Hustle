"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/myjobs", label: "Jobs" },
  { href: "/notifications", label: "Alerts" },
  { href: "/edit-profile", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-50 shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
      <div className="flex max-w-lg mx-auto">
        {navItems.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex items-center justify-center py-4 text-[12px] font-medium transition-all border-t-2 ${
                active
                  ? "text-[#94041d] border-[#94041d] font-semibold"
                  : "text-gray-400 dark:text-gray-500 border-transparent"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
