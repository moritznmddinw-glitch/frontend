"use client";

import { useState } from "react";

export default function SetUsernamePage() {
  const [username, setUsername] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function buildPassphrase() {
    // Gabungkan jawaban menjadi frasa; trimming dan normalisasi spasi
    const parts = [q1, q2, q3].map((s) => (s || "").trim()).filter(Boolean);
    return parts.join(" ");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    let token = "";
    try {
      token = localStorage.getItem("token") || "";
    } catch (_) {}

    if (!token) {
      setError("Anda harus login terlebih dahulu.");
      return;
    }

    const passphrase = buildPassphrase();
    const words = passphrase.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0 || words.length > 12) {
      setError("Kata sandi transfer harus 1-12 kata.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, passphrase }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Gagal menyimpan kredensial");
      }
      setSuccess("Kredensial berhasil dibuat. Anda bisa mulai menggunakan fitur penuh.");
      setUsername("");
      setQ1("");
      setQ2("");
      setQ3("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 border rounded p-6">
      <h2 className="text-xl font-semibold">Lengkapi Kredensial</h2>
      <p className="text-sm text-neutral-600">Buat username publik dan kata sandi transfer (maks 12 kata).</p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full rounded border px-3 py-2 mt-1"
          />
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium">Apa perusahaan yang ingin kamu bangun?</label>
            <input type="text" value={q1} onChange={(e) => setQ1(e.target.value)} className="w-full rounded border px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Jika kamu punya uang 50 miliar, apa yang ingin kamu beli?</label>
            <input type="text" value={q2} onChange={(e) => setQ2(e.target.value)} className="w-full rounded border px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Sebutkan satu tujuan besar hidupmu saat ini</label>
            <input type="text" value={q3} onChange={(e) => setQ3(e.target.value)} className="w-full rounded border px-3 py-2 mt-1" />
          </div>
          <div className="text-xs text-neutral-600">Catatan: Total kata gabungan jawaban maksimum 12 kata.</div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Kredensial"}
        </button>
      </form>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      {success && <div className="mt-3 text-sm text-green-600">{success}</div>}
    </div>
  );
}
