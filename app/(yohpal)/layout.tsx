import ShellLayout from "@/components/custom/app/shared/ShellLayout";

export default function YohpalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShellLayout>{children}</ShellLayout>;
}
