"use client";

import { useSearchParams } from "next/navigation";
import MatchingMap from "@/components/custom/app/dashboard/MatchingMap";

export default function MatchingJobsPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") || "";
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const title = searchParams.get("title") || "New Job";

  const lat = latStr ? parseFloat(latStr) : -1.2921;
  const lng = lngStr ? parseFloat(lngStr) : 36.8219;

  return (
    <MatchingMap
      jobId={jobId}
      jobLat={lat}
      jobLng={lng}
      jobTitle={title}
    />
  );
}
