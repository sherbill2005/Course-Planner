"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrolledAt: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const s = localStorage.getItem("students");
    const a = localStorage.getItem("announcements");
    if (s) setStudents(JSON.parse(s));
    if (a) setAnnouncements(JSON.parse(a));
  }, []);

  const stats = [
    {
      label: "Total Students",
      value: students.length,
      color: "bg-violet-50 text-violet-700 border-violet-200",
      icon: (
        <svg className="h-6 w-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Announcements Sent",
      value: announcements.length,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: (
        <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      label: "Courses Available",
      value: (() => {
        const c = localStorage.getItem("courses");
        return c ? JSON.parse(c).length : 0;
      })(),
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: (
        <svg className="h-6 w-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { href: "/admin/students", label: "Manage Students", desc: "Add or remove student records", color: "hover:border-violet-300" },
    { href: "/admin/courses", label: "Manage Courses", desc: "Add or delete university courses", color: "hover:border-blue-300" },
    { href: "/admin/announcements", label: "Send Announcement", desc: "Broadcast messages to all students", color: "hover:border-emerald-300" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Welcome back, Admin 👋</h1>
          <p className="mt-1 text-sm text-zinc-500">Here's what's happening in University Course Planner.</p>
        </div>
        <a
          href="http://localhost:3000/dashboard"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          Go to Student Dashboard
        </a>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`flex items-center gap-4 rounded-xl border p-5 bg-white shadow-sm ${stat.color}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium opacity-80">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-zinc-800">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition ${link.color} hover:shadow-md`}
            >
              <span className="text-sm font-semibold text-zinc-900">{link.label}</span>
              <span className="text-xs text-zinc-500">{link.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Students */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-zinc-800">Recent Students</h2>
        {students.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-400">
            No students added yet. Go to <Link href="/admin/students" className="text-violet-600 underline">Manage Students</Link> to add some.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {students.slice(-5).reverse().map((s) => (
                  <tr key={s.id} className="hover:bg-zinc-50">
                    <td className="px-5 py-3 font-medium text-zinc-800">{s.name}</td>
                    <td className="px-5 py-3 text-zinc-500">{s.email}</td>
                    <td className="px-5 py-3 text-zinc-500">{s.course}</td>
                    <td className="px-5 py-3 text-zinc-400">{new Date(s.enrolledAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
