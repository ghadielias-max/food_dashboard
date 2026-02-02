import AnalyticsDashboard from "./components/AnalyticsDashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Overview
          </h2>
          <p className="text-muted mt-1">
            Welcome back to your store command center.
          </p>
        </div>
        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_-3px_var(--color-primary)]">
          Download Report
        </button>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
