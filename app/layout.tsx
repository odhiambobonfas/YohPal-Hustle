import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YohPal-Hustle",
  description: "YohPal-Hustle Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#f5f5f7] dark:bg-gray-950 text-gray-900 dark:text-gray-100">{children}</body>
    </html>
  );
}
