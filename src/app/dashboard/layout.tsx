import AuthGuard from "../components/AuthGuard";
import DashboardNav from "./components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background text-white">
        <DashboardNav />
        <main className="ml-64 p-8 min-h-screen">{children}</main>
      </div>
    </AuthGuard>
  );
}
