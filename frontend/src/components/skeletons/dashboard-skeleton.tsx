export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-64 bg-white/5 rounded-lg mb-2" />
        <div className="h-4 w-96 bg-white/5 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-white/5 rounded-xl border border-white/5" />
        <div className="h-64 bg-white/5 rounded-xl border border-white/5" />
      </div>
    </div>
  )
}
