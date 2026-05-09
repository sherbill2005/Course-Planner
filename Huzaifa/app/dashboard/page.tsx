"use client";

import { useState } from "react";
import { AVAILABLE_COURSES } from "@/lib/dummyData";
import { useCourses } from "@/context/CourseContext";
import Timetable from "@/components/Timetable";

export default function DashboardPage() {
  const { enrolledCourses, addCourse, removeCourse } = useCourses();
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleAddCourse = (courseId: string) => {
    const result = addCourse(courseId);
    setNotification({ message: result.message, type: result.success ? "success" : "error" });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-8">
      {notification && (
        <div
          className={`fixed right-4 top-20 z-50 rounded-lg px-6 py-3 shadow-lg transition-all ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Your Timetable</h2>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-x-auto">
          <Timetable />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Available Courses</h2>
          <div className="grid gap-4">
            {AVAILABLE_COURSES.map((course) => {
              const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
              return (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {course.id} • {course.instructor} • {course.credits} Credits
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {course.sessions.map((session, i) => (
                        <span
                          key={i}
                          className="rounded bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {session.day}: {session.startTime} - {session.endTime}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => isEnrolled ? removeCourse(course.id) : handleAddCourse(course.id)}
                    className={`ml-4 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      isEnrolled
                        ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isEnrolled ? "Remove" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Enrolled Courses</h2>
          <div className="grid gap-4">
            {enrolledCourses.length === 0 ? (
              <p className="text-zinc-500 dark:text-zinc-400">You haven't enrolled in any courses yet.</p>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-900/30 dark:bg-blue-900/10"
                >
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{course.id}</p>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="text-sm font-semibold text-red-600 hover:underline dark:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
