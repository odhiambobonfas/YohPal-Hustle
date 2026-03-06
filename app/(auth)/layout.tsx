import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4 sm:p-6 text-black dark:text-white">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[10px] overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#f44236] flex items-center justify-center mb-4 rounded-[10px]">
              <span className="text-white text-3xl font-bold tracking-tighter">
                YP
              </span>
            </div>
            <h1 className="text-black dark:text-white text-3xl font-black tracking-tight uppercase italic">
              YohPal-Hustle
            </h1>
            <div className="h-1 w-12 bg-[#f44236] mt-2"></div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
