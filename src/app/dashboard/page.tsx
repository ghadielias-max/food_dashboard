export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8 bg-[#05050A] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Overview
          </h2>
          <p className="text-zinc-400 mt-1">
            Welcome back to your store command center.
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)]">
          Download Report
        </button>
      </div>

      {/* Mock Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Revenue", value: "$45,231.89", trend: "+20.1%" },
          { label: "Active Orders", value: "+573", trend: "+12.5%" },
          { label: "Menu Items", value: "89", trend: "+4 new" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[#0A0A12] border border-purple-900/20 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <p className="text-sm font-medium text-zinc-400 relative z-10">
              {stat.label}
            </p>
            <div className="mt-2 flex items-baseline gap-2 relative z-10">
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-emerald-400">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Placeholder */}
      <div className="rounded-2xl border border-dashed border-purple-900/30 bg-[#0A0A12]/50 h-96 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(147,51,234,0.1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-purple-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          Analytics Module
        </h3>
        <p className="text-zinc-500 max-w-sm">
          Business stats, revenue, and orders summary charts are currently being
          developed. Check back soon.
        </p>
      </div>
    </div>
  );
}
