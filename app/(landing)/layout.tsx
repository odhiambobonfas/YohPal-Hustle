import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YohPal Hustle - Africa's #1 Gig Platform",
  description: "The ultimate connection for young Africans. Find skilled hustlers in your neighborhood for on-site services. From tech support to car washes, see them live on the map.",
  keywords: ["gig economy", "Africa", "freelance", "local services", "hustlers", "Kenya", "jobs"],
  openGraph: {
    title: "YohPal Hustle - Real Hustlers, Real Skills. Right Around You!",
    description: "Find skilled hustlers in your neighborhood for on-site services.",
    type: "website",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
