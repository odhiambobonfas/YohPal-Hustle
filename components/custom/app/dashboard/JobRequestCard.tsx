"use client";

import { MapPin, Clock, ChevronRight, Wrench, Zap, Sparkles, Hammer, Paintbrush, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
}

const skillIcons: Record<string, SkillConfig> = {
  Plumbing:    { icon: Wrench,      color: "text-blue-600",   bg: "bg-blue-50" },
  Electrical:  { icon: Zap,         color: "text-yellow-600", bg: "bg-yellow-50" },
  Cleaning:    { icon: Sparkles,    color: "text-green-600",  bg: "bg-green-50" },
  Carpentry:   { icon: Hammer,      color: "text-amber-700",  bg: "bg-amber-50" },
  Painting:    { icon: Paintbrush,  color: "text-pink-600",   bg: "bg-pink-50" },
  Security:    { icon: ShieldCheck, color: "text-slate-600",  bg: "bg-slate-100" },
  Default:     { icon: Wrench,      color: "text-orange-600", bg: "bg-orange-50" },
};

interface JobRequestCardProps {
  jobId: string;
  jobName: string;
  clientName: string;
  location: string;
  time: string;
  amount: number;
  currency?: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  skill: string;
  onAccept?: (jobId: string) => void;
  onReject?: (jobId: string) => void;
}

export default function JobRequestCard({
  jobId,
  jobName,
  clientName,
  location,
  time,
  amount,
  currency = "KES",
  status,
  skill,
  onAccept,
  onReject,
}: JobRequestCardProps) {
  const config: SkillConfig = skillIcons[skill] ?? skillIcons.Default;
  const SkillIcon = config.icon;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Skill icon */}
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bg}`}
        >
          <SkillIcon size={19} className={config.color} />
        </div>

        {/* Job info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-800 text-[14px] leading-snug">
              {jobName}
            </h3>
            <span className="text-[#94041d] font-bold text-[13px] whitespace-nowrap">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">{clientName}</p>

          {/* Location + Time */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <MapPin size={11} className="flex-shrink-0" />
              {location}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock size={11} className="flex-shrink-0" />
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons or status badge */}
      {status === "pending" && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={() => onAccept?.(jobId)}
            className="flex-1 py-2.5 rounded-xl bg-[#94041d] text-white text-sm font-semibold hover:bg-[#7a0318] active:scale-95 transition-all"
          >
            Accept
          </button>
          <button
            onClick={() => onReject?.(jobId)}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-500 text-sm font-semibold hover:bg-gray-200 active:scale-95 transition-all"
          >
            Decline
          </button>
        </div>
      )}

      {status === "accepted" && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-[12px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-semibold">
            ✓ Accepted
          </span>
          <button className="flex items-center text-[12px] text-[#94041d] font-semibold gap-0.5 hover:opacity-75 transition-opacity">
            View Details <ChevronRight size={13} />
          </button>
        </div>
      )}

      {status === "rejected" && (
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
          <span className="text-[12px] bg-red-50 text-red-500 px-3 py-1 rounded-full font-semibold">
            ✕ Declined
          </span>
        </div>
      )}

      {status === "completed" && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-[12px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold">
            ✓ Completed
          </span>
          <button className="flex items-center text-[12px] text-[#94041d] font-semibold gap-0.5 hover:opacity-75 transition-opacity">
            Leave Review <ChevronRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
