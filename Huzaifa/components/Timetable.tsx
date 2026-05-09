"use client";

import { useCourses } from "@/context/CourseContext";
import { Day } from "@/lib/types";

const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

export default function Timetable() {
  const { enrolledCourses } = useCourses();

  const getTimePosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes;
    return (totalMinutes / 60) * 100; // Percentage from the top (8 AM)
  };

  const getTimeDuration = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    const durationMinutes = (endH - startH) * 60 + (endM - startM);
    return (durationMinutes / 60) * 100; // Percentage height
  };

  return (
    <div className="relative min-w-[800px]">
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-2"></div>
        {DAYS.map((day) => (
          <div key={day} className="border-l border-zinc-200 p-2 text-center text-sm font-bold text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            {day}
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="relative grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] bg-white dark:bg-zinc-900">
        {/* Time Labels */}
        <div className="flex flex-col">
          {HOURS.map((hour) => (
            <div key={hour} className="h-20 border-b border-zinc-100 p-2 text-right text-xs text-zinc-400 dark:border-zinc-800/50">
              {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
            </div>
          ))}
        </div>

        {/* Vertical Lines */}
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="relative border-l border-zinc-100 dark:border-zinc-800/50">
            {/* Horizontal Hour Lines */}
            {HOURS.map((hour) => (
              <div key={hour} className="h-20 border-b border-zinc-100 dark:border-zinc-800/50"></div>
            ))}

            {/* Course Blocks */}
            {enrolledCourses.flatMap((course) =>
              course.sessions
                .filter((s) => s.day === day)
                .map((session, i) => {
                  const top = getTimePosition(session.startTime);
                  const height = getTimeDuration(session.startTime, session.endTime);
                  
                  // Simple hash for consistent colors
                  const colors = [
                    "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-200",
                    "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-200",
                    "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/40 dark:border-green-700 dark:text-green-200",
                    "bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900/40 dark:border-orange-700 dark:text-orange-200",
                    "bg-pink-100 border-pink-300 text-pink-800 dark:bg-pink-900/40 dark:border-pink-700 dark:text-pink-200",
                  ];
                  const colorClass = colors[course.id.length % colors.length];

                  return (
                    <div
                      key={`${course.id}-${i}`}
                      className={`absolute left-1 right-1 z-10 rounded border p-2 text-[10px] shadow-sm ${colorClass}`}
                      style={{
                        top: `${(top / (11 * 60)) * (11 * 80)}px`,
                        height: `${(height / (11 * 60)) * (11 * 80)}px`,
                      }}
                    >
                      <p className="font-bold leading-tight">{course.title}</p>
                      <p className="opacity-80">{session.startTime} - {session.endTime}</p>
                    </div>
                  );
                })
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
