"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ThreadDetailPage({ params }) {
  const { id } = use(params);
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuthed = useMemo(() => {
    try { return !!localStorage.getItem("token"); } catch { return false; }
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!isAuthed) {
      setError("Anda harus login untuk melihat thread.");
      setLoading(false);
      return;
    }
    const t = localStorage.getItem("token");
    fetch(`${API}/threads/${id}`, { headers: { Authorization: `Bearer ${t}` }})
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Gagal membaca thread"))))
      .then((res) => !cancelled && setData(res))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [API, id, isAuthed]);

  if (!isAuthed) {
    return <div className="text-sm text-red-600">{error || "Anda harus login untuk melihat thread."}</div>;
  }

  return (
    <div className="max-w-3xl">
      {loading ? (
        <div className="mt-4 text-sm">Loading...</div>
      ) : error ? (
        <div className="mt-4 text-sm text-red-600">{error}</div>
      ) : data ? (
        <div className="space-y-3">
          <header>
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <div className="text-sm text-neutral-600">{formatDate(data.created_at)}</div>
            <div className="mt-2 text-sm flex items-center gap-2">
              <span>Pembuat:</span>
              <Link href={`/user/${encodeURIComponent(data.user?.username || "")}`} className="underline">{data.user?.username}</Link>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <UserBadges username={data.user?.username} />
            </div>
          </header>

          {data.summary && (
            <p className="text-sm text-neutral-800 whitespace-pre-wrap">{data.summary}</p>
          )}

          <section>
            {data.content_type === "table" ? (
              <ContentTable content={data.content} />
            ) : data?.content ? (
              <pre className="text-xs whitespace-pre-wrap bg-neutral-50 border rounded p-2">{JSON.stringify(data.content, null, 2)}</pre>
            ) : (
              <div className="text-sm text-neutral-600">Tidak ada konten.</div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}

function ContentTable({ content }) {
  // Expecting a structure inspired by Hugging Face dataset cards, implement flexible rendering
  // We accept either { rows: [{label, value}], sections: [{title, rows: [...] }] } or a flat key/value map.
  if (!content) return null;
  let rows = [];
  if (Array.isArray(content?.rows)) rows = content.rows;
  else if (Array.isArray(content?.sections)) {
    return (
      <div className="space-y-4">
        {content.sections.map((sec, idx) => (
          <div key={idx}>
            {sec.title && <h3 className="font-medium mb-2">{sec.title}</h3>}
            <Table rows={sec.rows || []} />
          </div>
        ))}
      </div>
    );
  } else if (typeof content === "object") {
    rows = Object.entries(content).map(([label, value]) => ({ label, value }));
  }
  if (!rows || rows.length === 0) {
    return <div className="text-sm text-neutral-600">Tidak ada konten.</div>;
  }
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
              <td className="align-top p-2">
                {renderValue(r.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderValue(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return (
    <ul className="list-disc pl-4">
      {v.map((x, i) => <li key={i}>{String(x)}</li>)}
    </ul>
  );
  if (typeof v === "object") return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</pre>;
  return String(v);
}

function UserBadges({ username }) {
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    fetch(`${API}/user/${encodeURIComponent(username)}/badges`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => !cancelled && setBadges(data.badges || []))
      .catch(() => {})
    return () => { cancelled = true; };
  }, [API, username]);
  if (!badges || badges.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
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
