"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function MyThreadsPage() {
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const authed = useMemo(() => {
    try {
      return !!localStorage.getItem("token");
    } catch {
      return false;
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [threads, setThreads] = useState([]);

  // editor state
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", summary: "", content_type: "text", content: "", image: "", telegram: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authed) {
      setLoading(false);
      setError("Anda harus login untuk melihat threads Anda.");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");
    const t = localStorage.getItem("token");
    fetch(`${API}/threads/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Gagal memuat threads"))))
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];
        // sort desc by created_at if present
        list.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
        setThreads(list);
      })
      .catch((e) => !cancelled && setError(e.message || String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [API, authed]);

  function startEdit(th) {
    setOk("");
    setError("");
    setEditingId(th.id);
  // Prefill dari /api/threads/:id agar sama persis dengan data asli
  (async () => {
    try {
      const t = localStorage.getItem("token");
      const res = await fetch(`${API}/threads/${th.id}`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) throw new Error("Gagal memuat detail thread");
      const full = await res.json();
      setForm({
        title: full.title || "",
        summary: full.summary || "",
        content_type: (full.content_type || "text"),
        content:
          (full.content_type || "text") === "text"
            ? (typeof full.content === "string" ? full.content : (full.content ? JSON.stringify(full.content, null, 2) : ""))
            : (full.content ? JSON.stringify(full.content, null, 2) : ""),
        image: (full.meta && full.meta.image) || "",
        telegram: ((full.meta && full.meta.telegram) || "").replace(/^@/, ""),
      });
    } catch (e) {
      setError(String(e.message || e));
    }
  })();
}

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", summary: "", content_type: "text", content: "", image: "", telegram: "" });
  }

  async function saveEdit(id) {
    setSaving(true);
    setOk("");
    setError("");
    try {
      const t = localStorage.getItem("token");
      const body = {
        title: form.title,
        summary: form.summary,
        content_type: form.content_type || "text",
        content: form.content_type === "text" ? form.content : safeParse(form.content),
        meta: {
          image: form.image || undefined,
          telegram: form.telegram ? `@${form.telegram.replace(/^@/, "")}` : undefined,
        },
      };
      const r = await fetch(`${API}/threads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
        body: JSON.stringify(body),
      });
      const txt = await r.text();
      if (!r.ok) throw new Error(txt || "Gagal menyimpan thread");
      let updated;
      try { updated = JSON.parse(txt); } catch { updated = body; }
      // update list locally
      await reloadMyThreads();
      setOk("Thread berhasil diperbarui.");
      setEditingId(null);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setSaving(false);
    }
  }

  if (!authed) return <div className="text-sm text-red-600">{error || "Anda harus login untuk melihat threads Anda."}</div>;

  return (
    <div className="max-w-2xl mx-auto px-3 py-6 space-y-4">
      <h1 className="text-2xl font-semibold">Threads Saya</h1>

      {loading ? (
        <div className="text-sm">Loading...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <div className="space-y-3">
          {threads.length === 0 ? (
            <div className="text-sm text-neutral-600">Anda belum memiliki thread.</div>
          ) : (
            threads.map((th) => (
              <div key={th.id} className="border rounded-lg bg-white p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-medium text-lg">{th.title || "(Tanpa Judul)"}</div>
                    <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-2">
                      <span>{formatDate(th.created_at)}</span>
                      {th.category?.slug && (
                        <>
                          <span>•</span>
                          <Link href={`/category/${encodeURIComponent(th.category.slug)}`} className="underline hover:text-blue-700">
                            {th.category?.name || th.category?.slug}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/thread/${encodeURIComponent(th.id)}`} className="px-3 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-sm">Lihat</Link>
                    <button onClick={() => startEdit(th)} className="px-3 py-1.5 rounded bg-black text-white text-sm">Edit</button>
                  </div>
                </div>

                {editingId === th.id && (
                  <div className="mt-4 border-t pt-4 space-y-3">
                    <div>
                   + <label className="text-sm font-medium">Judul Thread *</label>
                   + <div className="text-xs text-neutral-500 mb-1">Masukkan judul yang jelas</div>

                   + <label className="text-sm font-medium">Ringkasan (optional)</label>
                   + <div className="text-xs text-neutral-500 mb-1">Deskripsi singkat / highlight utama thread</div>

                   + <label className="text-sm font-medium">Tipe Konten</label>

                   + <label className="text-sm font-medium">Konten Thread *</label>
                   + <div className="text-xs text-neutral-500 mb-1">Tuliskan isi thread secara lengkap di sini...</div>

                   + <label className="text-sm font-medium">Gambar (optional)</label>
                   + <div className="text-xs text-neutral-500 mb-1">URL gambar (opsional)</div>

                   + <label className="text-sm font-medium">Contact Telegram *</label>
                   + <div className="text-xs text-neutral-500 mb-1">@username</div> 
                   <div className="flex items-center gap-2 pt-1">
                      <button onClick={() => saveEdit(th.id)} disabled={saving} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
                      <button onClick={cancelEdit} className="px-3 py-2 rounded bg-neutral-100">Batal</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {ok && <div className="text-sm text-green-700">{ok}</div>}
    </div>
  );
}

function formatDate(ts) {
  if (!ts) return "";
  try {
    return new Date(ts * 1000).toLocaleString();
  } catch {
    return "";
  }
}

function safeParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
}

async function reloadMyThreads() {
  const t = localStorage.getItem("token");
  const r = await fetch(`${API}/threads/me`, { headers: { Authorization: `Bearer ${t}` } });
  if (!r.ok) throw new Error("Gagal memuat threads");
  const data = await r.json();
  const list = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];
  list.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
  setThreads(list);
}
