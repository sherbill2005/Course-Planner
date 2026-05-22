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

  return (
    <div className="space-y-10">
      {notification && (
        <div
          className={`fixed right-8 top-24 z-50 flex items-center gap-3 rounded-xl px-6 py-3 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Course Planner
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Search and enroll in new courses for the semester
          </p>
        </div>
      </header>

      {/* Semester Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-1 dark:border-zinc-800">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-4 py-2 text-sm font-semibold transition-all ${
              selectedSemester === sem
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            Semester {sem}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
        <section className="xl:col-span-2">
          {coursesLoading && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              Loading courses from database...
            </div>
          )}

          {coursesError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
              {coursesError}
            </div>
          )}

          {!coursesLoading && !coursesError && filteredCourses.length === 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              No courses found for Semester {selectedSemester}.
            </div>
          )}

          <div className="grid gap-4">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourses.some(
                (c) => c.id === String(course.id)
              );

              return (
                <div
                  key={course.id}
                  className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-bold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white">
                        {course.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium text-blue-600">
                          {course.courseCode}
                        </span>
                        <span>•</span>
                        <span>{course.instructor}</span>
                        <span>•</span>
                        <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold dark:bg-zinc-800">
                          {course.credits} Credits
                        </span>
                      </div>

                      {course.day && course.startTime && course.endTime && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {course.day}: {course.startTime} - {course.endTime}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        isEnrolled
                          ? removeCourse(String(course.id))
                          : handleAddCourse(String(course.id))
                      }
                      className={`ml-4 shrink-0 rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                        isEnrolled
                          ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isEnrolled ? "Remove" : "Add Course"}
                    </button>
                  </div>

                  {/* Prerequisites Display */}
                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Prerequisites:
                      </span>
                      {course.prerequisites.map((p) => (
                        <span
                          key={p.prerequisiteCourse.id}
                          className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        >
                          {p.prerequisiteCourse.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="mb-6 font-bold text-zinc-900 dark:text-white">
              Quick Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">
                  Selected Semester
                </span>
                <span className="text-sm font-bold">Semester {selectedSemester}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">
                  Total Courses
                </span>
                <span className="text-sm font-bold">{filteredCourses.length}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">
                  Enrolled Courses
                </span>
                <span className="text-sm font-bold">
                  {enrolledInSemester.length}
                </span>
              </div>

              <div className="flex justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">Total Enrolled Credits</span>
                <span className="text-sm font-bold">
                  {enrolledInSemester.reduce((sum, c) => sum + c.credits, 0)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}