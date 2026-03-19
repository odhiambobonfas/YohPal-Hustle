import AuthGuard from "@/components/custom/app/shared/AuthGuard";

export default function HustlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
