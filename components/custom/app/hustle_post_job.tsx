"use client";

import { useState, useRef } from "react";
import { ChevronLeft, CheckCircle2, Loader2, Clock, Users, Minus, Plus } from "lucide-react";
import { submitPostJob } from "@/services/client/jobs";
import type { PostJobPayload } from "@/types/actions/hustle.types";

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
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hustlersCount, setHustlersCount] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const fullStart = startDate && startTime ? `${startDate}T${startTime}` : "";
  const fullEnd = endDate && endTime ? `${endDate}T${endTime}` : "";
  const duration = calcDuration(fullStart, fullEnd);

  async function handleSubmit() {
    if (!jobTitle.trim()) {
      alert("Please enter a Job Title.");
      return;
    }
    if (!description.trim()) {
      alert("Please provide a Job Description.");
      return;
    }
    if (!startDate || !startTime) {
      alert("Please select both a Start Date and Time.");
      return;
    }
    if (!endDate || !endTime) {
      alert("Please select both an End Date and Time.");
      return;
    }
    if (!hustlersCount || parseInt(hustlersCount) <= 0) {
      alert("Please specify how many hustlers are needed (at least 1).");
      return;
    }
    const startObj = new Date(fullStart);
    const endObj = new Date(fullEnd);
    if (isNaN(startObj.getTime())) {
      alert("Invalid Start Date/Time. Please try selecting them again.");
      return;
    }
    if (isNaN(endObj.getTime())) {
      alert("Invalid End Date/Time. Please try selecting them again.");
      return;
    }
    if (endObj <= startObj) {
      alert("The End Date/Time must be after the Start Date/Time.");
      return;
    }
    setLoading(true);
    try {
      const payload: PostJobPayload = {
        jobTitle,
        description,
        role: selectedRole,
        startDate: new Date(fullStart).toISOString(),
        endDate: new Date(fullEnd).toISOString(),
        hustlersNeeded: Number(hustlersCount),
      };
      
      const res = await submitPostJob(payload);
      if (res.success) {
        setSubmitted(true);
      } else {
        alert(res.message || "Failed to post job. Please try again.");
      }
    } catch (error: any) {
      alert(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-page flex flex-col items-center justify-center gap-5 px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>
        <div className="max-w-sm space-y-2">
          <h2 className="text-[22px] font-bold text-fg">Job Posted!</h2>
          <p className="text-fg-secondary text-[14px] leading-relaxed">
            Your job for{" "}
            <strong className="text-fg">{jobTitle}</strong> has been
            submitted. Hustlers nearby will be notified.
          </p>
        </div>
        <button
          onClick={onBack}
          className="mt-2 px-8 py-3.5 rounded-xl text-white text-[14px] font-bold transition-all shadow-lg shadow-brand/25 active:scale-95 bg-brand-gradient"
        >
          ← Back to Categories
        </button>
      </div>
    );
  }

  // ── Form screen ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-page pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20">
        <div
          className="px-4 pt-6 pb-5 bg-brand-gradient"
        >
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex-1">
              <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">Post a Job</p>
              <h1 className="text-white font-bold text-[19px] leading-tight">Create a Job</h1>
            </div>
            <div className="bg-white/20 border border-white/30 rounded-full px-3 py-1.5 max-w-[140px] overflow-hidden">
              <span className="text-white text-[11px] font-semibold block truncate">{selectedRole}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">

        {/* Job Title */}
        <div className="bg-surface rounded-2xl border border-rim shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">1</span>
              <label className="text-[13px] font-bold text-fg tracking-wide">Job Title</label>
            </div>
            <div className="flex items-center gap-3 bg-surface-alt border border-rim rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
              <span className="text-lg leading-none">💼</span>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Poultry farmer"
                className="flex-1 bg-transparent outline-none text-[14px] text-fg placeholder:text-fg-muted"
              />
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-surface rounded-2xl border border-rim shadow-sm relative">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">2</span>
              <label className="text-[13px] font-bold text-fg tracking-wide">Job Description</label>
              <span className="ml-auto text-[11px] text-fg-muted">{description.length}/500</span>
            </div>
            <div className="flex items-start gap-3 bg-surface-alt border border-rim rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
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
                maxLength={500}
                className="flex-1 bg-transparent outline-none text-[14px] text-fg placeholder:text-fg-muted resize-none leading-relaxed"
              />
            </div>
          </div>
          {/* Quick-fill dropdown */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-surface rounded-xl border border-rim shadow-xl overflow-hidden z-50">
              <p className="px-4 py-2 text-[10px] font-bold text-fg-muted uppercase tracking-wide border-b border-rim">
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
                  className="w-full text-left px-4 py-3 text-[13px] text-fg-secondary hover:bg-surface-alt border-b border-rim last:border-none transition-colors"
                >
                  &ldquo;{s}&rdquo;
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Schedule — Start & End */}
        <div className="bg-surface rounded-2xl border border-rim shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">3</span>
              <label className="text-[13px] font-bold text-fg tracking-wide">Schedule</label>
            </div>
            <div className="space-y-4">
              {/* Start Schedule */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-fg-muted uppercase tracking-wide ml-1">
                  📅 Start Schedule
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-surface-alt border border-rim rounded-xl px-3 py-2.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
                    <p className="text-[9px] text-fg-muted uppercase mb-1">Date</p>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-transparent outline-none text-[14px] text-fg dark:[color-scheme:dark]"
                    />
                  </div>
                  <div className="w-[110px] bg-surface-alt border border-rim rounded-xl px-3 py-2.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
                    <p className="text-[9px] text-fg-muted uppercase mb-1">Time</p>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-transparent outline-none text-[14px] text-fg dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* End Schedule */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-fg-muted uppercase tracking-wide ml-1">
                  🏁 End Schedule
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-surface-alt border border-rim rounded-xl px-3 py-2.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
                    <p className="text-[9px] text-fg-muted uppercase mb-1">Date</p>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-transparent outline-none text-[14px] text-fg dark:[color-scheme:dark]"
                    />
                  </div>
                  <div className="w-[110px] bg-surface-alt border border-rim rounded-xl px-3 py-2.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
                    <p className="text-[9px] text-fg-muted uppercase mb-1">Time</p>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-transparent outline-none text-[14px] text-fg dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Duration pill */}
              {duration && (
                <div className="flex items-center gap-2 bg-brand/5 dark:bg-brand/10 border border-brand/20 rounded-xl px-4 py-2.5">
                  <Clock size={14} className="text-brand flex-shrink-0" />
                  <p className="text-[13px] font-semibold text-brand">Total Duration: {duration}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Number of Hustlers */}
        <div className="bg-surface rounded-2xl border border-rim shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">4</span>
              <label className="text-[13px] font-bold text-fg tracking-wide">Hustlers Needed</label>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setHustlersCount(h => String(Math.max(1, (parseInt(h) || 2) - 1)))}
                className="w-11 h-11 rounded-xl bg-surface-alt border border-rim flex items-center justify-center text-fg-secondary hover:opacity-80 active:scale-95 transition-all flex-shrink-0"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 bg-surface-alt border border-rim rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
                <div className="flex items-center gap-3 justify-center">
                  <Users size={15} className="text-fg-muted flex-shrink-0" />
                  <input
                    type="number"
                    value={hustlersCount}
                    onChange={(e) => setHustlersCount(e.target.value)}
                    placeholder="0"
                    min={1}
                    className="w-16 bg-transparent outline-none text-[15px] font-bold text-fg placeholder:text-fg-muted text-center"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHustlersCount(h => String(Math.min(99, (parseInt(h) || 0) + 1)))}
                className="w-11 h-11 rounded-xl bg-brand/10 dark:bg-brand/20 border border-brand/20 flex items-center justify-center text-brand hover:bg-brand/20 dark:hover:bg-brand/30 active:scale-95 transition-all flex-shrink-0"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="text-[11px] text-fg-muted mt-2 pl-1">Tap + / − to adjust the number of hustlers</p>
          </div>
        </div>
      </div>

      {/* Fixed bottom submit */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-56 px-4 py-3 bg-surface/95 backdrop-blur-sm border-t border-rim z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl text-white text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand/25 bg-brand-gradient"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <span>▶</span>
                Submit Job
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

