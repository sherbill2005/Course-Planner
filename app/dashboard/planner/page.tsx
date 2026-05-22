"use client";

import { useEffect, useState } from "react";
import { useCourses } from "@/context/CourseContext";

type Course = {
  id: number;
  courseCode: string;
  title: string;
  instructor: string;
  credits: number;
  semester: number;
  day?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  prerequisites?: {
    prerequisiteCourse: {
      id: number;
      title: string;
      courseCode: string;
    };
  }[];
};

export default function PlannerPage() {
  const { enrolledCourses, addCourse, removeCourse } = useCourses();

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        setCoursesError("");

        const response = await fetch("/api/courses");

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: Course[] = await response.json();
        setCourses(data);

        // Set default semester to lowest available
        if (data.length > 0) {
          const lowestSemester = Math.min(...data.map(c => c.semester));
          setSelectedSemester(lowestSemester);
        }
      } catch (error) {
        console.log("COURSES_FETCH_ERROR:", error);
        setCoursesError("Failed to load courses from database");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async (courseId: string) => {
    console.log("PLANNER ADD CLICKED:", courseId);

    // Prerequisite Check
    const courseToEnrol = courses.find((c) => String(c.id) === courseId);
    if (courseToEnrol?.prerequisites && courseToEnrol.prerequisites.length > 0) {
      for (const prereq of courseToEnrol.prerequisites) {
        const isPrereqEnrolled = enrolledCourses.some(
          (ec) => ec.id === String(prereq.prerequisiteCourse.id)
        );

        if (!isPrereqEnrolled) {
          setNotification({
            message: `Missing prerequisite: ${prereq.prerequisiteCourse.title}`,
            type: "error",
          });
          setTimeout(() => setNotification(null), 3000);
          return;
        }
      }
    }

    const result = await addCourse(courseId);

    console.log("ADD COURSE RESULT:", result);

    setNotification({
      message: result.message,
      type: result.success ? "success" : "error",
    });

    setTimeout(() => setNotification(null), 3000);
  };

  const filteredCourses = courses.filter(c => c.semester === selectedSemester);
  const enrolledInSemester = filteredCourses.filter(c =>
    enrolledCourses.some(ec => ec.id === String(c.id))
  );
  const totalEnrolledCredits = enrolledInSemester.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="space-y-8">

      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed right-6 top-20 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${
            notification.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          )}
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Course Planner
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Browse and enroll in courses by semester
        </p>
      </header>

      {/* Semester Pill Tabs */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
              selectedSemester === sem
                ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

        {/* Course List — 2/3 width */}
        <section className="xl:col-span-2 space-y-4">

          {/* Loading State */}
          {coursesLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[30px] border border-zinc-100 bg-white p-5 shadow-sm dark:border-0 dark:bg-[#212121] dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] animate-pulse"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2.5">
                      <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-3 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-3 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                    <div className="h-9 w-24 shrink-0 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {coursesError && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/10 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {coursesError}
            </div>
          )}

          {/* Empty State */}
          {!coursesLoading && !coursesError && filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-[30px] border border-zinc-100 bg-white py-16 text-center text-zinc-900 shadow-sm dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
              <div className="mb-3 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
              </div>
              <p className="text-sm font-semibold text-zinc-700 dark:text-white">No courses available</p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Semester {selectedSemester} has no courses in the catalog yet.</p>
            </div>
          )}

          {/* Course Cards */}
          {!coursesLoading && !coursesError && filteredCourses.map((course) => {
            const isEnrolled = enrolledCourses.some(
              (c) => c.id === String(course.id)
            );

            return (
              <div
                key={course.id}
                className={`group relative flex flex-col gap-4 rounded-[30px] border border-zinc-100 bg-white p-5 text-zinc-900 shadow-sm transition-all duration-200 dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] ${
                  isEnrolled
                    ? "ring-1 ring-blue-500/40"
                    : "hover:-translate-y-1"
                }`}
              >
                {/* Enrolled accent stripe */}
                {isEnrolled && (
                  <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-blue-600 dark:bg-blue-500" />
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* Course Info */}
                  <div className="space-y-2 pl-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {course.courseCode}
                      </span>
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {course.credits} Credits
                      </span>
                      {isEnrolled && (
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                          Enrolled
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {course.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        {course.instructor}
                      </span>
                      {course.day && course.startTime && course.endTime && (
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {course.day} · {course.startTime}–{course.endTime}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  {isEnrolled ? (
                    <button
                      onClick={() => removeCourse(String(course.id))}
                      className="group/bin flex h-[55px] w-[55px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[15px] border-[3px] border-[rgb(255,201,201)] bg-[rgb(255,95,95)] transition duration-300 hover:bg-[rgb(255,0,0)] active:scale-90"
                      aria-label="Delete course"
                    >
                      <svg
                        className="w-[17px] origin-right transition duration-300 group-hover/bin:rotate-45"
                        viewBox="0 0 39 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4" />
                        <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3" />
                      </svg>
                      <svg
                        className="w-[15px]"
                        viewBox="0 0 33 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <mask id={`bin-mask-${course.id}`} fill="white">
                          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                        </mask>
                        <path
                          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                          fill="white"
                          mask={`url(#bin-mask-${course.id})`}
                        />
                        <path d="M12 6L12 29" stroke="white" strokeWidth="4" />
                        <path d="M21 6V29" stroke="white" strokeWidth="4" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddCourse(String(course.id))}
                      className="shrink-0 self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700 active:scale-95"
                    >
                      Add Course
                    </button>
                  )}
                </div>

                {/* Prerequisites */}
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-700">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                      Prerequisites:
                    </span>
                    {course.prerequisites.map((p) => (
                      <span
                        key={p.prerequisiteCourse.id}
                        className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                      >
                        {p.prerequisiteCourse.courseCode} · {p.prerequisiteCourse.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Quick Summary Card — 1/3 width */}
        <section className="xl:col-span-1">
          <div className="sticky top-24 rounded-[30px] border border-zinc-100 bg-white p-6 text-zinc-900 shadow-sm dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Quick Summary
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl bg-zinc-50 p-4 text-center dark:bg-[#2a2a2a]">
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{filteredCourses.length}</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Total Courses</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{enrolledInSemester.length}</p>
                <p className="mt-0.5 text-xs text-blue-600/70 dark:text-blue-400/70">Enrolled</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-[#2a2a2a]">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Semester</span>
                <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  Semester {selectedSemester}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-[#2a2a2a]">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Enrolled Credits</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {totalEnrolledCredits} <span className="font-normal text-zinc-400">cr</span>
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-[#2a2a2a]">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Remaining</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {filteredCourses.length - enrolledInSemester.length} <span className="font-normal text-zinc-400">courses</span>
                </span>
              </div>
            </div>

            {enrolledInSemester.length > 0 && (
              <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 dark:bg-emerald-900/10">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  ✓ {enrolledInSemester.length} course{enrolledInSemester.length > 1 ? "s" : ""} enrolled this semester
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
