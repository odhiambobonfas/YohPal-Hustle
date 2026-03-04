import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  sub?: string;
  subColor?: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  sub,
  subColor = "text-green-400",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-2.5 active:scale-[0.98] transition-transform">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={19} className={iconColor} />
      </div>

      {/* Value + Label */}
      <div>
        <p className="text-xl font-extrabold text-gray-900 leading-tight">{value}</p>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{label}</p>
        {sub && (
          <p className={`text-[11px] mt-1.5 font-semibold ${subColor}`}>{sub}</p>
        )}
      </div>
    </div>
  );
}
