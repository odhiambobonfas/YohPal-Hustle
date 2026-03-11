/**
 * app/(yohpal)/myjobs/[jobId]/page.tsx
 * ─────────────────────────────────────────────────────────
 * Next.js 15 (App Router) server page for a single job detail view.
 *
 * Route: /myjobs/{jobId}
 *
 * • Awaits the dynamic `params` Promise (Next.js 15 requirement).
 * • Fetches the real job document from Firestore server-side.
 * • Also fetches the saved job location from Firestore.
 * • Passes the combined data down to the <JobDetails> client component.
 * ─────────────────────────────────────────────────────────
 */

import { notFound } from "next/navigation";
import JobDetails from "../job-details";
import { getJobDocument } from "@/services/server/firestore";
import { getJobLocation } from "@/services/server/view-map";

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { jobId } = await params;

  const [jobResult, locationResult] = await Promise.all([
    getJobDocument(jobId),
    getJobLocation(jobId),
  ]);

  if (!jobResult.success || !jobResult.data) {
    notFound();
  }

  return (
    <JobDetails
      job={{
        ...jobResult.data,
        location: locationResult.data ?? null,
      }}
    />
  );
}
