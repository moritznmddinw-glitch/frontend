"use client";

import { useEffect, useMemo, useState } from "react";

export default function CreateThreadPage() {
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ category_slug: "", title: "", summary: "", content_type: "table", content: { rows: [] } });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthed = useMemo(() => { try { return !!localStorage.getItem("token"); } catch { return false; }}, []);

  useEffect(() => {
    fetch(`${API}/threads/categories`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, [API]);

  function addRow() {
    setForm((f) => ({ ...f, content: { ...f.content, rows: [...(f.content.rows || []), { label: "", value: "" }] } }));
  }
  function updateRow(i, key, val) {
    setForm((f) => {
      const rows = [...(f.content.rows || [])];
      rows[i] = { ...rows[i], [key]: val };
      return { ...f, content: { ...f.content, rows } };
    });
  }
  function removeRow(i) {
    setForm((f) => {
      const rows = [...(f.content.rows || [])];
      rows.splice(i, 1);
      return { ...f, content: { ...f.content, rows } };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!isAuthed) { setError("Anda harus login."); return; }
    setLoading(true);
    try {
      const t = localStorage.getItem("token");
      const r = await fetch(`${API}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error(await r.text() || "Gagal membuat thread");
      const data = await r.json();
      setSuccess(`Thread dibuat (ID ${data.id}).`);
      setForm({ category_slug: "", title: "", summary: "", content_type: "table", content: { rows: [] } });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthed) {
    return <div className="text-sm text-red-600">Anda harus login untuk membuat thread.</div>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold">Buat Thread</h2>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm">Kategori</label>
          <select
            className="w-full rounded border px-3 py-2"
            value={form.category_slug}
            onChange={(e) => setForm((f) => ({ ...f, category_slug: e.target.value }))}
            required
          >
            <option value="">-- pilih kategori --</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Judul</label>
          <input className="w-full rounded border px-3 py-2" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>

        <div>
          <label className="text-sm">Ringkasan</label>
          <textarea className="w-full rounded border px-3 py-2" rows={3} value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm">Konten (tabel)</label>
          <div className="space-y-2">
            {(form.content.rows || []).map((r, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input className="rounded border px-3 py-1.5" placeholder="Label" value={r.label} onChange={(e) => updateRow(i, "label", e.target.value)} />
                <input className="rounded border px-3 py-1.5" placeholder="Value" value={r.value} onChange={(e) => updateRow(i, "value", e.target.value)} />
                <div className="col-span-2 text-right">
                  <button type="button" onClick={() => removeRow(i)} className="text-xs text-red-600">Hapus</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addRow} className="text-sm px-3 py-1.5 rounded bg-neutral-100">+ Tambah baris</button>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? "Menyimpan..." : "Buat Thread"}
          </button>
        </div>
      </form>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      {success && <div className="mt-3 text-sm text-green-600">{success}</div>}
    </div>
  );
}
