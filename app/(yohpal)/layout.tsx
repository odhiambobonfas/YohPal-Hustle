import ShellLayout from "@/components/custom/app/shared/ShellLayout";
import AuthGuard from "@/components/custom/app/shared/AuthGuard";

export default function YohpalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ShellLayout>{children}</ShellLayout>
    </AuthGuard>
  );
}
