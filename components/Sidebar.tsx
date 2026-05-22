"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isVisible, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const mainLinks = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/></svg>
      ),
    },
    {
      label: "Course Planner",
      href: "/dashboard/planner",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
      ),
    },
    {
      label: "My Schedule",
      href: "/dashboard/schedule",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      ),
    },
  ];

  const academicLinks = [
    {
      label: "Academic History",
      href: "/dashboard/history",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
      ),
    },
    {
      label: "Semester Calendar",
      href: "/dashboard/semester-calendar",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>
      ),
    },
    {
      label: "Course Catalog",
      href: "/dashboard/catalog",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
      ),
    },
    {
      label: "Future Planning",
      href: "/dashboard/future",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      ),
    },
    {
      label: "CGPA Calculator",
      href: "/dashboard/cgpa",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v10"/><path d="M7 12h10"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
      ),
    },
  ];

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl text-zinc-600 dark:text-zinc-400 flex flex-col font-sans transition-all duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand / Logo */}
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">University Course Planner</span>
        </div>
        <button
          onClick={onToggle}
          className="relative h-10 w-10 shrink-0 cursor-pointer rounded-full bg-[#eeeeee] text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.14)] transition-transform duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110 active:scale-90"
          aria-label="Close sidebar"
        >
          <span className="absolute left-1/2 top-1/2 block h-[3px] w-[20px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#596778] transition-transform duration-200" />
          <span className="absolute left-1/2 top-1/2 block h-[3px] w-[20px] -translate-x-1/2 -translate-y-1/2 scale-x-0 rounded-full bg-[#596778] transition-transform duration-200" />
          <span className="absolute left-1/2 top-1/2 block h-[3px] w-[20px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#596778] transition-transform duration-200" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {mainLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "hover:bg-white/60 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span className={isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}

        <div className="my-6 border-t border-zinc-200/50 dark:border-zinc-800/50 mx-2" />

        {academicLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "hover:bg-white/60 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span className={isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <button
          onClick={logout}
          className="group/logout relative mb-4 flex h-[45px] w-[45px] cursor-pointer items-center justify-start overflow-hidden rounded-full border-0 bg-[rgb(255,65,65)] shadow-[2px_2px_10px_rgba(0,0,0,0.199)] transition-all duration-300 hover:w-[125px] hover:rounded-[40px] active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Logout"
        >
          <div className="flex w-full items-center justify-center transition-all duration-300 group-hover/logout:w-[30%] group-hover/logout:pl-5">
            <svg viewBox="0 0 512 512" className="w-[17px]" aria-hidden="true">
              <path
                fill="white"
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
          </div>
          <div className="absolute right-0 w-0 text-[1.2em] font-semibold text-white opacity-0 transition-all duration-300 group-hover/logout:w-[70%] group-hover/logout:pr-2.5 group-hover/logout:opacity-100">
            Logout
          </div>
        </button>
        <div className="flex w-full items-center gap-3 rounded-xl bg-white/60 p-3 shadow-sm backdrop-blur-sm transition-colors duration-500 hover:bg-white/80 dark:bg-zinc-800/60 dark:shadow-none dark:hover:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-sm dark:from-zinc-700 dark:to-zinc-800 dark:shadow-none">
            <svg viewBox="0 0 128 128" className="h-12 w-12" aria-hidden="true">
              <circle r="60" fill="transparent" cy="64" cx="64" />
              <circle r="48" fill="transparent" cy="64" cx="64" />
              <path fill="#191919" d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" />
              <path opacity="1" fill="#191919" d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z" />
              <circle r="7" fill="#fbc0aa" cy="65" cx="89" />
              <path fill="#4bc190" d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z" />
              <path opacity=".3" fill="#356cb6" d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z" />
              <path opacity=".3" fill="#356cb6" d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z" />
              <path fill="#fff" d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z" />
              <path strokeWidth="14" strokeLinejoin="round" strokeLinecap="round" stroke="#fbc0aa" fill="none" d="m64 88.75v9.75" />
              <circle r="7" fill="#fbc0aa" cy="65" cx="39" />
              <path fill="#ffd8ca" d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" />
              <path fill="#191919" d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z" />
              <path className="fill-none stroke-white opacity-10" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5" />
              <path className="fill-none stroke-white opacity-10" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3" />
              <circle r="3" fill="#515570" cy="62.28" cx="76" />
              <circle r="3" fill="#515570" cy="62.28" cx="52" />
              <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="50.42" />
              <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="77.58" />
              <g strokeLinejoin="round" strokeLinecap="round" fill="none">
                <path strokeWidth="4" stroke="#fbc0aa" d="m64 67v4" />
                <path strokeWidth="2" stroke="#515570" opacity=".2" d="m55 56h-9.25" />
                <path strokeWidth="2" stroke="#515570" opacity=".2" d="m82 56h-9.25" />
              </g>
              <path opacity=".4" fill="#f85565" d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z" />
              <path fill="#f85565" d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.5px] text-zinc-800 dark:text-white">
              {user?.fullName}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
