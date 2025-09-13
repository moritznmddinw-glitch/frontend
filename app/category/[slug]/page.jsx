"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CategoryThreadsPage() {
  const params = useParams();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/threads/category/${params.slug}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setThreads(data.threads || []))
      .finally(() => setLoading(false));
  }, [API, params.slug]);

  return (
    <section className="max-w-3xl mx-auto w-full py-6 md:py-10 px-3">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-tight">
            {params.slug.replace(/-/g, " ")}
          </h1>
          <p className="text-neutral-600 text-sm mt-1">Diskusi dan thread terbaru seputar kategori ini.</p>
        </div>
        <Link
          href={`/category/${params.slug}/new`}
          className="inline-block px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-neutral-900 transition"
        >
          + Buat Thread
        </Link>
      </header>
      {loading ? (
        <div className="text-center py-10 text-neutral-500">Memuat thread...</div>
      ) : threads.length === 0 ? (
        <div className="text-center py-10 text-neutral-400">Belum ada thread di kategori ini.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {threads.map(thread => (
            <Link
              key={thread.id}
              href={`/thread/${thread.id}`}
              className="group border rounded-2xl bg-white p-5 flex flex-col shadow hover:shadow-lg transition-all"
            >
              <h2 className="font-semibold text-lg md:text-xl group-hover:text-blue-700 line-clamp-2">{thread.title}</h2>
              <p className="text-neutral-700 text-sm mt-2 line-clamp-3">{thread.summary}</p>
              <div className="flex items-center gap-2 text-xs mt-4 text-neutral-500">
                <span>Dibuat oleh</span>
                <Link
                  href={`/user/${thread.username}`}
                  className="underline font-medium group-hover:text-blue-700"
                  onClick={e => e.stopPropagation()}
                >
                  @{thread.username}
                </Link>
                <span>•</span>
                <span>{new Date(thread.created_at * 1000).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
