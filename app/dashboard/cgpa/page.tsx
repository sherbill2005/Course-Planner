"use client";

import { useState, useMemo } from "react";

type Grade = "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "F";

interface CourseGrade {
  id: string;
  name: string;
  credits: number;
  grade: Grade;
}

interface Semester {
  id: string;
  name: string;
  courses: CourseGrade[];
}

const GRADE_POINTS: Record<Grade, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0,
};

const GRADES = Object.keys(GRADE_POINTS) as Grade[];

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "sem-1",
      name: "Semester 1",
      courses: [{ id: "c-1", name: "", credits: 3, grade: "A" }],
    },
  ]);

  const addSemester = () => {
    const newId = `sem-${semesters.length + 1}`;
    setSemesters([
      ...semesters,
      {
        id: newId,
        name: `Semester ${semesters.length + 1}`,
        courses: [{ id: `c-${Date.now()}`, name: "", credits: 3, grade: "A" }],
      },
    ]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length === 1) return;
    setSemesters(semesters.filter((s) => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: [
                ...s.courses,
                { id: `c-${Date.now()}`, name: "", credits: 3, grade: "A" },
              ],
            }
          : s
      )
    );
  };

  const updateCourse = (
    semId: string,
    courseId: string,
    field: keyof CourseGrade,
    value: string | number
  ) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: s.courses.map((c) =>
                c.id === courseId ? { ...c, [field]: value } : c
              ),
            }
          : s
      )
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: s.courses.length > 1 
                ? s.courses.filter((c) => c.id !== courseId)
                : s.courses,
            }
          : s
      )
    );
  };

  const stats = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;

    const semesterStats = semesters.map((sem) => {
      let semCredits = 0;
      let semPoints = 0;

      sem.courses.forEach((c) => {
        semCredits += Number(c.credits);
        semPoints += Number(c.credits) * GRADE_POINTS[c.grade];
      });

      totalCredits += semCredits;
      totalPoints += semPoints;

      return {
        id: sem.id,
        gpa: semCredits > 0 ? (semPoints / semCredits).toFixed(2) : "0.00",
        credits: semCredits,
      };
    });

    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    return { cgpa, totalCredits, semesterStats };
  }, [semesters]);

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">CGPA Calculator</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Calculate your semester GPA and overall CGPA</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-8">
          {semesters.map((sem, semIdx) => {
            const semStat = stats.semesterStats.find(s => s.id === sem.id);
            return (
              <section key={sem.id} className="overflow-hidden rounded-[30px] border border-zinc-100 bg-white text-zinc-900 shadow-sm dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
                <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-700 dark:bg-[#2a2a2a]">
                  <div className="flex items-center gap-4">
                    <h3 className="font-bold text-zinc-900 dark:text-white">{sem.name}</h3>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      GPA: {semStat?.gpa}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeSemester(sem.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Remove Semester
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4 grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <div className="col-span-6">Course Name</div>
                    <div className="col-span-3">Credits</div>
                    <div className="col-span-2">Grade</div>
                    <div className="col-span-1"></div>
                  </div>

                  <div className="space-y-3">
                    {sem.courses.map((course) => (
                      <div key={course.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <input
                            type="text"
                            placeholder="e.g. Data Structures"
                            value={course.name}
                            onChange={(e) => updateCourse(sem.id, course.id, "name", e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={course.credits}
                            onChange={(e) => updateCourse(sem.id, course.id, "credits", Number(e.target.value))}
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
                          />
                        </div>
                        <div className="col-span-2">
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(sem.id, course.id, "grade", e.target.value as Grade)}
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
                          >
                            {GRADES.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                          <button 
                            onClick={() => removeCourse(sem.id, course.id)}
                            className="text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addCourse(sem.id)}
                    className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    Add Course
                  </button>
                </div>
              </section>
            );
          })}

          <button
            onClick={addSemester}
            className="w-full rounded-2xl border-2 border-dashed border-zinc-200 py-8 text-sm font-bold text-zinc-500 transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 dark:border-zinc-800 dark:hover:border-blue-900/50 dark:hover:bg-blue-900/10 dark:hover:text-blue-400"
          >
            + Add Another Semester
          </button>
        </div>

        <div className="space-y-6">
          <section className="sticky top-24 rounded-[30px] border border-zinc-100 bg-white p-6 text-zinc-900 shadow-sm dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
            <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Results Summary</h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Cumulative GPA</p>
                <div className="mt-1 text-5xl font-black text-blue-600 dark:text-blue-400">
                  {stats.cgpa}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-blue-100 pt-6 dark:border-blue-900/30">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Credits</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{stats.totalCredits}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Semesters</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{semesters.length}</p>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-[#2a2a2a]">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Grade Distribution</p>
                <div className="space-y-2">
                  {stats.semesterStats.map((s, i) => (
                    <div key={s.id} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Semester {i + 1}</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{s.gpa}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
