"use client";

const HISTORY_DATA = [
  {
    semester: "Fall 2025",
    gpa: "3.90",
    courses: [
      { id: "CS101", title: "Intro to Computer Science", credits: 3, grade: "A", status: "Completed" },
      { id: "MATH101", title: "Calculus I", credits: 4, grade: "A-", status: "Completed" },
      { id: "ENG101", title: "English Composition", credits: 3, grade: "A", status: "Completed" },
    ]
  },
  {
    semester: "Spring 2025",
    gpa: "3.75",
    courses: [
      { id: "CS102", title: "Programming II", credits: 3, grade: "B+", status: "Completed" },
      { id: "PHY101", title: "Physics I", credits: 4, grade: "A", status: "Completed" },
      { id: "HIST101", title: "World History", credits: 3, grade: "W", status: "Withdrawn" },
    ]
  }
];

const STATUS_COLORS: Record<string, string> = {
  Completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Planned: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  Failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Withdrawn: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function AcademicHistory() {
  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Academic History</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">View your performance across previous semesters</p>
      </header>

      <div className="space-y-8">
        {HISTORY_DATA.map((sem) => (
          <section key={sem.semester} className="overflow-hidden rounded-[30px] border border-zinc-100 bg-white text-zinc-900 shadow-sm dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-700 dark:bg-[#2a2a2a]">
              <h3 className="font-bold text-zinc-900 dark:text-white">{sem.semester}</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Semester GPA:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{sem.gpa}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-100 bg-zinc-50/30 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:border-zinc-700 dark:bg-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Credits</th>
                    <th className="px-6 py-3">Grade</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                  {sem.courses.map((course) => (
                    <tr key={course.id} className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-[#2a2a2a]">
                      <td className="px-6 py-4">
                        <div className="font-bold text-zinc-900 dark:text-white">{course.title}</div>
                        <div className="text-xs text-zinc-500">{course.id}</div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{course.credits}</td>
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">{course.grade}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_COLORS[course.status]}`}>
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
