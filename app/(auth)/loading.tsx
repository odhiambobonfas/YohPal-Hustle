// Route-level loading UI — shown instantly while auth pages load
export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm px-6 animate-pulse space-y-4">
        <div className="h-8 w-2/3 mx-auto rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-1/2 mx-auto rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="mt-6 space-y-3">
          <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 rounded-xl bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
