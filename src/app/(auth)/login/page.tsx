"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = () => {
    login({
      id: "owner-1",
      email: "owner@test.com",
      role: "OWNER",
      createdAt: new Date().toISOString(),
    });

    toast.success("Welcome back 💜");
    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05050A] relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm p-8 bg-[#0A0A12] border border-purple-900/30 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_-5px_rgba(147,51,234,0.7)] transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
        >
          Login (mock)
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Secure admin access restricted to owners.
          </p>
        </div>
      </div>
    </div>
  );
}
