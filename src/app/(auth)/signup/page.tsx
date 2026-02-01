"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);

  const handleLogin = () => {
    login({
      id: "u1",
      email: "owner@test.com",
      role: "OWNER",
      createdAt: new Date().toISOString(),
    });

    toast.success("Welcome back 👋");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Login (mock)
      </button>
    </div>
  );
}
