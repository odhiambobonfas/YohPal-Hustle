"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MessageSquarePlus } from "lucide-react";

export default function ReviewsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-page text-fg pb-24">
      <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-alt hover:bg-rim transition">
          <ArrowLeft size={18} className="text-fg" />
        </button>
        <h1 className="text-xl font-bold text-fg">My Reviews</h1>
      </div>

      {/* Rating summary */}
      <div className="mx-5 mb-6 bg-surface rounded-2xl px-5 py-6 flex items-center gap-5">
        <div className="flex flex-col items-center">
          <span className="text-[30px] font-black text-fg">0.0</span>
          <div className="flex gap-0.5 mt-1">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={14} className="text-fg-muted" />
            ))}
          </div>
          <span className="text-xs text-fg-muted mt-1">0 reviews</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {[5,4,3,2,1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-fg-muted w-3">{star}</span>
              <div className="flex-1 h-1.5 rounded-full bg-surface-alt" />
              <span className="text-xs text-fg-muted w-4">0</span>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      <div className="mx-5 flex flex-col items-center gap-3 py-12 text-center">
        <MessageSquarePlus size={40} className="text-fg-muted" />
        <p className="text-fg-secondary text-[13px] max-w-xs">
          You have no reviews yet. Complete your first job to start receiving feedback.
        </p>
      </div>
      </div>
    </div>
  );
}
