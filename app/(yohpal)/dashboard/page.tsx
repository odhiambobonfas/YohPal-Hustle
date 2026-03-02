"use client";

import { useState } from "react";
import {
  Briefcase,
  Star,
  ClipboardList,
  ChevronRight,
  CheckCircle2,
  Wallet,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import JobRequestCard from "@/components/custom/app/dashboard/JobRequestCard";
import EarningsChart from "@/components/custom/app/dashboard/EarningsChart";
import StatsCard from "@/components/custom/app/dashboard/StatsCard";

// ── Mock data (replace with real API calls from services/client/dashboard.ts) ──
const MOCK_STATS = {
  totalEarnings: 48200,
  jobsDone: 34,
  activeJobs: 2,
  rating: 4.8,
  reviewCount: 27,
  pendingRequests: 3,
  currency: "KES",
};

const MOCK_JOBS: MockJob[] = [
  {
    jobId: "j1",
    jobName: "Fix Kitchen Sink Pipe",
    clientName: "Alice Mwangi",
    location: "Westlands, Nairobi",
    time: "Today 10:00 AM",
    amount: 3500,
    currency: "KES",
    status: "pending",
    skill: "Plumbing",
  },
  {
    jobId: "j2",
    jobName: "Rewire Living Room",
    clientName: "Brian Omondi",
    location: "Kilimani, Nairobi",
    time: "Tomorrow 9:00 AM",
    amount: 7800,
    currency: "KES",
    status: "pending",
    skill: "Electrical",
  },
  {
    jobId: "j3",
    jobName: "Deep House Cleaning",
    clientName: "Carol Njeri",
    location: "Karen, Nairobi",
    time: "Mon 2:00 PM",
    amount: 2500,
    currency: "KES",
    status: "accepted",
    skill: "Cleaning",
  },
];

type JobStatus = "pending" | "accepted" | "rejected" | "completed";
interface MockJob {
  jobId: string;
  jobName: string;
  clientName: string;
  location: string;
  time: string;
  amount: number;
  currency: string;
  status: JobStatus;
  skill: string;
}

type FilterTab = "All" | "Pending" | "Accepted" | "Completed";

export default function Dashboard() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const stats = MOCK_STATS;

  function handleAccept(jobId: string) {
    setJobs((prev) =>
      prev.map((j) => (j.jobId === jobId ? { ...j, status: "accepted" } : j))
    );
  }

  function handleReject(jobId: string) {
    setJobs((prev) =>
      prev.map((j) => (j.jobId === jobId ? { ...j, status: "rejected" } : j))
    );
  }

  const pendingCount = jobs.filter((j) => j.status === "pending").length;

  const filteredJobs = jobs.filter((j) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return j.status === "pending";
    if (activeTab === "Accepted") return j.status === "accepted";
    if (activeTab === "Completed") return j.status === "completed";
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-6 space-y-4 max-w-lg mx-auto lg:max-w-3xl">

          {/* ── HERO: Earnings Card ── */}
          <div
            className="rounded-3xl p-5 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #6a0015 0%, #94041d 45%, #b5052a 100%)" }}
          >
            {/* Decorative background circles */}
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5" />
            <div className="absolute -bottom-12 -left-8 w-52 h-52 rounded-full bg-white/5" />
            <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-white/5 -translate-y-1/2" />

            <div className="relative z-10">
              {/* Top row: greeting + availability badge */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/65 text-[12px] font-medium">Welcome back 👋</p>
                  <p className="text-white font-bold text-[16px] mt-0.5">Your Hustle Space</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-[11px] text-white font-semibold">Available</span>
                </div>
              </div>

              {/* Big earnings figure */}
              <div className="mb-5">
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">
                  Total Earnings
                </p>
                <p className="text-[40px] font-black text-white mt-1 leading-none tracking-tight">
                  {stats.currency} {stats.totalEarnings.toLocaleString()}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp size={13} className="text-green-300" />
                  <p className="text-green-300 text-[12px] font-semibold">
                    12% growth this month
                  </p>
                </div>
              </div>

              {/* Mini stats row inside hero */}
              <div className="flex pt-4 border-t border-white/15">
                <div className="flex-1 flex flex-col items-center gap-1 border-r border-white/10">
                  <Briefcase size={14} className="text-white/50" />
                  <span className="text-[18px] font-black text-white leading-none">
                    {stats.jobsDone}
                  </span>
                  <span className="text-[10px] text-white/50 font-medium">Jobs Done</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 border-r border-white/10">
                  <Star size={14} className="text-yellow-300" />
                  <span className="text-[18px] font-black text-white leading-none">
                    {stats.rating}
                  </span>
                  <span className="text-[10px] text-white/50 font-medium">Rating</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <ClipboardList size={14} className="text-white/50" />
                  <span className="text-[18px] font-black text-white leading-none">
                    {pendingCount}
                  </span>
                  <span className="text-[10px] text-white/50 font-medium">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats Grid (2×2) ── */}
          <div className="grid grid-cols-2 gap-3">
            <StatsCard
              label="Jobs Done"
              value={String(stats.jobsDone)}
              icon={CheckCircle2}
              iconBg="bg-teal-50"
              iconColor="text-teal-600"
              sub={`${stats.activeJobs} active now`}
              subColor="text-teal-600"
            />
            <StatsCard
              label="Your Rating"
              value={`${stats.rating} ★`}
              icon={Star}
              iconBg="bg-amber-50"
              iconColor="text-amber-500"
              sub={`${stats.reviewCount} reviews`}
              subColor="text-amber-500"
            />
            <StatsCard
              label="Job Requests"
              value={String(stats.pendingRequests)}
              icon={ClipboardList}
              iconBg="bg-red-50"
              iconColor="text-[#94041d]"
              sub={pendingCount > 0 ? `${pendingCount} need response` : "All handled"}
              subColor="text-[#94041d]"
            />
            <StatsCard
              label="Balance"
              value="KES"
              icon={Wallet}
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
              sub={stats.totalEarnings.toLocaleString()}
              subColor="text-blue-500"
            />
          </div>

          {/* ── Earnings Chart ── */}
          <EarningsChart />

          {/* ── Job Requests ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-gray-800">Job Requests</h3>
              <Link
                href="/myjobs"
                className="flex items-center text-[12px] text-[#94041d] font-semibold gap-0.5 hover:opacity-75 transition-opacity"
              >
                View All <ChevronRight size={13} />
              </Link>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {(["All", "Pending", "Accepted", "Completed"] as FilterTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-[#94041d] text-white shadow-sm"
                      : "bg-white text-gray-400 border border-gray-200"
                  }`}
                >
                  {tab}
                  {tab === "Pending" && pendingCount > 0 && activeTab === "Pending" && (
                    <span className="ml-1.5 bg-white/25 text-white rounded-full px-1.5 py-0.5 text-[10px]">
                      {pendingCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Job Cards */}
            <div className="space-y-3">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                  <Briefcase size={32} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No {activeTab.toLowerCase()} jobs</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobRequestCard
                    key={job.jobId}
                    {...job}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))
              )}
            </div>
          </div>
        </div>
  );
}
