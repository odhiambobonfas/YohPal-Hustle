// Route-level loading UI — shown instantly while any (yohpal) page loads
export default function YohpalLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      {/* Hero skeleton */}
      <div className="mx-4 mt-4 h-28 rounded-2xl bg-gray-200 dark:bg-gray-800" />

      {/* Content rows */}
      <div className="px-4 mt-5 space-y-3">
        <div className="h-4 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
        <div className="h-4 w-1/4 rounded-full bg-gray-200 dark:bg-gray-800 mt-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}
