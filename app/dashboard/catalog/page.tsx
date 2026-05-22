"use client";

import { useState } from "react";

const CATALOG_COURSES = [
  { id: "CS101", title: "Introduction to Computer Science", department: "Computer Science", credits: 3, description: "Fundamentals of programming and problem solving.", prerequisites: "None" },
  { id: "MATH201", title: "Calculus II", department: "Mathematics", credits: 4, description: "Integration techniques, sequences, and series.", prerequisites: "MATH101" },
  { id: "PHY101", title: "General Physics I", department: "Physics", credits: 4, description: "Classical mechanics and thermodynamics.", prerequisites: "None" },
  { id: "ENG102", title: "English Composition II", department: "English", credits: 3, description: "Advanced academic writing and research.", prerequisites: "ENG101" },
  { id: "CS202", title: "Data Structures", department: "Computer Science", credits: 3, description: "Advanced data organization and algorithms.", prerequisites: "CS102" },
  { id: "ART101", title: "History of Art", department: "Arts", credits: 2, description: "Survey of world art from antiquity to modern day.", prerequisites: "None" },
];

export default function CourseCatalog() {
  const [search, setSearch] = useState("");

  const filteredCourses = CATALOG_COURSES.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Course Catalog</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Explore all available courses offered by the university</p>
        </div>
        
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
          />
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group rounded-[30px] border border-zinc-100 bg-white p-6 text-zinc-900 shadow-sm transition-all hover:-translate-y-1 dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
            <div className="mb-4 flex items-start justify-between">
              <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                {course.id}
              </span>
              <span className="text-xs font-medium text-zinc-500">{course.credits} Credits</span>
            </div>
            
            <h3 className="mb-2 text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
              {course.title}
            </h3>
            
            <p className="mb-4 text-sm text-zinc-600 line-clamp-2 dark:text-zinc-300">
              {course.description}
            </p>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-zinc-400">Prereq:</span>
              <span className="font-medium text-zinc-900 dark:text-white">{course.prerequisites}</span>
            </div>
            
            <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-700">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{course.department}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
