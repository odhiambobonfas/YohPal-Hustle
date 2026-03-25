import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export default function HustleDashboardHome() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6">
      <div className="bg-surface rounded-2xl p-6 md:p-8 border border-rim shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-brand/10 rounded-xl text-brand">
            <Briefcase size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-fg tracking-tight">
              Welcome to YohPal Hustle
            </h1>
            <p className="text-sm font-medium text-fg-secondary">
              Connect, work, and grow your professional presence.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/hustle/profile"
            className="group flex flex-col justify-center p-6 bg-surface-alt rounded-xl border border-rim hover:border-brand/50 transition-all hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-fg group-hover:text-brand transition-colors flex items-center justify-between">
              Complete your Profile
              <ArrowRight
                size={18}
                className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform"
              />
            </h3>
            <p className="text-sm text-fg-secondary mt-1">
              Set up your skills, bio, and contact information to attract the
              best opportunities.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
