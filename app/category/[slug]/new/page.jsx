"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CreateThreadPage() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState({});
  const [telegram, setTelegram] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!telegram.trim()) {
      setError("Contact telegram wajib diisi");
      return;
    }
    if (!title.trim()) {
      setError("Judul thread wajib diisi");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_slug: params.slug,
          title,
          summary,
          content_type: "table",
          content,
          telegram,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Gagal membuat thread");
      }
      setSuccess("Thread berhasil dibuat!");
      setTimeout(() => {
        router.push(`/category/${params.slug}`);
      }, 1100);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto w-full py-10 px-4">
      <div className="mb-7">
        <h2 className="text-2xl font-bold mb-1">Buat Thread Baru</h2>
        <div className="text-neutral-500 text-sm">
          Kategori: <span className="font-medium capitalize">{params.slug.replace(/-/g, " ")}</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-7 space-y-5 border"
        autoComplete="off"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Judul Thread <span className="text-red-500">*</span></label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            maxLength={100}
            onChange={e => setTitle(e.target.value)}
            placeholder="Masukkan judul yang jelas"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Ringkasan (optional)</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 bg-neutral-50 min-h-[70px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            maxLength={300}
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Deskripsi singkat atau highlight utama thread"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Contact Telegram <span className="text-red-500">*</span></label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={telegram}
            maxLength={50}
            onChange={e => setTelegram(e.target.value)}
            placeholder="@username"
          />
        </div>
        {/* Jika ingin, bisa tambah field konten custom lain di sini */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-2.5 rounded-lg bg-black text-white font-semibold transition hover:bg-neutral-900 disabled:opacity-50"
          >
            {loading ? "Membuat..." : "Buat Thread"}
          </button>
        </div>
        {error && <div className="text-sm text-red-600 text-center">{error}</div>}
        {success && <div className="text-sm text-green-600 text-center">{success}</div>}
      </form>
    </section>
  );
}
