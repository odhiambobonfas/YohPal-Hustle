import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4 sm:p-6 text-fg">
      <div className="relative w-full max-w-lg bg-surface border border-rim rounded-[10px] overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-brand/10">
                <img src="/images/logo.jpg" alt="Yohpal Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-['Sora'] font-extrabold text-3xl tracking-tight text-fg">
                YohPal <span className="text-brand">Hustle</span>
              </span>
            </div>
            <p className="text-fg-secondary text-sm font-medium">Empowering African Hustlers</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
