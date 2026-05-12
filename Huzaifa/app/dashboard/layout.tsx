"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout, isLoading: authLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !authLoading && !user) {
      router.push("/");
    }
  }, [isClient, authLoading, user, router]);

  const handleLogout = () => {
    logout();
  };

  if (!isClient || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              University Course Planner
            </h1>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Semester: Spring 2026
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {user.fullName}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                ID: {user.studentId}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}