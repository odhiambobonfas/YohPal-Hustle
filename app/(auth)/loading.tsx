// Route-level loading UI — shown instantly while auth pages load
export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-sm px-6 animate-pulse space-y-4">
        <div className="h-8 w-2/3 mx-auto rounded-full bg-surface-alt" />
        <div className="h-4 w-1/2 mx-auto rounded-full bg-surface-alt" />
        <div className="mt-6 space-y-3">
          <div className="h-12 rounded-xl bg-surface-alt" />
          <div className="h-12 rounded-xl bg-surface-alt" />
          <div className="h-12 rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
