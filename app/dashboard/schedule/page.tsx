"use client";

import Timetable from "@/components/Timetable";

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">My Schedule</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Your full weekly timetable and class sessions</p>
        </div>
        <button
          onClick={() => window.print()}
          className="print:hidden inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Timetable
        </button>
      </header>

      <div className="print-timetable rounded-[30px] border border-zinc-100 bg-white p-6 text-zinc-900 shadow-sm dark:border-0 dark:bg-[#212121] dark:text-white dark:shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)]">
        <Timetable />
      </div>
    </div>
  );
}
