"use client";

import { useState } from "react";

const FUTURE_PLAN = [
  {
    semester: "Fall 2026",
    courses: [
      { id: "CS301", title: "Algorithms", credits: 3 },
      { id: "MATH301", title: "Linear Algebra", credits: 4 },
      { id: "ENG201", title: "Advanced Writing", credits: 3 },
    ]
  },
  {
    semester: "Spring 2027",
    courses: [
      { id: "CS302", title: "Operating Systems", credits: 3 },
      { id: "CS303", title: "Database Systems", credits: 3 },
      { id: "ELECT-1", title: "CS Elective I", credits: 3 },
    ]
  }
];

export default function FuturePlanning() {
  const [plans, setPlans] = useState(FUTURE_PLAN);

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Future Planning</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Draft your academic roadmap for upcoming semesters</p>
        </div>
        
        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
          Add Semester
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {plans.map((sem) => (
          <div key={sem.semester} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{sem.semester}</h3>
              <span className="text-xs font-medium text-zinc-400">
                {sem.courses.reduce((sum, c) => sum + c.credits, 0)} Credits Planned
              </span>
            </div>

            <div className="space-y-3">
              {sem.courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/30">
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">{course.title}</h4>
                    <p className="text-xs text-zinc-500">{course.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-zinc-400">{course.credits} Cr</span>
                    <button className="text-zinc-300 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-100 py-3 text-xs font-bold text-zinc-400 hover:border-blue-200 hover:text-blue-500 transition-all dark:border-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Add Course to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
