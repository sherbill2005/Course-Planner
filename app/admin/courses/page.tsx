"use client";

import { useEffect, useState, FormEvent } from "react";

interface Course {
  id: number;
  courseCode: string;
  title: string;
  instructor: string;
  credits: number;
  semester: number;
  day: string | null;
  startTime: string | null;
  endTime: string | null;
  createdAt: string;
}

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState("3");
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:30");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/courses");

      if (!response.ok) {
        setErrorMsg("Failed to load courses.");
        return;
      }

      const data = await response.json();
      setCourses(data);
    } catch {
      setErrorMsg("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !code.trim() || !instructor.trim()) return;

    setErrorMsg("");

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        courseCode: code.trim().toUpperCase(),
        instructor: instructor.trim(),
        credits: Number(credits),
        semester: 1,
        day,
        startTime,
        endTime,
      }),
    });

    if (!response.ok) {
      setErrorMsg("Failed to add course.");
      return;
    }

    await fetchCourses();
    setTitle(""); setCode(""); setInstructor(""); setCredits("3");
    setShowForm(false);
    setSuccessMsg("Course added successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  async function handleDelete(id: number) {
    setErrorMsg("");

    const response = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setErrorMsg("Failed to delete course.");
      return;
    }

    setCourses(courses.filter((c) => c.id !== id));
    setDeleteId(null);
    setSuccessMsg("Course deleted successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Courses</h1>
          <p className="mt-1 text-sm text-zinc-500">Add and manage university courses.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </button>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMsg}
        </div>
      )}

      {showForm && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-semibold text-zinc-900">Add New Course</h2>
          <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Course Title</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Data Structures" className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Course Code</label>
              <input required type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. CS301" className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Instructor</label>
              <input required type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="e.g. Dr. Usman Khan" className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Credit Hours</label>
              <select value={credits} onChange={(e) => setCredits(e.target.value)} className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100">
                {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Day</label>
              <select value={day} onChange={(e) => setDay(e.target.value)} className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Start Time</label>
              <input required type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">End Time</label>
              <input required type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">Save Course</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-400">
          Loading courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-400">
          No courses added yet. Click &quot;Add Course&quot; to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.id} className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700">{c.courseCode}</span>
                  <h3 className="mt-1.5 text-sm font-semibold text-zinc-900">{c.title}</h3>
                </div>
                <button onClick={() => setDeleteId(c.id)} className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="space-y-1 text-xs text-zinc-500">
                <p>👨‍🏫 {c.instructor}</p>
                <p>🎓 {c.credits} Credit Hour{c.credits !== 1 ? "s" : ""}</p>
                <p>📅 Added {new Date(c.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-900">Delete Course?</h3>
            <p className="mt-1 text-sm text-zinc-500">This course will be permanently deleted.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700">Yes, Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-lg border border-zinc-300 bg-white py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
