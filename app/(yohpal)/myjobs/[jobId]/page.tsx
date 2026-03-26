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

// import { notFound } from "next/navigation";
// import JobDetails from "../job-details";
// import { getJobDocument } from "@/services/server/firestore";
// import { getJobLocation } from "@/services/server/view-map";

// interface PageProps {
//   params: Promise<{ jobId: string }>;
// }

// export default async function JobDetailsPage({ params }: PageProps) {
//   const { jobId } = await params;

//   const [jobResult, locationResult] = await Promise.all([
//     getJobDocument(jobId),
//     getJobLocation(jobId),
//   ]);

//   if (!jobResult.success || !jobResult.data) {
//     notFound();
//   }

//   // Map Firestore job data to JobDetailData shape
//   const jobData = jobResult.data;
//   const jobDetail: import("../job-details").JobDetailData = {
//     // Required fields with fallback or transformation
//     title: jobData.jobTitle || "Untitled Job",
//     client: jobData.client || "",
//     clientName: jobData.clientName || "",
//     id: jobId,
//     description: jobData.description || "",
//     status: jobData.status || "pending",
//     payType: jobData.payType || "",
//     hours: jobData.hours || 0,
//     start: jobData.startDate || "",
//     end: jobData.endDate || "",
//     startsIn: jobData.startsIn || "",
//     progress: jobData.progress || 0,
//     jobFee: jobData.jobFee || 0,
//     transportFee: jobData.transportFee || 0,
//     tax: jobData.tax || 0,
//     total: jobData.total || 0,
//     paymentMethod: jobData.paymentMethod || "",
//     dueDate: jobData.dueDate || "",
//     yohpalFee: jobData.yohpalFee || 0,
//     vat: jobData.vat || 0,
//     location: locationResult.data ?? null,
//   };
//   return <JobDetails job={jobDetail} />;
// }
