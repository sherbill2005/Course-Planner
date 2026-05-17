"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register(name, id, password);

    if (!result.success) {
      setError(result.message || "Registration failed");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/95 shadow-2xl lg:grid-cols-2">
          <section className="hidden bg-gradient-to-br from-purple-700 via-blue-950 to-black p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                Student Enrollment System
              </div>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight">
                Start planning your academic journey.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-blue-100/80">
                Create your student account to enroll in courses, view your
                timetable, and manage your semester plan from one dashboard.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h3 className="font-bold text-white">Secure Student Access</h3>
                <p className="mt-1 text-sm text-blue-100/80">
                  Registration creates a student profile connected with backend
                  authentication.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h3 className="font-bold text-white">Course Planning Ready</h3>
                <p className="mt-1 text-sm text-blue-100/80">
                  After registration, students can directly access the course
                  management dashboard.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold text-blue-400">
                  Create account
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-white">
                  Student Registration
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Register with your details to access the University Course
                  Planner.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="e.g. Your Name"
                  />
                </div>

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
                    placeholder="Create a strong password"
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
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-center text-sm text-zinc-400">
                  Already have an account?{" "}
                  <Link
                    href="/"
                    className="font-bold text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>

              <p className="mt-8 text-center text-xs text-zinc-600">
                Course Planner • Student Registration Module
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}