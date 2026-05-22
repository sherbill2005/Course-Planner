"use client";

import Link from "next/link";
import { useCourses } from "@/context/CourseContext";
import { useAuth } from "@/context/AuthContext";
import Timetable from "@/components/Timetable";
import { RippleButton } from "@/registry/magicui/ripple-button";

export default function DashboardPage() {
  const { enrolledCourses } = useCourses();
  const { user } = useAuth();

  // Overview Stats
  const totalEnrolled = enrolledCourses.length;
  const totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);

  // Dummy CGPA for overview (In a real app, this would come from a database or shared state)
  const currentCGPA = "3.85";

  // Degree progress (hardcoded — kept as-is per instructions)
  const degreeProgress = 65;

  const stats = [
    {
      label: "Enrolled Courses",
      value: totalEnrolled,
      color: "blue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M8 7h6"/><path d="M8 11h8"/>
        </svg>
      ),
    },
    {
      label: "Credit Hours",
      value: totalCredits,
      color: "emerald",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6"/>
        </svg>
      ),
    },
    {
      label: "Current CGPA",
      value: currentCGPA,
      color: "purple",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 14 4-4"/>
          <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
        </svg>
      ),
    },
    {
      label: "Degree Progress",
      value: `${degreeProgress}%`,
      color: "orange",
      progress: degreeProgress,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; bar: string; text: string }> = {
    blue:    { bg: "bg-blue-500/10",    icon: "text-blue-600 dark:text-blue-400",    bar: "bg-blue-600",    text: "text-blue-600 dark:text-blue-400" },
    emerald: { bg: "bg-emerald-500/10", icon: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
    purple:  { bg: "bg-purple-500/10",  icon: "text-purple-600 dark:text-purple-400",  bar: "bg-purple-500",  text: "text-purple-600 dark:text-purple-400" },
    orange:  { bg: "bg-orange-500/10",  icon: "text-orange-600 dark:text-orange-400",  bar: "bg-orange-500",  text: "text-orange-600 dark:text-orange-400" },
  };

  return (
    <div className="space-y-12">

      {/* Welcome Section */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Spring 2026 Semester
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Welcome back, {user?.fullName?.split(" ")[0] || "Student"} 👋
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Here&apos;s a snapshot of your academic progress this semester.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href="http://localhost:3001/admin/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            Admin Panel
          </a>
          <RippleButton
            href="/dashboard/planner"
            rippleColor="#ADD8E6"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M8 7h6"/><path d="M8 11h8"/>
            </svg>
            Course Planner
          </RippleButton>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const c = colorMap[stat.color];
            return (
              <div
                key={stat.label}
                className="relative min-h-[180px] overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/80 p-8 text-zinc-900 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:text-white"
              >
                <div className="relative z-[1]">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`rounded-2xl p-3 ${c.bg}`}>
                      <span className={c.icon}>{stat.icon}</span>
                    </div>
                    <span className={`text-3xl font-black tabular-nums ${c.text}`}>
                      {stat.value}
                    </span>
                  </div>

                  <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-300">
                    {stat.label}
                  </p>
                  {/* Progress bar for Degree Progress card */}
                  {stat.progress !== undefined && (
                    <div className="mt-4">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                        <div
                          className={`h-full rounded-full ${c.bar} transition-all duration-700`}
                          style={{ width: `${stat.progress}%` }}
                        />
                      </div>
                      <p className="mt-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-300">
                        {stat.progress}% COMPLETED
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timetable Preview */}
      <section>
        <div className="mb-6 flex items-end justify-between px-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Weekly Timetable
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Your active schedule for Spring 2026
            </p>
          </div>
          {totalEnrolled > 0 && (
            <Link
              href="/dashboard/schedule"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:opacity-70 transition-opacity"
            >
              VIEW FULL SCHEDULE →
            </Link>
          )}
        </div>
        <div className="overflow-hidden rounded-[30px] border border-zinc-200/50 bg-white/80 text-zinc-900 shadow-2xl backdrop-blur-xl transition-all dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:text-white">
          {totalEnrolled === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800 p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300">No schedule yet</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-zinc-400 dark:text-zinc-500 font-medium">
                Enroll in courses via the{" "}
                <Link href="/dashboard/planner" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Course Planner
                </Link>{" "}
                to generate your timetable.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto p-6">
              <Timetable />
            </div>
          )}
        </div>
      </section>

      {/* Bottom grid: Enrolled Courses + Quick Actions */}
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">

        {/* Enrolled Courses */}
        <section className="xl:col-span-2">
          <div className="mb-6 flex items-end justify-between px-2">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Enrolled Courses
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                {totalCredits} total credit hours this semester
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[30px] border border-zinc-100 bg-white py-16 text-center text-zinc-900 shadow-sm transition-all dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
                <div className="mb-4 rounded-3xl bg-zinc-50 dark:bg-zinc-800 p-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                    <path d="M8 7h6"/><path d="M8 11h8"/>
                  </svg>
                </div>
                <p className="text-base font-bold text-zinc-700 dark:text-zinc-300">No courses enrolled yet</p>
                <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500 font-medium">
                  Head to the Course Planner to get started.
                </p>
                <Link
                  href="/dashboard/planner"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 px-5 py-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all shadow-sm"
                >
                  Browse Catalog →
                </Link>
              </div>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="relative flex items-center justify-between rounded-[30px] border border-zinc-100 bg-white py-6 pl-8 pr-6 text-zinc-900 shadow-sm transition-all dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]"
                >
                  {/* Left accent stripe */}
                  <span className="absolute left-0 top-0 h-full w-[4px] rounded-l-3xl bg-gradient-to-b from-blue-600 to-indigo-600" />

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-medium">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{course.id}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300" />
                      <span>{course.instructor}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300" />
                      <span className="font-bold text-zinc-700 dark:text-zinc-300">{course.credits} cr</span>
                    </div>
                  </div>

                  <span className="ml-4 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-500">
                    ACTIVE
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-6 px-2">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Quick Actions</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium">Helpful shortcuts</p>
          </div>

          <div className="space-y-4">
            {[
              {
                href: "/dashboard/schedule",
                title: "View Full Schedule",
                desc: "Check your detailed weekly timetable and locations.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                ),
              },
              {
                href: "/dashboard/cgpa",
                title: "CGPA Calculator",
                desc: "Predict grades and see how they affect your CGPA.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7v10"/><path d="M7 12h10"/>
                    <rect width="18" height="18" x="3" y="3" rx="2"/>
                  </svg>
                ),
              },
              {
                href: "/dashboard/degree",
                title: "Degree Progress",
                desc: "Track completed requirements and graduation path.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                ),
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-start gap-5 rounded-[30px] border border-zinc-100 bg-white p-6 text-zinc-900 shadow-sm transition-all dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]"
              >
                <div className="mt-1 rounded-2xl bg-blue-50/50 dark:bg-blue-500/10 p-3 text-zinc-400 dark:text-zinc-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-400">
                  {action.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-800 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {action.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
