"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/app/store/useAdminStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import PlatformAnalyticsView from "./components/PlatformAnalytics";
import GlobalSettings from "./components/GlobalSettings";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CreateBusinessModal from "../components/CreateBusinessModal";

export default function SuperAdminPage() {
  const { user, logout } = useAuthStore();
  const { 
    accounts, 
    analytics, 
    settings,
    isLoading, 
    fetchAccounts, 
    fetchAnalytics, 
    fetchSettings 
  } = useAdminStore();
  
  const [activeTab, setActiveTab] = useState<"businesses" | "analytics" | "settings">("businesses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "SUPER_ADMIN") {
      router.replace("/");
      return;
    }
    fetchAccounts();
    fetchAnalytics();
    fetchSettings();
  }, [user, fetchAccounts, fetchAnalytics, fetchSettings, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-primary-dark/20 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
          <p className="text-muted mt-1">Super Admin Control Panel</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
             <p className="text-sm font-medium text-white">{user.email}</p>
             <p className="text-xs text-muted">Administrator</p>
          </div>
          <button
            onClick={() => {
              logout();
              router.replace("/");
            }}
            className="px-4 py-2 bg-surface border border-primary-dark/20 hover:bg-white/5 text-muted hover:text-white rounded-xl text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {(["businesses", "analytics", "settings"] as const).map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
               activeTab === tab 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-muted hover:text-white bg-surface"
             }`}
           >
             {tab}
           </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "businesses" && (
          <motion.div 
            key="businesses"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold">Registered Businesses</h2>
               <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
              >
                <span>+</span> New Business
              </button>
            </div>

            {isLoading && accounts.length === 0 ? (
              <div className="text-center py-20 text-muted">Loading data...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map(({ business, owner }) => (
                  <div
                    key={business.id}
                    className="bg-surface border border-primary-dark/20 rounded-2xl p-6 hover:border-primary/40 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary-dark/20 border border-primary/20 flex items-center justify-center text-primary font-bold">
                        {business.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-muted border border-white/5">
                        {business.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {business.name}
                    </h3>
                    <p className="text-sm text-muted mb-4 truncate">{business.address}</p>
                    {business.phone && (
                        <p className="text-xs text-muted mb-4 flex items-center gap-1">
                            📞 {business.phone}
                        </p>
                    )}

                    <div className="pt-4 border-t border-white/5">
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">
                        Owner
                      </p>
                      <p className="text-sm font-medium text-white">{owner.name}</p>
                      <p className="text-xs text-muted">{owner.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "analytics" && analytics && (
           <motion.div 
             key="analytics"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
           >
              <PlatformAnalyticsView data={analytics} />
           </motion.div>
        )}

        {activeTab === "settings" && settings && (
           <motion.div 
             key="settings"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
           >
              <GlobalSettings settings={settings} />
           </motion.div>
        )}
      </AnimatePresence>

      <CreateBusinessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}