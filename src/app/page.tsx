"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "./store/useAuthStore";

export default function HomePage() {
  const user = useAuthStore((s) => s.user);

  if (user) redirect("/dashboard");
  redirect("/login");
}
