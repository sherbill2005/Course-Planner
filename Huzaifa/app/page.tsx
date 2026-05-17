"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(id, password);

    if (!result.success) {
      setError(result.message || "Invalid Student ID or Password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/95 shadow-2xl lg:grid-cols-2">
          <section className="hidden bg-gradient-to-br from-blue-700 via-blue-950 to-black p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                University Course Planner
              </div>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight">
                Plan your semester with confidence.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-blue-100/80">
                Manage courses, avoid timetable clashes, and keep enrollments
                synced with your cloud database.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h3 className="font-bold text-white">Database Connected</h3>
                <p className="mt-1 text-sm text-blue-100/80">
                  Courses and enrollments are handled through backend API routes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h3 className="font-bold text-white">Smart Planning</h3>
                <p className="mt-1 text-sm text-blue-100/80">
                  Clash detection helps students select courses safely.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold text-blue-400">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-white">
                  Student Login
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Enter your Student ID and password to access your course
                  dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Student ID
                  </label>

                  <input
                    type="text"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="e.g. std_123"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-center text-sm text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>

              <p className="mt-8 text-center text-xs text-zinc-600">
                Course Planner • Semester Management System
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}