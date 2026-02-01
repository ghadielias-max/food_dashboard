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
    <aside className="fixed inset-y-0 left-0 w-64 flex flex-col bg-[#05050A] border-r border-purple-900/20 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex h-16 items-center px-6 border-b border-purple-900/20 bg-[#05050A]/50 backdrop-blur-md">
        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
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
                  ? "bg-purple-600 text-white border-purple-500 shadow-[0_4px_20px_-5px_rgba(147,51,234,0.5)]"
                  : "text-zinc-400 border-transparent hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-500/20"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-purple-900/20 bg-gradient-to-b from-[#05050A] to-[#0A0A12]">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 border-2 border-[#05050A] shadow-lg flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
            SA
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-purple-300 transition-colors">
              Store Admin
            </span>
            <span className="text-[11px] text-zinc-500 truncate">
              admin@store.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
