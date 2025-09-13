"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThreadDetailPage({ params }) {
  const { id } = params;
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAuthed = typeof window !== "undefined" ? !!localStorage.getItem("token") : false;

  useEffect(() => {
    if (!isAuthed) {
      setError("Anda harus login untuk melihat thread.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    const token = localStorage.getItem("token");

    fetch(`${API}/threads/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => (res.ok ? res.json() : Promise.reject(new Error("Gagal membaca thread"))))
      .then(json => !cancelled && setData(json))
      .catch(err => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [API, id, isAuthed]);

  if (!isAuthed) return <div className="text-sm text-red-600">{error || "Anda harus login untuk melihat thread."}</div>;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      {loading ? (
        <div className="text-sm">Loading...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : data ? (
        <div className="space-y-5 bg-white rounded-2xl shadow-md p-7 border">
          {/* Header */}
          <header>
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <div className="text-sm text-neutral-500 mt-1">{formatDate(data.created_at)}</div>
            <div className="mt-2 text-sm flex items-center gap-2">
              <span>Pembuat:</span>
              <Link href={`/user/${encodeURIComponent(data.user?.username || "")}`} className="underline">
                {data.user?.username}
              </Link>
            </div>
            {data.category && (
              <div className="mt-1 text-sm text-neutral-600">
                Kategori: <span className="capitalize">{data.category.slug.replace(/-/g, " ")}</span>
              </div>
            )}
          </header>

          {/* Summary */}
          {data.summary && (
            <p className="text-sm text-neutral-800 whitespace-pre-wrap mt-3">{data.summary}</p>
          )}

          {/* Content */}
          <div className="mt-4">
            {data.content_type === "table" ? (
              <ContentTable content={data.content} />
            ) : (
              <pre className="text-sm whitespace-pre-wrap bg-neutral-50 border rounded p-3">
                {data.content || "Tidak ada konten."}
              </pre>
            )}
          </div>

          {/* Image */}
          {data.meta?.image && (
            <div className="mt-4">
              <img src={data.meta.image} alt="Gambar Thread" className="rounded max-w-full border" />
            </div>
          )}

          {/* Telegram */}
          {data.telegram && (
            <div className="mt-4 text-sm">
              <span className="font-medium">Contact Telegram: </span>
              <a href={`https://t.me/${data.telegram.replace(/^@/, "")}`} target="_blank" className="underline text-blue-600">
                {data.telegram}
              </a>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

// -------------------- Helper Components --------------------
function ContentTable({ content }) {
  if (!content) return <div className="text-sm text-neutral-600">Tidak ada konten.</div>;

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

function renderValue(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v))
    return (
      <ul className="list-disc pl-4">
        {v.map((x, i) => (
          <li key={i}>{String(x)}</li>
        ))}
      </ul>
    );
  if (typeof v === "object") return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</pre>;
  return String(v);
}

function formatDate(ts) {
  if (!ts) return "";
  try {
    return new Date(ts * 1000).toLocaleString();
  } catch {
    return "";
  }
}
