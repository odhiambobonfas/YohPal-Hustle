"use client";

import { useState, useRef } from "react";
import { ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
// import { submitPostJob } from "@/services/client/hustle"; // wire up with auth token
// import type { PostJobPayload } from "@/types/actions/hustle.types";

// ─── Description starters ─────────────────────────────────────────────────────
const DESCRIPTION_SUGGESTIONS = [
  "I need someone to help with",
  "Looking for an experienced",
  "Need urgent help with",
  "Hiring someone for a short-term job in",
  "Hiring someone for a long-term job in",
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface HustlePostJobProps {
  selectedRole: string;
  onBack: () => void;
}

// ─── Duration helper ──────────────────────────────────────────────────────────
function calcDuration(start: string, end: string): string | null {
  if (!start || !end) return null;
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms <= 0) return null;
  const mins = Math.floor(ms / 60_000);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hrs < 24) return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs} hr${hrs !== 1 ? "s" : ""}`;
  const days = Math.floor(hrs / 24);
  const remHrs = hrs % 24;
  return remHrs > 0 ? `${days}d ${remHrs}h` : `${days} day${days !== 1 ? "s" : ""}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HustlePostJob({ selectedRole, onBack }: HustlePostJobProps) {
  const [jobTitle, setJobTitle] = useState(selectedRole);
  const [description, setDescription] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hustlersCount, setHustlersCount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const duration = calcDuration(startDate, endDate);

  async function handleSubmit() {
    if (!jobTitle || !description || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after start date.");
      return;
    }
    setLoading(true);
    try {
      // TODO: await submitPostJob({ jobTitle, description, role: selectedRole, startDate, endDate, hustlersNeeded: Number(hustlersCount) }, token);
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-5 px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>
        <div className="max-w-sm space-y-2">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white">Job Posted!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
            Your job for{" "}
            <strong className="text-gray-900 dark:text-white">{jobTitle}</strong> has been
            submitted. Hustlers nearby will be notified.
          </p>
        </div>
        <button
          onClick={onBack}
          className="mt-2 px-8 py-3.5 rounded-xl bg-brand text-white text-[14px] font-bold hover:bg-brand-dark transition-colors"
        >
          ← Back to Categories
        </button>
      </div>
    );
  }

  // ── Form screen ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20">
        <div
          className="px-4 pt-5 pb-4"
          style={{ background: "linear-gradient(135deg, #6a0015 0%, #94041d 45%, #b5052a 100%)" }}
        >
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex-1">
              <p className="text-white/60 text-[11px] font-medium">Post a Job</p>
              <h1 className="text-white font-bold text-[18px] leading-tight">Create a Job</h1>
            </div>
            <div className="bg-white/15 border border-white/20 rounded-full px-3 py-1 max-w-[140px] overflow-hidden">
              <span className="text-white text-[11px] font-semibold block truncate">{selectedRole}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* Job Title */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Job Title
          </label>
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
            <span className="text-lg leading-none">💼</span>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Poultry farmer"
              className="flex-1 bg-transparent outline-none text-[14px] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="relative">
          <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Job Description
          </label>
          <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
            <span className="text-lg leading-none mt-0.5">📄</span>
            <textarea
              ref={descRef}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setShowSuggestions(e.target.value.length < 5);
              }}
              onFocus={() => setShowSuggestions(description.length < 5)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Describe the job, skills needed, and any other details…"
              rows={4}
              className="flex-1 bg-transparent outline-none text-[14px] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none leading-relaxed"
            />
          </div>
          {/* Quick-fill dropdown */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden z-50">
              <p className="px-4 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide border-b border-gray-100 dark:border-gray-800">
                Quick-fill
              </p>
              {DESCRIPTION_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onMouseDown={() => {
                    setDescription(s + " ");
                    setShowSuggestions(false);
                    descRef.current?.focus();
                  }}
                  className="w-full text-left px-4 py-3 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-50 dark:border-gray-800 last:border-none transition-colors"
                >
                  &ldquo;{s}&rdquo;
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Schedule — Start & End */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Schedule
          </label>
          <div className="space-y-3">
            {/* Start */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">
                📅 Start Date &amp; Time
              </p>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); }}
                className="w-full bg-transparent outline-none text-[14px] text-gray-800 dark:text-white dark:[color-scheme:dark]"
              />
            </div>
            {!startDate && (
              <p className="text-[11px] text-red-500 dark:text-red-400 pl-1">Start date & time is required</p>
            )}

            {/* End */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">
                🏁 End Date &amp; Time
              </p>
              <input
                type="datetime-local"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent outline-none text-[14px] text-gray-800 dark:text-white dark:[color-scheme:dark]"
              />
            </div>
            {!endDate && (
              <p className="text-[11px] text-red-500 dark:text-red-400 pl-1">End date & time is required</p>
            )}
            {startDate && endDate && new Date(endDate) <= new Date(startDate) && (
              <p className="text-[11px] text-red-500 dark:text-red-400 pl-1">End must be after start</p>
            )}

            {/* Duration pill */}
            {duration && (
              <div className="flex items-center gap-2 bg-brand/5 dark:bg-brand/10 border border-brand/20 rounded-xl px-4 py-2.5">
                <span className="text-[14px]">⏱</span>
                <p className="text-[13px] font-semibold text-brand">Duration: {duration}</p>
              </div>
            )}
          </div>
        </div>

        {/* Number of Hustlers */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Number of Hustlers Needed
          </label>
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
            <span className="text-lg leading-none">👥</span>
            <input
              type="number"
              value={hustlersCount}
              onChange={(e) => setHustlersCount(e.target.value)}
              placeholder="e.g. 3"
              min={1}
              className="flex-1 bg-transparent outline-none text-[14px] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-1.5 pl-1">Enter the number of hustlers required</p>
        </div>
      </div>

      {/* Fixed bottom submit */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 z-50">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-brand text-white text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-brand-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting…
              </>
            ) : (
              "▶ Submit Job"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

