"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout, isLoading: authLoading } = useAuth();

  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !authLoading && !user) {
      router.push("/");
    }
  }, [isClient, authLoading, user, router]);

  useEffect(() => {
    if (!menuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      setMenuOpen(false);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        alert("Section not found. Please refresh the dashboard and try again.");
      }
    }, 100);
  };

  const handleProfile = () => {
    alert(
      `Student Profile:\n\nName: ${user?.fullName}\nStudent ID: ${user?.studentId}\nSemester: Spring 2026\nModule: Course Management`
    );
    setMenuOpen(false);
  };

  const handleDownloadTimetable = () => {
    setMenuOpen(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleAcademicCalendar = () => {
    alert(
      "Academic Calendar:\n\n• Midterm Week\n• Final Exams\n• Assignment Deadlines\n• Project Submission\n\nNote: These are planned academic milestones for the semester."
    );
    setMenuOpen(false);
  };

  if (!isClient || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-sm font-semibold shadow-xl flex items-center gap-3">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black transition-colors duration-200">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-lg font-extrabold text-zinc-900 dark:text-white sm:text-xl tracking-tight">
                University Course Planner
              </h1>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-500/10 dark:text-blue-300">
                Semester: Spring 2026
              </span>
            </div>

            <p className="mt-1 hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">
              Course enrollment, timetable planning, and clash detection system
            </p>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[180px]">
                {user.fullName}
              </p>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                ID: {user.studentId}
              </p>
            </div>

            <button
              ref={triggerRef}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl font-bold transition-all shadow-sm ${
                menuOpen 
                  ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400" 
                  : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              }`}
              aria-label="Open dashboard menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>

            <button
              onClick={handleLogout}
              className="hidden rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 md:block active:scale-95"
            >
              Logout
            </button>

            {menuOpen && (
              <div 
                ref={menuRef}
                className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="bg-gradient-to-br from-blue-700 via-blue-950 to-black p-5 text-white relative">
                  <div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-blue-400/10 blur-xl" />
                  <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Student Profile
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold truncate">
                    {user.fullName}
                  </h2>

                  <p className="mt-1 text-sm text-blue-100/80">
                    Student ID: {user.studentId}
                  </p>
                </div>

                <div className="space-y-1.5 p-3">
                  <button
                    onClick={handleProfile}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    👤 User Profile
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      View your student account details
                    </span>
                  </button>

                  <button
                    onClick={() => scrollToSection("dashboard-overview")}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    📊 Dashboard Overview
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      Jump to course summary and statistics
                    </span>
                  </button>

                  <button
                    onClick={() => scrollToSection("enrolled-courses")}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    📚 My Enrolled Courses
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      Check courses added to your semester plan
                    </span>
                  </button>

                  <button
                    onClick={() => scrollToSection("timetable")}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    🗓 Timetable
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      Jump to your weekly course schedule
                    </span>
                  </button>

                  <button
                    onClick={handleAcademicCalendar}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    📅 Academic Calendar
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      Midterms, finals, assignments, and submissions
                    </span>
                  </button>

                  <button
                    onClick={handleDownloadTimetable}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    ⬇ Download Timetable
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      Open print dialog to save timetable as PDF
                    </span>
                  </button>

                  <div className="my-2 border-t border-zinc-200 dark:border-zinc-800" />

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-500/10 px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-500/20 dark:text-red-400"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}