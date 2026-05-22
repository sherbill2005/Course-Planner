"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar";

type Announcement = {
  id: number;
  title: string;
  message: string;
  createdAt: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1024
  );
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAnnouncementLoading, setIsAnnouncementLoading] = useState(true);
  const hasAnnouncements = announcements.length > 0;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch("/api/announcements");

        if (!response.ok) {
          return;
        }

        const data: Announcement[] = await response.json();
        setAnnouncements(data);
      } finally {
        setIsAnnouncementLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`${theme} relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950 text-zinc-900 dark:text-white transition-colors duration-300`}>
      {isSidebarVisible && (
        <button
          onClick={() => setIsSidebarVisible(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="Close sidebar backdrop"
        />
      )}
      <Sidebar isVisible={isSidebarVisible} onToggle={() => setIsSidebarVisible(!isSidebarVisible)} />

      <div className={`flex min-h-screen min-w-0 flex-col overflow-x-hidden transition-all duration-300 pl-0 ${isSidebarVisible ? 'lg:pl-64' : 'lg:pl-0'}`}>
        <header className="sticky top-0 z-10 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 lg:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {!isSidebarVisible && (
                <button 
                  onClick={() => setIsSidebarVisible(true)}
                  className="relative h-10 w-10 shrink-0 cursor-pointer rounded-full bg-[#eeeeee] text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.14)] transition-transform duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110 active:scale-90"
                  aria-label="Open sidebar"
                >
                  <span className="absolute left-1/2 top-1/2 block h-[3px] w-[20px] -translate-x-1/2 -translate-y-[9px] rounded-full bg-[#596778] transition-transform duration-200" />
                  <span className="absolute left-1/2 top-1/2 block h-[3px] w-[20px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#596778] transition-transform duration-200" />
                  <span className="absolute left-1/2 top-1/2 block h-[3px] w-[20px] -translate-x-1/2 translate-y-[6px] rounded-full bg-[#596778] transition-transform duration-200" />
                </button>
              )}
              <div className="min-w-0">
                <h1 className="truncate text-base font-bold tracking-tight sm:text-lg">University Course Planner</h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Welcome back, {user.fullName.split(' ')[0]}</p>
              </div>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen((open) => !open)}
                  className={`group/notification relative flex cursor-pointer items-center justify-center rounded-full bg-transparent p-[15px] transition duration-300 hover:bg-zinc-200/50 dark:hover:bg-white/[0.062] ${
                    hasAnnouncements
                      ? "text-red-600 dark:text-red-400"
                      : "text-zinc-700 dark:text-white"
                  }`}
                  aria-label="Notifications"
                  aria-expanded={isNotificationOpen}
                >
                  {hasAnnouncements && (
                    <span className="absolute right-2 top-2 z-[1000] flex min-h-3 min-w-3 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-3 text-white">
                      {announcements.length > 9 ? "9+" : announcements.length}
                    </span>
                  )}
                  <div className="group-hover/notification:animate-[bell-animation_650ms_ease-out_0s_1_normal_both]">
                    <div className="relative top-[-3px] block h-[17px] w-[15px] rounded-t-[10px] border-[2.17px] border-current bg-transparent before:absolute before:left-1/2 before:top-full before:block before:h-[2.17px] before:w-5 before:-translate-x-1/2 before:bg-current before:content-[''] after:absolute after:left-1/2 after:top-[calc(100%+4px)] after:block after:h-[2.17px] after:w-[7px] after:-translate-x-1/2 after:bg-current after:content-['']" />
                  </div>
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-2rem))]">
                    <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-black/40">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .738-1.674C19.57 14.049 18 11.766 18 8a6 6 0 0 0-12 0c0 3.766-1.57 6.049-2.738 7.326" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-zinc-900 dark:text-white">
                            Announcements
                          </p>
                          <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            {isAnnouncementLoading
                              ? "Loading announcements..."
                              : hasAnnouncements
                                ? `${announcements.length} notification${announcements.length === 1 ? "" : "s"}`
                                : "No announcements right now"}
                          </p>
                        </div>
                        <button
                          onClick={() => setIsNotificationOpen(false)}
                          className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
                          aria-label="Close notification"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>

                      {hasAnnouncements && (
                        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
                          {announcements.map((announcement) => (
                            <article
                              key={announcement.id}
                              className="rounded-xl bg-blue-50/50 px-3 py-2 dark:bg-zinc-800/50"
                            >
                              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                {announcement.title}
                              </p>
                              <p className="mt-1 text-[11px] font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {announcement.message}
                              </p>
                              <time className="mt-2 block text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                                {new Date(announcement.createdAt).toLocaleString()}
                              </time>
                            </article>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="relative h-[35px] w-[70px]">
                  <label className="absolute h-[35px] w-full cursor-pointer rounded-[18px] border-2 border-zinc-300 bg-blue-100 dark:border-zinc-600 dark:bg-zinc-800">
                    <input
                      type="checkbox"
                      checked={theme === "dark"}
                      onClick={toggleTheme}
                      onChange={() => {}}
                      className="peer absolute hidden"
                      aria-label="Toggle dark mode"
                    />
                    <span className="absolute h-full w-full rounded-[18px] transition duration-300 before:absolute before:left-[5px] before:top-[4px] before:h-[23px] before:w-[23px] before:rounded-full before:bg-yellow-400 before:shadow-[0_0_8px_rgba(250,204,21,0.4)] before:transition before:duration-300 before:content-[''] peer-checked:before:translate-x-[33px] peer-checked:before:bg-blue-300 peer-checked:before:shadow-[inset_8px_-3px_0px_0px_#94a3b8]" />
                  </label>
                </div>
              </div>
              <span className="hidden sm:inline-block rounded-full bg-white/60 dark:bg-zinc-800/60 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm">
                Spring 2026 Semester
              </span>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
