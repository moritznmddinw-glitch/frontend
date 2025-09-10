"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryThreadsPage({ params }) {
  const { category } = use(params);
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [data, setData] = useState({ threads: [], category: category });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`${API}/threads/category/${category}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Gagal memuat threads"))))
      .then((res) => !cancelled && setData(res))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [API, category]);

  useEffect(() => {
    setMounted(true);
    try { setAuthed(!!localStorage.getItem("token")); } catch { setAuthed(false); }
  }, []);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kategori: {humanize(category)}</h2>
        {!mounted ? (
          <span />
        ) : (
          authed && (
            <Link href="/threads/create" className="text-sm px-3 py-1.5 rounded bg-black text-white">Buat Thread</Link>
          )
        )}
      </div>

      {loading ? (
        <div className="mt-4 text-sm">Loading...</div>
      ) : error ? (
        <div className="mt-4 text-sm text-red-600">{error}</div>
      ) : (
        <div className="mt-3 space-y-2">
          {data.threads.length === 0 && (
            <div className="text-sm text-neutral-600">Belum ada thread.</div>
          )}
          {data.threads.map((t) => (
            <article
              key={t.id}
              onClick={() => authed && router.push(`/thread/${t.id}`)}
              onKeyDown={(e) => { if (authed && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); router.push(`/thread/${t.id}`);} }}
              role="button"
              tabIndex={0}
              className={`border rounded p-3 bg-white ${authed ? "hover:bg-neutral-50 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-base">{t.title}</h3>
                <div className="text-xs text-neutral-500">{formatDate(t.created_at)}</div>
              </div>
              <div className="text-sm text-neutral-700 mt-1 line-clamp-2">{t.summary}</div>
              <div className="text-xs text-neutral-600 mt-2 flex items-center gap-2">
                <span>Pembuat:</span>
                <Link href={`/user/${encodeURIComponent(t.username || "")}`} className="underline" onClick={(e) => e.stopPropagation()}>{t.username || "(anon)"}</Link>
              </div>
              {!authed && (
                <div className="mt-2 text-xs text-neutral-500">Login untuk melihat detail</div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(ts) {
  if (!ts) return "";
  try { return new Date(ts * 1000).toLocaleString('id-ID'); } catch { return ""; }
}

function humanize(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
