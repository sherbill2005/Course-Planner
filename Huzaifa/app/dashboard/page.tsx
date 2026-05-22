"use client";

import Link from "next/link";
import { useCourses } from "@/context/CourseContext";
import { useAuth } from "@/context/AuthContext";
import Timetable from "@/components/Timetable";

export default function DashboardPage() {
  const { enrolledCourses } = useCourses();
  const { user } = useAuth();

  // Overview Stats
  const totalEnrolled = enrolledCourses.length;
  const totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
  
  // Dummy CGPA for overview (In a real app, this would come from a database or shared state)
  const currentCGPA = "3.85"; 

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Welcome back, {user?.fullName?.split(" ")[0] || "Student"}!
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Here's what's happening with your studies this semester.
          </p>
        </div>
        <Link
          href="/dashboard/planner"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all hover:bg-blue-700 dark:shadow-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
          Go to Course Planner
        </Link>
      </section>

      {/* Overview Stats */}
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Enrolled Courses</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalEnrolled}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Credit Hours</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalCredits}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Current CGPA</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{currentCGPA}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Degree Progress</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">65%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timetable Preview */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Current Semester Plan</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Your active weekly schedule for Spring 2026</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          {totalEnrolled === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Timetable is empty</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                Enroll in courses in the <Link href="/dashboard/planner" className="text-blue-600 hover:underline">Course Planner</Link> to generate your schedule.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Timetable />
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
        {/* Recent Activity / Enrolled Courses Summary */}
        <section className="xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Enrolled Courses</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Summary of your current academic load</p>
          </div>
          <div className="grid gap-4">
            {enrolledCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
                <p className="text-zinc-500 dark:text-zinc-400">You haven't enrolled in any courses yet.</p>
                <Link href="/dashboard/planner" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Browse Course Catalog →
                </Link>
              </div>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-zinc-900 dark:text-white">{course.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="font-medium text-blue-600 dark:text-blue-400">{course.id}</span>
                      <span>•</span>
                      <span>{course.instructor}</span>
                      <span>•</span>
                      <span className="font-semibold">{course.credits} Credits</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    Active
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Quick Tips / Links */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Quick Actions</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Helpful shortcuts</p>
          </div>
          <div className="space-y-4">
            <Link 
              href="/dashboard/schedule"
              className="group block rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900/30"
            >
              <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">View Full Schedule</h4>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Check your detailed weekly timetable and classroom locations.</p>
            </Link>
            <Link 
              href="/dashboard/cgpa"
              className="group block rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900/30"
            >
              <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">CGPA Calculator</h4>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Predict your grades and see how they affect your overall CGPA.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

