"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import HustlerProfile from "@/components/custom/app/hustler/HustlerProfile";
import HustlerSkills from "@/components/custom/app/hustler/HustlerSkills";
import HustlerBio from "@/components/custom/app/hustler/HustlerBio";

export default function HustlerDashboard() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/myjobs", icon: Briefcase, label: "Jobs" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/reviews", icon: MessageSquare, label: "Reviews" },
    { href: "/help-and-support", icon: HelpCircle, label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-page text-fg font-sans">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 bg-surface border-b border-rim">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 hover:opacity-80 transition flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-brand/10">
              <img
                src="/images/logo.jpg"
                alt="YohPal Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-['Sora'] font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-fg">
              YohPal <span className="text-brand">Hustle</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-black hover:text-black hover:bg-surface-alt transition font-medium text-sm"
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Menu - Visible only on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-surface-alt rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-rim bg-surface">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-black hover:text-black hover:bg-surface-alt transition font-medium text-sm w-full"
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Hustler Profile Card */}
        <HustlerProfile
          name="Sarah Johnson"
          location="Nairobi Central, Kenya"
          phone="+254 700 123 456"
          email="sarah.johnson@email.com"
          initials="SJ"
          isActive={true}
        />

        {/* Profile Summary */}
        <HustlerBio
          bio="Passionate and skilled hustler with a proven track record of delivering quality work. Committed to excellence and customer satisfaction. Available for web development, mobile apps, and UI/UX design projects."
          onSave={(bio) => console.log("Bio saved:", bio)}
        />

        {/* Skills */}
        <HustlerSkills
          skills={[
            "Web Development",
            "Mobile Apps",
            "UI/UX Design",
            "Frontend",
            "React",
          ]}
          onSave={(skills) => console.log("Skills saved:", skills)}
        />
      </div>
    </div>
  );
}
