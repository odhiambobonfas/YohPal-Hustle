"use client";

/**
 * app/(yohpal)/myjobs/job-details.tsx
 * ─────────────────────────────────────────────────────────
 * Full job-details screen used by app/(yohpal)/myjobs/[jobId]/page.tsx.
 *
 * Screens:
 *   "details"  – default view with job info, timeline, payment
 *   "invoice"  – downloadable invoice breakdown
 *   "map"      – Google Maps view of the job location (via ViewMap)
 * ─────────────────────────────────────────────────────────
 */

import { useState } from "react";
import ViewMap from "@/components/custom/app/dashboard/ViewMap";
import { fetchJobLocation } from "@/services/client/view-map";
import type { JobLocationData } from "@/types/actions/view-map.types";
import { auth } from "@/services/server/firebase";

// ── Types ─────────────────────────────────────────────────
export interface JobDetailData {
  title: string;
  client: string;
  clientName: string;
  id: string;
  description: string;
  status: string;
  payType: string;
  hours: number;
  start: string;
  end: string;
  startsIn: string;
  progress: number;
  jobFee: number;
  transportFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  dueDate: string;
  yohpalFee: number;
  vat: number;
  location?: JobLocationData | null;
}

interface JobDetailsProps {
  job: JobDetailData;
}

type Screen = "details" | "invoice" | "map";

// ── SVG icon components ────────────────────────────────────
const Icon = {
  Back: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  More: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Timeline: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Card: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  Car: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l3 5v4a2 2 0 0 1-2 2h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  Tax: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Wallet: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  ),
  Lock: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Cash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Share: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

// ── Shared styles ──────────────────────────────────────────
const s = {
  card: {
    background: "#1a1a1a",
    borderRadius: 16,
    padding: "18px 20px",
    marginBottom: 14,
  } as React.CSSProperties,
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  } as React.CSSProperties,
  sectionLabel: {
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "0.08em",
    color: "#e5e5e5",
  } as React.CSSProperties,
  payRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 0",
    borderBottom: "1px solid #222",
  } as React.CSSProperties,
};

// ── Sub-components ─────────────────────────────────────────
interface BadgeProps {
  label: string;
  variant: "outline" | "yellow";
}

function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      style={{
        padding: "3px 11px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        border:
          variant === "outline" ? "1.5px solid rgba(255,255,255,0.5)" : "none",
        background: variant === "yellow" ? "#d97706" : "transparent",
        color: "white",
      }}
    >
      {label}
    </span>
  );
}

interface PayRowProps {
  icon: React.ReactNode;
  label: string;
  amount: string | number;
  amountColor?: string;
  bold?: boolean;
}

function PayRow({
  icon,
  label,
  amount,
  amountColor = "#e5e5e5",
  bold = false,
}: PayRowProps) {
  return (
    <div style={s.payRow}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        {icon}
        <span
          style={{
            fontSize: 13,
            color: bold ? "#e5e5e5" : "#9ca3af",
            fontWeight: bold ? 700 : 400,
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{ fontSize: 13, fontWeight: bold ? 700 : 500, color: amountColor }}
      >
        {amount}
      </span>
    </div>
  );
}

interface CancelModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function CancelModal({ onClose, onConfirm }: CancelModalProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1e1e1e",
          borderRadius: 20,
          padding: "28px 22px 22px",
          maxWidth: 320,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 16 }}>🚫</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f5f5f5", margin: "0 0 8px" }}>
          Cancel Job?
        </h3>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24, lineHeight: 1.6 }}>
          Are you sure you want to cancel this job?
        </p>
        <button
          onClick={onConfirm}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 50,
            background: "rgba(239,68,68,0.18)",
            border: "none",
            color: "#ef4444",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          Yes, Cancel
        </button>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 50,
            background: "#2a2a2a",
            border: "none",
            color: "#9ca3af",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

interface InvoiceScreenProps {
  job: JobDetailData;
  onBack: () => void;
}

function InvoiceScreen({ job, onBack }: InvoiceScreenProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#111" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 18px",
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#e5e5e5",
            cursor: "pointer",
            padding: 0,
            display: "flex",
          }}
        >
          <Icon.Back />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f5" }}>Invoice</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 0" }}>
        <div style={s.card}>
          <div
            style={{
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: "1px solid #2a2a2a",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#e5e5e5" }}>
              Invoice #INV-{job.id}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>
              Reference: REF-{job.id}
            </div>
          </div>

          {[
            { icon: <Icon.User />, text: job.clientName },
            { icon: <Icon.Briefcase />, text: job.title },
            { icon: <Icon.Calendar />, text: `Due: ${job.dueDate}` },
            { icon: <Icon.Cash />, text: `Payment Method: ${job.paymentMethod}` },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}
            >
              {icon}
              <span style={{ fontSize: 13, color: "#d1d5db" }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={s.card}>
          <PayRow
            icon={<Icon.Wallet />}
            label="Job Amount"
            amount={`KES ${job.jobFee.toFixed(2)}`}
          />
          <PayRow
            icon={<Icon.Tax />}
            label="YohPal Fee (8%)"
            amount={`-KES -${job.yohpalFee.toFixed(2)}`}
            amountColor="#ef4444"
          />
          <PayRow
            icon={<Icon.Car />}
            label="Courier Fee"
            amount={`KES ${job.transportFee.toFixed(2)}`}
          />
          <div style={{ margin: "4px 0" }} />
          <PayRow
            icon={<Icon.Card />}
            label="Subtotal"
            amount={`KES ${job.transportFee.toFixed(2)}`}
          />
          <PayRow
            icon={<Icon.Tax />}
            label="VAT (16%)"
            amount={`KES ${job.vat.toFixed(2)}`}
          />
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f5" }}>Total Due</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#ef4444" }}>
              KES {job.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 14px 18px", display: "flex", gap: 10 }}>
        {[
          { icon: <Icon.Download />, label: "Download" },
          { icon: <Icon.Share />, label: "Share" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 50,
              background: "transparent",
              border: "1.5px solid #ef4444",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────
export default function JobDetails({ job }: JobDetailsProps) {
  const [screen, setScreen] = useState<Screen>("details");
  const [showCancel, setShowCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [locationData, setLocationData] = useState<JobLocationData | null>(
    job.location ?? null
  );
  const [mapLoading, setMapLoading] = useState(false);

  /** Fetch location on first "View Map" tap, then cache it. */
  const handleViewMap = async () => {
    if (!locationData) {
      setMapLoading(true);
      try {
        const token = (await auth.currentUser?.getIdToken()) || "";
        const res = await fetchJobLocation(job.id, token);
        if (res.success && res.data) setLocationData(res.data);
      } catch {
        // Proceed without coordinates – ViewMap handles the empty state
      } finally {
        setMapLoading(false);
      }
    }
    setScreen("map");
  };

  // ── Render alternate screens ─────────────────────────────
  const wrapper = (children: React.ReactNode) => (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        background: "#111",
        color: "#f5f5f5",
        minHeight: "100vh",
        maxWidth: 420,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {children}
    </div>
  );

  if (screen === "invoice")
    return wrapper(
      <InvoiceScreen job={job} onBack={() => setScreen("details")} />
    );

  if (screen === "map")
    return wrapper(
      <ViewMap
        jobId={job.id}
        jobTitle={job.title}
        location={locationData}
        onClose={() => setScreen("details")}
      />
    );

  // ── Details screen ───────────────────────────────────────
  return (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        background: "#111111",
        color: "#f5f5f5",
        minHeight: "100vh",
        maxWidth: 420,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px 13px",
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#ef4444",
              cursor: "pointer",
              padding: 0,
              display: "flex",
            }}
          >
            <Icon.Back />
          </button>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "linear-gradient(135deg,#ef4444,#b91c1c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Job Details</span>
        </div>
        <button
          onClick={() => setShowCancel(true)}
          style={{
            background: "none",
            border: "none",
            color: "#9ca3af",
            cursor: "pointer",
            padding: 4,
            display: "flex",
          }}
        >
          <Icon.More />
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "13px 14px 110px" }}>

        {/* Hero card */}
        <div
          style={{
            borderRadius: 18,
            background: cancelled
              ? "linear-gradient(135deg,#4b1a1a,#7f1d1d)"
              : "linear-gradient(135deg,#ef4444 0%,#b91c1c 60%,#7f1d1d 100%)",
            padding: "18px 18px 16px",
            marginBottom: 13,
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 13,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon.Briefcase />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 9 }}>
              {job.title}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <Badge label={cancelled ? "cancelled" : job.status} variant="yellow" />
              <Badge label={job.payType} variant="outline" />
              <Badge label={`${job.hours}h scheduled`} variant="outline" />
            </div>
          </div>
        </div>

        {/* Job Details card */}
        <div style={s.card}>
          <div style={s.sectionTitle}>
            <Icon.Info />
            <span style={s.sectionLabel}>JOB DETAILS</span>
          </div>
          {(
            [
              ["Job Title", job.title],
              ["Client", job.client],
              ["Job ID", job.id],
              ["Description", job.description],
            ] as [string, string][]
          ).map(([k, v]) => (
            <div
              key={k}
              style={{ display: "flex", gap: 4, marginBottom: 7, fontSize: 13 }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: "#e5e5e5",
                  minWidth: 85,
                  flexShrink: 0,
                }}
              >
                {k}:
              </span>
              <span style={{ color: "#9ca3af", wordBreak: "break-all" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Work Timeline card */}
        <div style={s.card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon.Timeline />
              <span style={s.sectionLabel}>WORK TIMELINE</span>
            </div>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
              }}
            >
              <Icon.Edit />
            </button>
          </div>

          <div style={{ display: "flex", gap: 9, marginBottom: 13 }}>
            {[
              { dot: "#22c55e", label: "START", val: job.start, border: "#22c55e33" },
              { dot: "#ef4444", label: "END", val: job.end, border: "#ef444433" },
            ].map(({ dot, label, val, border }) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  background: "#222",
                  borderRadius: 50,
                  padding: "9px 13px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: `1.5px solid ${border}`,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: dot,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: 9.5,
                      color: "#6b7280",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{ fontSize: 11.5, fontWeight: 600, color: "#e5e5e5" }}
                  >
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              height: 8,
              borderRadius: 99,
              background: "#2a2a2a",
              overflow: "hidden",
              marginBottom: 7,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.max(job.progress, 2)}%`,
                borderRadius: 99,
                background: "linear-gradient(90deg,#f59e0b,#ef4444)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            <span>Progress: {job.progress}%</span>
            <span style={{ fontWeight: 700, color: "#e5e5e5" }}>
              Starts in {job.startsIn}
            </span>
          </div>
        </div>

        {/* Payment Details card */}
        <div style={s.card}>
          <div style={s.sectionTitle}>
            <Icon.Card />
            <span style={s.sectionLabel}>PAYMENT DETAILS</span>
          </div>
          <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: 4 }}>
            <PayRow
              icon={<Icon.Card />}
              label={`Job Fee (${job.hours}.0 hrs @ KES 0/hr)`}
              amount={`KES ${job.jobFee}`}
            />
            <PayRow
              icon={<Icon.Car />}
              label="Transport Fee"
              amount={`KES ${job.transportFee}`}
            />
            <PayRow
              icon={<Icon.Tax />}
              label="Tax (10%)"
              amount={`KES ${job.tax}`}
            />
            <PayRow
              icon={<Icon.Wallet />}
              label="Total Payment"
              amount={`KES ${job.total}`}
              amountColor="#22c55e"
              bold
            />
          </div>
        </div>
      </div>

      {/* ── Bottom action bar ── */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "#111",
          borderTop: "1px solid #1f1f1f",
          padding: "13px 18px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10.5,
              color: "#6b7280",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            TOTAL
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, color: "#f5f5f5" }}>
            KES {job.total}
          </div>
        </div>

        <div style={{ display: "flex", gap: 9 }}>
          {/* View Map button */}
          <button
            onClick={handleViewMap}
            disabled={mapLoading}
            style={{
              padding: "13px 16px",
              borderRadius: 50,
              background: "rgba(239,68,68,0.12)",
              border: "1.5px solid #ef4444",
              color: "#ef4444",
              fontWeight: 700,
              fontSize: 13,
              cursor: mapLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: mapLoading ? 0.6 : 1,
            }}
          >
            <Icon.MapPin />
            {mapLoading ? "..." : "Map"}
          </button>

          {/* Get Invoice button */}
          <button
            onClick={() => setScreen("invoice")}
            style={{
              padding: "13px 18px",
              borderRadius: 50,
              background: "linear-gradient(135deg,#ef4444,#b91c1c)",
              border: "none",
              color: "white",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
            }}
          >
            <Icon.Lock /> Invoice
          </button>
        </div>
      </div>

      {/* Cancel modal */}
      {showCancel && (
        <CancelModal
          onClose={() => setShowCancel(false)}
          onConfirm={() => {
            setCancelled(true);
            setShowCancel(false);
          }}
        />
      )}
    </div>
  );
}
