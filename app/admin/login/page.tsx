"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem(
        "admin",
        JSON.stringify({
          email,
          role: "ADMIN",
        }),
      );
      router.push("/admin/dashboard");
      return;
    }

    setError("Invalid admin email or password.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10 text-zinc-950">
      <div className="w-full max-w-[496px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-7 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm">
            <span className="h-4 w-4 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          </div>

          <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-zinc-950">
            Admin login
          </h1>
          <p className="mt-5 text-lg leading-7 text-zinc-700">
            Login to manage University Course Planner.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.06)] sm:px-11 sm:py-9">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="mb-2 block text-base font-medium text-zinc-900"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-base text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                id="email"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                type="email"
                value={email}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-base font-medium text-zinc-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 pr-12 text-base text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  id="password"
                  name="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  {showPassword ? (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3l18 18M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-3.4M9.9 4.24A9.72 9.72 0 0112 4c5 0 8.27 4.11 9.34 5.72a1.93 1.93 0 010 2.56 16.39 16.39 0 01-2.09 2.54M6.53 6.53a16.34 16.34 0 00-3.87 3.19 1.93 1.93 0 000 2.56C3.73 13.89 7 18 12 18a9.52 9.52 0 004.07-.91"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66 10.34a1.96 1.96 0 000 2.32C3.78 14.21 7.05 18 12 18s8.22-3.79 9.34-5.34a1.96 1.96 0 000-2.32C20.22 8.79 16.95 5 12 5S3.78 8.79 2.66 10.34z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <button
              className="h-12 w-full rounded-lg bg-violet-600 px-4 text-base font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
              type="submit"
            >
              Login as Admin
            </button>
          </form>
        </section>

        <p className="mt-9 text-center text-base text-zinc-700">
          Don't have an admin account?{" "}
          <a className="font-semibold text-violet-700 hover:text-violet-800" href="/admin/register">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
