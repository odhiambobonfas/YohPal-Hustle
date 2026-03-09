"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, CheckCircle2, XCircle, Clock } from "lucide-react";

const TABS = ["All", "Completed", "Cancelled"] as const;
type Tab = typeof TABS[number];

import { useState } from "react";

export default function WorkHistoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("All");

  return (
    <div className="min-h-screen bg-page text-fg pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-alt hover:bg-rim transition">
          <ArrowLeft size={18} className="text-fg" />
        </button>
        <h1 className="text-xl font-bold text-fg">Work History</h1>
      </div>

      {/* Stats row */}
      <div className="mx-5 grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Jobs",  value: "0", icon: <Briefcase size={16} className="text-blue-400" /> },
          { label: "Completed",   value: "0", icon: <CheckCircle2 size={16} className="text-green-400" /> },
          { label: "Cancelled",   value: "0", icon: <XCircle size={16} className="text-red-400" /> },
        ].map((s) => (
          <div key={s.label} className="bg-surface rounded-2xl px-3 py-4 flex flex-col items-center gap-1">
            {s.icon}
            <span className="text-[18px] font-black text-fg">{s.value}</span>
            <span className="text-[11px] text-fg-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="mx-5 flex gap-2 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              activeTab === tab ? "bg-brand text-white" : "bg-surface-alt text-fg-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="mx-5 flex flex-col items-center gap-3 py-12 text-center">
        <Clock size={40} className="text-fg-muted" />
          <p className="text-fg-secondary text-[13px] max-w-xs">
          No jobs found. Accept your first job request from the dashboard to build your history.
        </p>
      </div>
    </div>
  );
}
