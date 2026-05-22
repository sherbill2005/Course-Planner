"use client";

import { useEffect, useState, FormEvent } from "react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  type?: "info" | "warning" | "success";
  createdAt: string;
}

const typeConfig = {
  info: { label: "Info", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  warning: { label: "Warning", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  success: { label: "Success", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
};

export default function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "warning" | "success">("info");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/announcements");

      if (!response.ok) {
        setErrorMsg("Failed to load announcements.");
        return;
      }

      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to load announcements:", error);
      setErrorMsg("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setErrorMsg("");

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          type,
        }),
      });

      if (!response.ok) {
        setErrorMsg("Failed to send announcement.");
        return;
      }

      await fetchAnnouncements();
    } catch (error) {
      console.error("Failed to send announcement:", error);
      setErrorMsg("Failed to send announcement.");
      return;
    }

    setTitle(""); setMessage(""); setType("info");
    setShowForm(false);
    setSuccessMsg("Announcement sent to all students!");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  async function handleDelete(id: number) {
    setErrorMsg("");

    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setErrorMsg("Failed to delete announcement.");
        return;
      }

      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      setErrorMsg("Failed to delete announcement.");
      return;
    }

    setDeleteId(null);
    setSuccessMsg("Announcement deleted.");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Announcements</h1>
          <p className="mt-1 text-sm text-zinc-500">Send notifications and announcements to all students.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Announcement
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
          <h2 className="mb-5 text-base font-semibold text-zinc-900">Create Announcement</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Title</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Exam Schedule Update" className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Message</label>
                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Write the announcement message here..." className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 resize-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as "info" | "warning" | "success")} className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100">
                  <option value="info">ℹ️ Info</option>
                  <option value="warning">⚠️ Warning</option>
                  <option value="success">✅ Success</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send to All Students
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-400">
          Loading announcements...
        </div>
      ) : announcements.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-400">
          No announcements sent yet. Click &quot;New Announcement&quot; to broadcast a message.
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => {
            const cfg = typeConfig[a.type || "info"];
            return (
              <div key={a.id} className={`flex gap-4 rounded-xl border p-5 ${cfg.bg} ${cfg.border}`}>
                <div className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-semibold ${cfg.text}`}>{a.title}</h3>
                    <span className="flex-shrink-0 text-xs text-zinc-400">{new Date(a.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600">{a.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text} border ${cfg.border}`}>{cfg.label}</span>
                    <button onClick={() => setDeleteId(a.id)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
            <h3 className="text-base font-semibold text-zinc-900">Delete Announcement?</h3>
            <p className="mt-1 text-sm text-zinc-500">This announcement will be permanently removed.</p>
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
