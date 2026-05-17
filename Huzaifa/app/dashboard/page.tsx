"use client";

import { useMemo, useState } from "react";
import { useCourses } from "@/context/CourseContext";
import Timetable from "@/components/Timetable";

export default function DashboardPage() {
  const {
    availableCourses,
    enrolledCourses,
    loading,
    addCourse,
    removeCourse,
  } = useCourses();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const totalCredits = useMemo(() => {
    return enrolledCourses.reduce((total, course) => total + course.credits, 0);
  }, [enrolledCourses]);

  const remainingCourses = useMemo(() => {
    return availableCourses.filter(
      (course) => !enrolledCourses.some((enrolled) => enrolled.id === course.id)
    );
  }, [availableCourses, enrolledCourses]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCourse = async (courseId: string) => {
    const result = await addCourse(courseId);
    showNotification(result.message, result.success ? "success" : "error");
  };

  const handleRemoveCourse = async (courseId: string) => {
    const result = await removeCourse(courseId);
    showNotification(result.message, result.success ? "success" : "error");
  };

  return (
    <div className="min-h-screen space-y-8">
      {notification && (
        <div
          className={`fixed right-5 top-20 z-50 rounded-2xl px-5 py-3 text-sm font-semibold shadow-2xl ring-1 backdrop-blur ${
            notification.type === "success"
              ? "bg-emerald-500/90 text-white ring-emerald-300/40"
              : "bg-red-500/90 text-white ring-red-300/40"
          }`}
        >
          {notification.message}
        </div>
      )}

      <section
        id="dashboard-overview"
        className="scroll-mt-28 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-950 to-black p-6 sm:p-8">
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute bottom-[-90px] left-[-90px] h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-200">
                University Course Planner
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Course Management Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/80">
                Manage available courses, enrollments, timetable planning, and
                clash detection using real backend database state.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white backdrop-blur">
              <p className="text-xs text-blue-100/70">Current Module</p>
              <p className="mt-1 text-lg font-bold">
                Phase 2: Course Management
              </p>
            </div>
          </div>

          <div className="relative mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100/70">Available Courses</p>

              <h2 className="mt-2 text-3xl font-extrabold text-white">
                {availableCourses.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100/70">Enrolled Courses</p>

              <h2 className="mt-2 text-3xl font-extrabold text-white">
                {enrolledCourses.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100/70">Total Credits</p>

              <h2 className="mt-2 text-3xl font-extrabold text-white">
                {totalCredits}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4 text-sm font-semibold text-blue-700 dark:text-blue-300">
          Loading courses from cloud database...
        </div>
      )}

      <section
        id="timetable"
        className="scroll-mt-28 rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
      >
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
  <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
    Your Timetable
  </h2>

  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
    Weekly schedule view based on enrolled courses
  </p>

  <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-300">
    Section A
  </p>
</div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            Live Schedule
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
          <Timetable />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <section
          id="available-courses"
          className="scroll-mt-28 rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                Available Courses
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Courses fetched from backend API and database
              </p>
            </div>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {remainingCourses.length} left
            </span>
          </div>

          <div className="grid gap-4">
            {availableCourses.length === 0 && !loading ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
                <p className="font-bold text-zinc-800 dark:text-zinc-200">
                  No courses found
                </p>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Add courses in your database first.
                </p>
              </div>
            ) : (
              availableCourses.map((course) => {
                const isEnrolled = enrolledCourses.some(
                  (c) => c.id === course.id
                );

                return (
                  <div
                    key={course.id}
                    className={`group rounded-2xl border p-4 transition-all hover:-translate-y-1 hover:shadow-xl ${
                      isEnrolled
                        ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                        : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                            {course.title}
                          </h3>

                          {isEnrolled && (
                            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                              Enrolled
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {course.id} • {course.instructor} • {course.credits}{" "}
                          Credits
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {course.sessions.map((session, i) => (
                            <span
                              key={i}
                              className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-300"
                            >
                              {session.day}: {session.startTime} -{" "}
                              {session.endTime}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          isEnrolled
                            ? handleRemoveCourse(course.id)
                            : handleAddCourse(course.id)
                        }
                        disabled={loading}
                        className={`rounded-xl px-5 py-2.5 text-sm font-extrabold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                          isEnrolled
                            ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/25"
                            : "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                        }`}
                      >
                        {isEnrolled ? "Remove" : "Add"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section
          id="enrolled-courses"
          className="scroll-mt-28 rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                Enrolled Courses
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Saved in Enrollment table through backend API
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              {totalCredits} credits
            </span>
          </div>

          <div className="grid gap-4">
            {enrolledCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
                <p className="font-bold text-zinc-800 dark:text-zinc-200">
                  No enrolled courses yet
                </p>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Click Add to build your semester plan.
                </p>
              </div>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-blue-200 bg-blue-50 p-4 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-blue-500/20 dark:bg-blue-500/10"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                        {course.title}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {course.id} • {course.credits} Credits
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {course.sessions.map((session, i) => (
                          <span
                            key={i}
                            className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm dark:bg-blue-500/10 dark:text-blue-300"
                          >
                            {session.day}: {session.startTime} -{" "}
                            {session.endTime}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      disabled={loading}
                      className="rounded-xl bg-red-100 px-5 py-2.5 text-sm font-extrabold text-red-700 transition-all hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/25"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}