"use client";

const DEGREE_REQUIREMENTS = [
  {
    category: "Core Computer Science",
    required: 60,
    completed: 45,
    courses: [
      { id: "CS101", title: "Intro to CS", status: "Completed" },
      { id: "CS102", title: "Programming II", status: "Completed" },
      { id: "CS201", title: "Data Structures", status: "In Progress" },
      { id: "CS301", title: "Algorithms", status: "Planned" },
    ]
  },
  {
    category: "Mathematics",
    required: 20,
    completed: 12,
    courses: [
      { id: "MATH101", title: "Calculus I", status: "Completed" },
      { id: "MATH201", title: "Calculus II", status: "Completed" },
      { id: "MATH301", title: "Linear Algebra", status: "Planned" },
    ]
  },
  {
    category: "General Education",
    required: 30,
    completed: 15,
    courses: [
      { id: "ENG101", title: "English Comp I", status: "Completed" },
      { id: "HIST101", title: "World History", status: "Withdrawn" },
      { id: "ART101", title: "Art History", status: "Planned" },
    ]
  }
];

export default function DegreeProgress() {
  const totalRequired = DEGREE_REQUIREMENTS.reduce((sum, r) => sum + r.required, 0);
  const totalCompleted = DEGREE_REQUIREMENTS.reduce((sum, r) => sum + r.completed, 0);
  const totalPercentage = Math.round((totalCompleted / totalRequired) * 100);

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Degree Progress</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Track your path towards graduation</p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Overall Completion</p>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{totalPercentage}%</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-500">Credits Earned</p>
            <p className="text-lg font-bold text-blue-600">{totalCompleted} / {totalRequired}</p>
          </div>
        </div>
        
        <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000" 
            style={{ width: `${totalPercentage}%` }}
          />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {DEGREE_REQUIREMENTS.map((req) => {
          const percentage = Math.round((req.completed / req.required) * 100);
          return (
            <div key={req.category} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-bold text-zinc-900 dark:text-white">{req.category}</h4>
                <span className="text-sm font-bold text-blue-600">{percentage}%</span>
              </div>
              
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div 
                  className="h-full bg-blue-600" 
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="space-y-3">
                {req.courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        course.status === 'Completed' ? 'bg-green-500' : 
                        course.status === 'In Progress' ? 'bg-blue-500' : 'bg-zinc-300'
                      }`} />
                      <span className="text-zinc-700 dark:text-zinc-300">{course.title}</span>
                    </div>
                    <span className="text-xs font-medium text-zinc-400">{course.status}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
