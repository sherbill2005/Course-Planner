"use client";

const SEMESTER_EVENTS = [
  {
    title: "Midterm Week",
    date: "March 10 - March 15, 2026",
    description: "Midterm assessments scheduled across enrolled courses.",
    category: "Exams",
  },
  {
    title: "Assignment Deadlines",
    date: "April 5, 2026",
    description: "Major assignment submissions are due for the semester.",
    category: "Coursework",
  },
  {
    title: "Project Submission",
    date: "May 2, 2026",
    description: "Final project deliverables and documentation are due.",
    category: "Project",
  },
  {
    title: "Final Exams",
    date: "May 20 - May 30, 2026",
    description: "Final examination period for Spring 2026 semester.",
    category: "Finals",
  },
];

export default function SemesterCalendarPage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Semester Calendar
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Key academic dates and semester milestones
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {SEMESTER_EVENTS.map((event) => (
          <div
            key={event.title}
            className="rounded-[30px] border border-zinc-100 bg-white p-6 text-zinc-900 shadow-sm transition-all dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#6340F0]">
                  {event.date}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {event.category}
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
