"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Star,
  ChevronRight,
  TrendingUp,
  MapPin,
  LayoutGrid,
  Activity,
  Users,
  Clock,
  RefreshCw,
  Briefcase,
  ClipboardList,
  CheckCircle2,
  UtensilsCrossed,
  Wrench,
  CalendarDays,
  ShoppingBag,
  Truck,
  Leaf,
  CheckCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useLocationCity } from "@/hooks/useLocationCity";
import { getHustlerDashboardStats, getJobRequests, acceptJobRequest, rejectJobRequest } from "@/services/client/dashboard";
import type { DashboardStats, JobRequest } from "@/types/actions/dashboard.types";

// ── Temporary mock hustler id / token until auth is wired ───────
const MOCK_HUSTLER_ID = "demo-hustler-1";
const MOCK_TOKEN = "";

type FilterTab = "All" | "Pending" | "Accepted" | "Completed";

export default function Dashboard() {
  const { city, loading: locationLoading } = useLocationCity();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  // ── Fetch dashboard stats ───────────────────────────────────
  const loadStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await getHustlerDashboardStats(MOCK_HUSTLER_ID, MOCK_TOKEN);
      setStats(data);
    } catch {
      // keep null → skeleton stays shown
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // ── Fetch job requests ──────────────────────────────────────
  const loadJobs = useCallback(async () => {
    try {
      setJobsLoading(true);
      const data = await getJobRequests(MOCK_HUSTLER_ID, MOCK_TOKEN);
      // Ensure data is an array (API might return { data: [...] } or similar)
      const jobsArray = Array.isArray(data) 
        ? data 
        : Array.isArray((data as { data?: JobRequest[] })?.data) 
          ? (data as { data: JobRequest[] }).data 
          : [];
      setJobs(jobsArray);
    } catch {
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    loadJobs();
  }, [loadStats, loadJobs]);

  // ── Optimistic accept / reject ──────────────────────────────
  async function handleAccept(jobId: string) {
    setJobs((prev) => prev.map((j) => j.jobId === jobId ? { ...j, status: "accepted" as const } : j));
    try { await acceptJobRequest(jobId, MOCK_HUSTLER_ID, MOCK_TOKEN); }
    catch { setJobs((prev) => prev.map((j) => j.jobId === jobId ? { ...j, status: "pending" as const } : j)); }
  }

  async function handleReject(jobId: string) {
    setJobs((prev) => prev.map((j) => j.jobId === jobId ? { ...j, status: "rejected" as const } : j));
    try { await rejectJobRequest(jobId, MOCK_HUSTLER_ID, MOCK_TOKEN); }
    catch { setJobs((prev) => prev.map((j) => j.jobId === jobId ? { ...j, status: "pending" as const } : j)); }
  }


  // ── Derived counts ──────────────────────────────────────────
  const allCount       = jobs.length;
  const ongoingCount   = jobs.filter((j) => j.status === "accepted").length;
  const openCount      = jobs.filter((j) => j.status === "pending").length;
  const completedCount = jobs.filter((j) => j.status === "completed").length;
  const pendingCount   = openCount;

  const filteredJobs = jobs.filter((j) => {
    if (activeTab === "All")       return true;
    if (activeTab === "Pending")   return j.status === "pending";
    if (activeTab === "Accepted")  return j.status === "accepted";
    if (activeTab === "Completed") return j.status === "completed";
    return true;
  });

  // ── Skeleton box ─────────────────────────────────────────────
  const Skel = ({ w = "w-full", h = "h-5" }: { w?: string; h?: string }) => (
    <div className={`${w} ${h} rounded-lg bg-white/20 animate-pulse`} />
  );

  return (
    <div className="px-4 pt-4 pb-24 lg:px-6 space-y-6">
      
      {/* ── HEADER LOGO ────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-brand/10">
            <img src="/images/logo.jpg" alt="Yohpal Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-['Sora'] font-extrabold text-2xl tracking-tight text-fg">
            YohPal <span className="text-brand">Hustle</span>
          </span>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-4 text-white relative overflow-hidden bg-brand-gradient"
      >
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-6 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative z-10">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/65 text-[12px] font-medium">Welcome back 👋</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={13} className="text-white/70" />
                <p className="text-white font-bold text-[16px]">
                  {locationLoading ? "Locating…" : city ?? "Your Hustle Space"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { loadStats(); loadJobs(); }}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <RefreshCw size={13} className="text-white/70" />
              </button>
              <div className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <span className="text-[11px] text-white font-semibold">Available</span>
              </div>
            </div>
          </div>

          {/* ── Horizontal scroll panels ─────────────────────── */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 -mx-1 px-1">

            {/* ── Panel 1 · Task Summary ── */}
            <div className="snap-start flex-shrink-0 w-[calc(100%-2rem)]">
              <div className="flex items-center gap-1.5 mb-3">
                <LayoutGrid size={13} className="text-white/60" />
                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">Task Summary</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* All */}
                <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1 border border-white/10">
                  <Briefcase size={15} className="text-white/60" />
                  {jobsLoading ? <Skel w="w-8" h="h-6" /> : (
                    <span className="text-[22px] font-black text-white leading-none">{allCount}</span>
                  )}
                  <span className="text-[10px] text-white/50 font-medium">All</span>
                </div>
                {/* Ongoing */}
                <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1 border border-white/10">
                  <Activity size={15} className="text-green-300" />
                  {jobsLoading ? <Skel w="w-8" h="h-6" /> : (
                    <span className="text-[22px] font-black text-white leading-none">{ongoingCount}</span>
                  )}
                  <span className="text-[10px] text-white/50 font-medium">Ongoing</span>
                </div>
                {/* Open */}
                <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1 border border-white/10">
                  <ClipboardList size={15} className="text-yellow-300" />
                  {jobsLoading ? <Skel w="w-8" h="h-6" /> : (
                    <span className="text-[22px] font-black text-white leading-none">{openCount}</span>
                  )}
                  <span className="text-[10px] text-white/50 font-medium">Open</span>
                </div>
              </div>
            </div>

            {/* ── Panel 2 · Weekly Analytics ── */}
            <div className="snap-start flex-shrink-0 w-[calc(100%-2rem)]">
              <div className="flex items-center gap-1.5 mb-3">
                <TrendingUp size={13} className="text-white/60" />
                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">Your Weekly Analytics</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* Jobs */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-1">Jobs</p>
                  {statsLoading ? <Skel w="w-12" h="h-8" /> : (
                    <p className="text-[28px] font-black text-white leading-none">{stats?.jobsDone ?? "—"}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <CheckCircle2 size={11} className="text-green-300" />
                    <span className="text-[10px] text-green-300 font-medium">
                      {statsLoading ? "…" : `${stats?.activeJobs ?? 0} active`}
                    </span>
                  </div>
                </div>
                {/* Rating */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-1">Rating</p>
                  {statsLoading ? <Skel w="w-12" h="h-8" /> : (
                    <p className="text-[28px] font-black text-white leading-none">{stats?.rating ?? "—"}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star size={11} className="text-yellow-300 fill-yellow-300" />
                    <span className="text-[10px] text-yellow-300 font-medium">
                      {statsLoading ? "…" : `${stats?.reviewCount ?? 0} reviews`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel 3 · Client Insights ── */}
            <div className="snap-start flex-shrink-0 w-[calc(100%-2rem)]">
              <div className="flex items-center gap-1.5 mb-3">
                <Users size={13} className="text-white/60" />
                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">Client Insights</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* Completed */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-1">Completed</p>
                  {jobsLoading ? <Skel w="w-12" h="h-8" /> : (
                    <p className="text-[28px] font-black text-white leading-none">{completedCount}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <CheckCircle2 size={11} className="text-green-300" />
                    <span className="text-[10px] text-green-300 font-medium">Done</span>
                  </div>
                </div>
                {/* Pending */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-1">Pending</p>
                  {jobsLoading ? <Skel w="w-12" h="h-8" /> : (
                    <p className="text-[28px] font-black text-white leading-none">{pendingCount}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock size={11} className="text-yellow-300" />
                    <span className="text-[10px] text-yellow-300 font-medium">Awaiting</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end scroll panels */}

          {/* Scroll dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`rounded-full bg-white/30 ${i === 0 ? "w-4 h-1.5" : "w-1.5 h-1.5"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-bold text-fg">Services</h3>
          <Link
            href="/viewall/services"
            className="flex items-center text-[12px] text-brand font-semibold gap-0.5 hover:opacity-75 transition-opacity"
          >
            View All <ChevronRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {([
            { label: "Food",         category: "Food",        icon: UtensilsCrossed, bg: "bg-orange-50",  ring: "border-orange-100", color: "text-orange-500" },
            { label: "Trades",       category: "Trades",      icon: Wrench,          bg: "bg-blue-50",    ring: "border-blue-100",   color: "text-blue-500" },
            { label: "Events",       category: "Events",      icon: CalendarDays,    bg: "bg-purple-50",  ring: "border-purple-100", color: "text-purple-500" },
            { label: "Retail",       category: "Retail",      icon: ShoppingBag,     bg: "bg-pink-50",    ring: "border-pink-100",   color: "text-pink-500" },
            { label: "Transport",    category: "Transport",   icon: Truck,           bg: "bg-teal-50",    ring: "border-teal-100",   color: "text-teal-500" },
            { label: "Environment",  category: "Environment", icon: Leaf,            bg: "bg-green-50",   ring: "border-green-100",  color: "text-green-500" },
          ] as const).map(({ label, category, icon: Icon, bg, ring, color }) => (
            <Link
              key={label}
              href={`/viewall/services?category=${category}`}
              className={`flex flex-col items-center gap-2 py-3.5 rounded-2xl border ${bg} ${ring} dark:bg-surface dark:border-rim active:scale-95 transition-transform`}
            >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white dark:bg-surface-alt shadow-sm border ${ring} dark:border-rim`}>
                <Icon size={17} className={color} />
              </div>
              <span className="text-[11px] font-semibold text-fg-secondary leading-tight text-center">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Recent Activities ────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-bold text-fg">Recent Activities</h3>
          <button className="flex items-center text-[12px] text-brand font-semibold gap-0.5 hover:opacity-75 transition-opacity">
            View All <ChevronRight size={13} />
          </button>
        </div>

        <div className="space-y-2">
          {jobsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl p-3.5 border border-rim animate-pulse flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-alt flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-surface-alt rounded-lg w-2/3" />
                  <div className="h-3 bg-surface-alt rounded-lg w-1/3" />
                </div>
                <div className="h-3 bg-surface-alt rounded-lg w-10" />
              </div>
            ))
          ) : jobs.length === 0 ? (
            <div className="bg-surface rounded-2xl p-6 text-center border border-rim">
              <Activity size={28} className="text-fg-muted/40 mx-auto mb-2" />
              <p className="text-sm text-fg-muted">No recent activity yet</p>
            </div>
          ) : (
            [...jobs]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((job) => {
                const isCompleted = job.status === "completed";
                const isPending   = job.status === "pending";
                const isAccepted  = job.status === "accepted";
                const isRejected  = job.status === "rejected";

                const dotColor = isCompleted ? "bg-green-400" : isAccepted ? "bg-blue-400" : isPending ? "bg-yellow-400" : "bg-gray-300";
                const iconEl   = isCompleted ? <CheckCheck size={15} className="text-green-500" />
                               : isRejected  ? <XCircle    size={15} className="text-gray-400" />
                               : isAccepted  ? <Activity   size={15} className="text-blue-500" />
                               :               <Clock      size={15} className="text-yellow-500" />;
                const badgeStyle = isCompleted ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                 : isAccepted  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                 : isPending   ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                                 :               "bg-surface-alt text-fg-muted";

                return (
                  <div key={job.jobId} className="bg-surface rounded-2xl p-3.5 border border-rim shadow-sm flex items-center gap-3">
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl bg-surface-alt border border-rim flex items-center justify-center flex-shrink-0">
                      {iconEl}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-fg truncate">{job.jobName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        <p className="text-[11px] text-fg-muted">{job.clientName}</p>
                      </div>
                    </div>

                    {/* Badge + time */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${badgeStyle}`}>
                        {job.status}
                      </span>
                      <span className="text-[10px] text-fg-muted">
                        {new Date(job.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

    </div>
  );
}
