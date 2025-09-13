"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ThreadDetailPage({ params }) {
  const { id } = params;
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;

  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Anda harus login untuk melihat thread.");
      setLoading(false);
      return;
    }

    fetch(`${API}/threads/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Gagal memuat thread"))))
      .then((data) => !cancelled && setThread(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [API, id]);

  if (loading) return <div className="text-sm text-neutral-600 mt-4">Loading...</div>;
  if (error) return <div className="text-sm text-red-600 mt-4">{error}</div>;
  if (!thread) return null;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{thread.title}</h1>
        <div className="text-sm text-neutral-500">{formatDate(thread.created_at)}</div>

        <div className="flex items-center gap-2 text-sm">
          <span>Pembuat:</span>
          <Link href={`/user/${encodeURIComponent(thread.user?.username || "")}`} className="underline">
            {thread.user?.username || "Unknown"}
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mt-1">
          <UserBadges username={thread.user?.username} />
        </div>
      </header>

      {thread.summary && (
        <p className="text-sm text-neutral-800 whitespace-pre-wrap">{thread.summary}</p>
      )}

      {thread.image && (
        <img
          src={thread.image}
          alt="Thread Image"
          className="max-w-full rounded-lg border mt-2"
        />
      )}

      <section>
        {thread.content_type === "table" ? (
          <ContentTable content={thread.content} />
        ) : thread.content ? (
          <pre className="text-sm whitespace-pre-wrap bg-neutral-50 border rounded p-3">
            {thread.content}
          </pre>
        ) : (
          <div className="text-sm text-neutral-600">Tidak ada konten.</div>
        )}
      </section>

      {thread.telegram && (
        <div className="mt-4">
          <strong>Contact Telegram:</strong>{" "}
          <Link href={`https://t.me/${thread.telegram.replace(/^@/, "")}`} target="_blank" className="underline text-blue-600">
            {thread.telegram}
          </Link>
        </div>
      )}
    </div>
  );
}

// =====================
// ContentTable + Table + renderValue (sama seperti sebelumnya)
// =====================
function ContentTable({ content }) {
  if (!content) return null;
  if (Array.isArray(content?.sections)) {
    return (
      <div className="space-y-6">
        {content.sections.map((sec, idx) => (
          <div key={idx}>
            {sec.title && <h3 className="font-medium mb-2">{sec.title}</h3>}
            <Table rows={sec.rows || []} />
          </div>
        ))}
      </div>
    );
  }

  let rows = [];
  if (Array.isArray(content?.rows)) rows = content.rows;
  else if (typeof content === "object") rows = Object.entries(content).map(([label, value]) => ({ label, value }));

  if (!rows.length) return <div className="text-sm text-neutral-600">Tidak ada konten.</div>;
  return <Table rows={rows} />;
}

function Table({ rows }) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-neutral-50" : "bg-white"}>
              <td className="align-top p-2 w-40 font-medium">{r.label}</td>
              <td className="align-top p-2">{renderValue(r.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderValue(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return (
    <ul className="list-disc pl-5">
      {value.map((v, i) => <li key={i}>{v}</li>)}
    </ul>
  );
  if (typeof value === "object") return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
  return String(value);
}

// =====================
// UserBadges
// =====================
function UserBadges({ username }) {
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    fetch(`${API}/user/${encodeURIComponent(username)}/badges`)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => !cancelled && setBadges(data.badges || []))
      .catch(() => {});

    return () => { cancelled = true; };
  }, [API, username]);

  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(b => (
        <Link key={b.id} href={`/badge/${b.id}`} className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
          {b.platform}
        </Link>
      ))}
    </div>
  );
}

function formatDate(ts) {
  if (!ts) return "";
  try { return new Date(ts * 1000).toLocaleString(); } catch { return ""; }
}
