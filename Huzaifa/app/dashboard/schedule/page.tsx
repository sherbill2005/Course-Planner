"use client";

import Timetable from "@/components/Timetable";

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">My Schedule</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Your full weekly timetable and class sessions</p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Timetable />
      </div>
    </div>
  );
}
