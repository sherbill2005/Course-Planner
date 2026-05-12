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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Student Login</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Access your course planner</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Student ID</label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              placeholder="e.g. STU-123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
