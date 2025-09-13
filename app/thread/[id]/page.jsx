"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// =====================
// Halaman Thread Detail
// =====================
export default function ThreadDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;

  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const isAuthed = useMemo(() => {
    try {
      return !!localStorage.getItem("token");
    } catch {
      return false;
    }
  }, []);

  const token = useMemo(() => localStorage.getItem("token") || "", []);

  // Fetch thread + replies
  useEffect(() => {
    let cancelled = false;

    if (!isAuthed) {
      setError("Anda harus login untuk melihat thread.");
      setLoading(false);
      return;
    }

    fetch(`${API}/threads/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Gagal membaca thread"))))
      .then((res) => {
        if (!cancelled) {
          setThread(res);
          setReplies(res.replies || []);
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [API, id, isAuthed, token]);

  // Tambah reply
  const handleAddReply = async () => {
    if (!newReply.trim()) return;
    setReplyLoading(true);

    const tempReply = {
      id: `temp-${Date.now()}`,
      content: newReply,
      user: { username: "Anda" },
      created_at: Math.floor(Date.now() / 1000),
      isTemp: true,
    };
    setReplies([...replies, tempReply]);
    setNewReply("");

    try {
      const res = await fetch(`${API}/threads/${id}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: tempReply.content }),
      });
      if (!res.ok) throw new Error("Gagal menambahkan reply");
      const data = await res.json();

      // Replace temp reply dengan data dari server
      setReplies((prev) => prev.map((r) => (r.id === tempReply.id ? data : r)));
    } catch (e) {
      // Remove temp reply on error
      setReplies((prev) => prev.filter((r) => r.id !== tempReply.id));
      alert(e.message);
    } finally {
      setReplyLoading(false);
    }
  };

  if (!isAuthed) return <div className="text-sm text-red-600 mt-4">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {loading ? (
        <div className="text-sm text-neutral-600">Loading...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : thread ? (
        <>
          <ThreadContent thread={thread} />
          <RepliesSection
            replies={replies}
            setReplies={setReplies}
            threadId={id}
            token={token}
            replyLoading={replyLoading}
            newReply={newReply}
            setNewReply={setNewReply}
          />
        </>
      ) : null}
    </div>
  );
}

// =====================
// Komponen ThreadContent
// =====================
function ThreadContent({ thread }) {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold">{thread.title}</h2>
        <div className="text-sm text-neutral-500 mt-1">{formatDate(thread.created_at)}</div>

        <div className="mt-2 text-sm flex items-center gap-2">
          <span>Pembuat:</span>
          <Link
            href={`/user/${encodeURIComponent(thread.user?.username || "")}`}
            className="underline"
          >
            {thread.user?.username || "Unknown"}
          </Link>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
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
          className="max-w-full rounded-md border mt-2"
        />
      )}

      <section>
        {thread.content_type === "table" ? (
          <ContentTable content={thread.content} />
        ) : thread.content ? (
          <pre className="text-xs whitespace-pre-wrap bg-neutral-50 border rounded p-3">
            {typeof thread.content === "string"
              ? thread.content
              : JSON.stringify(thread.content, null, 2)}
          </pre>
        ) : (
          <div className="text-sm text-neutral-600">Tidak ada konten.</div>
        )}
      </section>
    </div>
  );
}

// =====================
// Komponen RepliesSection
// =====================
function RepliesSection({ replies, setReplies, threadId, token, replyLoading, newReply, setNewReply }) {
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;

  const handleDelete = async (replyId) => {
    if (!confirm("Hapus reply ini?")) return;
    setReplies((prev) => prev.filter((r) => r.id !== replyId));
    try {
      await fetch(`${API}/replies/${replyId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Replies</h3>

      {replies.length === 0 && <p className="text-sm text-neutral-600">Belum ada reply.</p>}

      <ul className="space-y-3">
        {replies.map((r) => (
          <li key={r.id} className={`border p-3 rounded ${r.isTemp ? "opacity-70" : ""}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm whitespace-pre-wrap">{r.content}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {r.user?.username || "Unknown"} - {formatDate(r.created_at)}
                </p>
              </div>
              {!r.isTemp && r.user?.username === "Anda" && (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-500 text-xs hover:underline ml-2"
                >
                  Hapus
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Form tambah reply */}
      <div className="flex gap-2 mt-2">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Tulis reply..."
          className="flex-1 border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={2}
        />
        <button
          onClick={handleAddReply}
          disabled={replyLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {replyLoading ? "Mengirim..." : "Kirim"}
        </button>
      </div>
    </div>
  );
}

// =====================
// Komponen ContentTable
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

// =====================
// Komponen Table
// =====================
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

// =====================
// RenderValue fleksibel
// =====================
function renderValue(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return <ul className="list-disc pl-5">{v.map((x, i) => <li key={i}>{String(x)}</li>)}</ul>;
  if (typeof v === "object") return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</pre>;
  return String(v);
}

// =====================
// Komponen UserBadges
// =====================
function UserBadges({ username }) {
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    fetch(`${API}/user/${encodeURIComponent(username)}/badges`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => !cancelled && setBadges(data.badges || []))
      .catch(() => {});

    return () => { cancelled = true; };
  }, [API, username]);

  if (!badges.length) return null;
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

// =====================
// Format timestamp
// =====================
function formatDate(ts) {
  if (!ts) return "";
  try {
    return new Date(ts * 1000).toLocaleString();
  } catch {
    return "";
  }
}
