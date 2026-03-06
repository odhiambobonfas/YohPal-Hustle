"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronDown, SlidersHorizontal } from "lucide-react";
import HustlePostJob from "@/components/custom/app/hustle_post_job";
import {
  CATEGORIES,
  CATEGORY_FILTERS,
  parseRoles,
  type CategoryFilter,
} from "@/constants/hustle-categories";

const FILTERS = CATEGORY_FILTERS;
type Filter = CategoryFilter;

// ─── Component ────────────────────────────────────────────────────────────────
export default function ViewAllServices({ initialFilter = "All" }: { initialFilter?: Filter }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>(initialFilter);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [showPostJob, setShowPostJob] = useState(false);

  // ── Show post job screen ──────────────────────────────────────────────────
  if (showPostJob && selectedRole) {
    return (
      <HustlePostJob
        selectedRole={selectedRole}
        onBack={() => setShowPostJob(false)}
      />
    );
  }

  const filtered = CATEGORIES.filter((c) => {
    const matchFilter = activeFilter === "All" || c.tag === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  function toggle(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div
      className="min-h-screen bg-page"
      style={{ paddingBottom: selectedRole ? 88 : 0 }}
    >
      {/* ── Sticky header ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20">

        {/* Brand title bar */}
        <div
          className="px-4 pt-5 pb-4"
          style={{ background: "linear-gradient(135deg, #6a0015 0%, #94041d 45%, #b5052a 100%)" }}
        >
          <div className="flex items-center gap-3 max-w-5xl mx-auto">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex-1">
              <p className="text-white/60 text-[11px] font-medium">Browse</p>
              <h1 className="text-white font-bold text-[18px] leading-tight">Hustle Categories</h1>
            </div>
            <div className="bg-white/15 rounded-full px-2.5 py-1 border border-white/20">
              <span className="text-white text-[11px] font-semibold">{filtered.length} found</span>
            </div>
          </div>
        </div>

        {/* Dark search + filter bar */}
        <div className="bg-surface border-b border-rim px-4 pt-3 pb-3">
          <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 bg-surface-alt border border-rim rounded-2xl px-3.5 py-2.5">
              <Search size={14} className="text-fg-muted flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a skill or category…"
                className="flex-1 bg-transparent text-fg text-[13px] placeholder:text-fg-muted outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-fg-muted hover:text-fg-secondary text-[18px] leading-none"
                >
                  ×
                </button>
              )}
            </div>
            <button className="w-10 h-10 rounded-2xl bg-surface-alt border border-rim flex items-center justify-center flex-shrink-0">
              <SlidersHorizontal size={15} className="text-fg-muted" />
            </button>
          </div>

          {/* Filter chips */}
          <div
            className="flex gap-2 mt-2.5 overflow-x-auto pb-0.5 -mx-4 px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all border ${
                    active
                      ? "bg-[#94041d] text-white border-[#94041d]"
                      : "bg-surface-alt text-fg-secondary border-rim hover:border-fg-muted"
                  }`}
                >
                  {active && <span className="text-[10px]">✓</span>}
                  {f}
                </button>
              );
            })}
          </div>
          </div>{/* max-w-5xl */}
        </div>{/* search+filter bar */}

      </div>{/* sticky header */}

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="px-4 py-4 max-w-5xl mx-auto space-y-2.5">

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-3xl bg-surface-alt flex items-center justify-center mb-4 text-3xl">
              🔍
            </div>
            <p className="text-fg-secondary font-semibold text-[15px]">No categories found</p>
            <p className="text-fg-muted text-[13px] mt-1">Try a different filter or search term</p>
          </div>
        ) : (
          filtered.map((cat) => {
            const isOpen = expandedId === cat.id;
            const isSelected = selectedCatId === cat.id;
            const roles = parseRoles(cat.subtitle);
            return (
              <div
                key={cat.id}
                className="rounded-2xl overflow-hidden transition-all duration-200 bg-surface"
                style={{
                  border: isSelected
                    ? `1.5px solid ${cat.accent}55`
                    : "1px solid var(--card-border)",
                }}
              >
                {/* Header row — tap to expand / collapse */}
                <div
                  onClick={() => toggle(cat.id)}
                  className="flex items-center gap-3.5 p-4 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-[22px] flex-shrink-0"
                    style={{
                      backgroundColor: cat.accent + "18",
                      border: `1px solid ${cat.accent}30`,
                    }}
                  >
                    {cat.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-fg leading-snug">{cat.name}</p>
                    <p className="text-[11px] text-fg-muted mt-0.5 truncate">{cat.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block"
                      style={{ backgroundColor: cat.accent + "18", color: cat.accent }}
                    >
                      {cat.tag}
                    </span>
                    <ChevronDown
                      size={16}
                      className="text-fg-muted transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </div>

                {/* Expanded — selectable role list */}
                {isOpen && (
                  <div className="border-t border-rim px-4 pt-2 pb-4">
                    <p
                      className="text-[11px] font-bold mt-1 mb-1"
                      style={{ color: cat.accent }}
                    >
                      Select a role
                    </p>
                    {roles.map((role) => {
                      const isChecked =
                        selectedRole === role && selectedCatId === cat.id;
                      return (
                        <div
                          key={role}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRole(role);
                            setSelectedCatId(cat.id);
                          }}
                          className="flex items-center gap-3.5 py-3 border-b border-rim cursor-pointer last:border-none"
                        >
                          {/* Radio indicator */}
                          <div
                            className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              border: isChecked
                                ? `2px solid ${cat.accent}`
                                : "2px solid var(--card-border)",
                              backgroundColor: isChecked
                                ? cat.accent + "22"
                                : "transparent",
                            }}
                          >
                            {isChecked && (
                              <div
                                className="w-[10px] h-[10px] rounded-full"
                                style={{ backgroundColor: cat.accent }}
                              />
                            )}
                          </div>
                          <span
                            className={`text-[14px] ${
                              isChecked ? "text-fg font-medium" : "text-fg-secondary"
                            }`}
                          >
                            {role}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Single CTA — appears once a role is selected ─── */}
      {selectedRole && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-56 px-4 py-3 bg-surface border-t border-rim z-50">
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => setShowPostJob(true)}
              className="w-full py-3.5 rounded-xl bg-[#e03c2e] border-none text-white text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-[#c8352a] transition-colors"
            >
              ▶ View &ldquo;{selectedRole}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
