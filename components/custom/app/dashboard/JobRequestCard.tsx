"use client";

import { MapPin, Clock, ChevronRight, Wrench, Zap, Sparkles, Hammer, Paintbrush, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
}

const skillIcons: Record<string, SkillConfig> = {
  Plumbing:    { icon: Wrench,      color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-950/50" },
  Electrical:  { icon: Zap,         color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/50" },
  Cleaning:    { icon: Sparkles,    color: "text-green-600 dark:text-green-400",  bg: "bg-green-50 dark:bg-green-950/50" },
  Carpentry:   { icon: Hammer,      color: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-50 dark:bg-amber-950/50" },
  Painting:    { icon: Paintbrush,  color: "text-pink-600 dark:text-pink-400",   bg: "bg-pink-50 dark:bg-pink-950/50" },
  Security:    { icon: ShieldCheck, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-100 dark:bg-slate-800/50" },
  Default:     { icon: Wrench,      color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/50" },
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
    <div className="bg-surface rounded-2xl p-4 border border-rim shadow-sm">
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
            <h3 className="font-semibold text-fg text-[14px] leading-snug">
              {jobName}
            </h3>
            <span className="text-brand font-bold text-[13px] whitespace-nowrap">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-fg-muted mt-0.5">{clientName}</p>

          {/* Location + Time */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-fg-muted">
              <MapPin size={11} className="flex-shrink-0" />
              {location}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-fg-muted">
              <Clock size={11} className="flex-shrink-0" />
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons or status badge */}
      {status === "pending" && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-rim">
          <button
            onClick={() => onAccept?.(jobId)}
            className="flex-1 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark active:scale-95 transition-all"
          >
            Accept
          </button>
          <button
            onClick={() => onReject?.(jobId)}
            className="flex-1 py-2.5 rounded-xl bg-surface-alt text-fg-secondary text-sm font-semibold hover:bg-rim active:scale-95 transition-all"
          >
            Decline
          </button>
        </div>
      )}

      {status === "accepted" && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-rim">
          <span className="text-[12px] bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 px-3 py-1 rounded-full font-semibold">
            ✓ Accepted
          </span>
          <button className="flex items-center text-[12px] text-brand font-semibold gap-0.5 hover:opacity-75 transition-opacity">
            View Details <ChevronRight size={13} />
          </button>
        </div>
      )}

      {status === "rejected" && (
        <div className="flex items-center mt-3 pt-3 border-t border-rim">
          <span className="text-[12px] bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400 px-3 py-1 rounded-full font-semibold">
            ✕ Declined
          </span>
        </div>
      )}

      {status === "completed" && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-rim">
          <span className="text-[12px] bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-semibold">
            ✓ Completed
          </span>
          <button className="flex items-center text-[12px] text-brand font-semibold gap-0.5 hover:opacity-75 transition-opacity">
            Leave Review <ChevronRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
