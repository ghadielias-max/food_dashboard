"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/items", label: "Create Items" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 flex flex-col bg-background border-r border-primary-dark/20 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex h-16 items-center px-6 border-b border-primary-dark/20 bg-background/50 backdrop-blur-md">
        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
          Owner Dashboard
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 border ${
                isActive
                  ? "bg-primary text-white border-primary shadow-[0_4px_20px_-5px_var(--color-primary)]"
                  : "text-muted border-transparent hover:bg-primary/10 hover:text-white hover:border-primary/20"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-dark/20 bg-gradient-to-b from-background to-surface">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-info border-2 border-background shadow-lg flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
            SA
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-primary transition-colors">
              Store Admin
            </span>
            <span className="text-[11px] text-muted truncate">
              admin@store.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
