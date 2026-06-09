"use client";

import { useCourses } from "@/context/CourseContext";
import { Day } from "@/lib/types";

const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

type CourseSession = {
  day: Day;
  startTime: string;
  endTime: string;
};

export default function Timetable() {
  const { enrolledCourses } = useCourses();

  const coursesWithSessions = enrolledCourses.map((course) => {
    console.log(`[Timetable] Rendering "${course.title}" with ${course.sessions.length} sessions`);
    return {
      ...course,
      sessions: Array.isArray(course.sessions) ? course.sessions : [],
    };
  });

  return (
    <div className="relative min-w-[800px] transition-colors duration-300">
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-zinc-200 dark:border-zinc-800">
        <div className="p-2"></div>

        {DAYS.map((day) => (
          <div
            key={day}
            className="border-l border-zinc-200 dark:border-zinc-800 p-2 text-center text-sm font-bold text-zinc-500 dark:text-zinc-400 transition-colors"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="relative grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] bg-white/60 dark:bg-zinc-900/60 transition-colors">
        {/* Time Labels */}
        <div className="flex flex-col">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-20 border-b border-zinc-100 dark:border-zinc-800/50 p-2 text-right text-xs text-zinc-400 dark:text-zinc-500 transition-colors"
            >
              {hour > 12
                ? `${hour - 12} PM`
                : hour === 12
                ? "12 PM"
                : `${hour} AM`}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {DAYS.map((day) => (
          <div
            key={day}
            className="relative border-l border-zinc-100 dark:border-zinc-800/50 transition-colors"
          >
            {/* Horizontal Hour Lines */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="h-20 border-b border-zinc-100 dark:border-zinc-800/50 transition-colors"
              />
            ))}

            {/* Course Blocks */}
            {coursesWithSessions.flatMap((course) =>
              course.sessions
                .filter((session) => session.day === day)
                .map((session, index) => {
                  const [startH, startM] = session.startTime
                    .split(":")
                    .map(Number);
                  const [endH, endM] = session.endTime.split(":").map(Number);

                  const totalMinutes = (startH - 8) * 60 + startM;
                  const durationMinutes = (endH - startH) * 60 + (endM - startM);

                  const colors = [
                    "bg-[#6340F0]/10 border-[#6340F0]/30 text-[#6340F0]",
                    "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
                    "bg-orange-500/10 border-orange-500/30 text-orange-600",
                    "bg-pink-500/10 border-pink-500/30 text-pink-600",
                    "bg-purple-500/10 border-purple-500/30 text-purple-600",
                  ];

                  const colorClass =
                    colors[String(course.id).length % colors.length];

                  return (
                    <div
                      key={`${course.id}-${session.day}-${session.startTime}-${index}`}
                      className={`absolute left-1 right-1 z-10 rounded-lg border p-2 text-[10px] shadow-sm ${colorClass}`}
                      style={{
                        top: `${(totalMinutes / 60) * 80}px`,
                        height: `${(durationMinutes / 60) * 80}px`,
                      }}
                    >
                      <p className="font-bold leading-tight line-clamp-2">
                        {course.title}
                      </p>

                      <p className="mt-1 opacity-80">
                        {session.startTime} - {session.endTime}
                      </p>
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