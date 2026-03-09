"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { label: "Mon", amount: 3200 },
  { label: "Tue", amount: 1500 },
  { label: "Wed", amount: 4800 },
  { label: "Thu", amount: 2200 },
  { label: "Fri", amount: 5500 },
  { label: "Sat", amount: 3800 },
  { label: "Sun", amount: 1200 },
];

const monthlyData = [
  { label: "Wk 1", amount: 12000 },
  { label: "Wk 2", amount: 18500 },
  { label: "Wk 3", amount: 9800 },
  { label: "Wk 4", amount: 14200 },
];

type Period = "week" | "month";

export default function EarningsChart() {
  const [period, setPeriod] = useState<Period>("week");
  const data = period === "week" ? weeklyData : monthlyData;
  const maxAmount = Math.max(...data.map((d) => d.amount));
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-surface rounded-2xl p-4 border border-rim shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <TrendingUp size={13} className="text-brand" />
            <h3 className="text-[13px] font-bold text-fg">Earnings Overview</h3>
          </div>
          <p className="text-[11px] text-fg-muted mt-0.5">
            KES {total.toLocaleString()}{" "}
            {period === "week" ? "this week" : "this month"}
          </p>
        </div>

        {/* Period Toggle */}
        <div className="flex bg-surface-alt rounded-full p-0.5">
          {(["week", "month"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all capitalize ${
                period === p
                  ? "bg-surface text-brand shadow-sm"
                  : "text-fg-muted"
              }`}
            >
              {p === "week" ? "Week" : "Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end gap-1.5 h-28">
        {data.map((item) => {
          const heightPct = (item.amount / maxAmount) * 100;
          const isMax = item.amount === maxAmount;
          return (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${heightPct}%`,
                  minHeight: "4px",
                  background: isMax ? "#94041d" : "rgba(148,4,29,0.18)",
                }}
              />
              <span className="text-[9px] text-fg-muted font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Trend footer */}
      <div className="mt-3 pt-3 border-t border-rim flex items-center gap-1.5">
        <TrendingUp size={11} className="text-brand" />
        <span className="text-brand text-[11px] font-semibold">↑ 12% from last {period}</span>
        <span className="text-fg-muted text-[11px] ml-auto">Updated just now</span>
      </div>
    </div>
  );
}
