"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfilePage({ params }) {
  const { username } = use(params);
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api`;
  const [profile, setProfile] = useState(null);
  const [threads, setThreads] = useState([]);
  const [badges, setBadges] = useState([]);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    try { setIsAuthed(!!localStorage.getItem("token")); } catch {}
    fetch(`${API}/user/${encodeURIComponent(username)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((res) => !cancelled && setProfile(res))
      .catch(() => {});
    fetch(`${API}/user/${encodeURIComponent(username)}/threads`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((res) => !cancelled && setThreads(res.threads || []))
      .catch(() => {});
    fetch(`${API}/user/${encodeURIComponent(username)}/badges`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((res) => !cancelled && setBadges(res.badges || []))
      .catch(() => {});
    return () => { cancelled = true; };
  }, [API, username]);

  return (
    <div className="max-w-3xl space-y-4">
      <header className="border rounded p-4 bg-white">
        <h2 className="text-xl font-semibold">{profile?.username}</h2>
        {profile?.full_name && (
          <div className="text-sm text-neutral-700">Nama: {profile.full_name}</div>
        )}
        {profile?.company && (
          <div className="text-sm text-neutral-700">Company: {profile.company}</div>
        )}
        {profile?.pronouns && (
          <div className="text-sm text-neutral-700">Pronouns: {profile.pronouns}</div>
        )}
        {profile?.telegram && (
          <div className="text-sm text-neutral-700">Telegram: <a className="underline" href={`https://t.me/${profile.telegram.replace(/^@/, "")}`} target="_blank" rel="noreferrer">{profile.telegram}</a></div>
        )}
        {Array.isArray(profile?.social_accounts) && profile.social_accounts.length > 0 && (
          <div className="mt-2">
            <div className="text-sm font-medium">Sosial</div>
            <ul className="list-disc pl-5 text-sm">
              {profile.social_accounts.map((s, i) => (
                <li key={i}>
                  {s.label ? <span className="font-medium">{s.label}: </span> : null}
                  <a className="underline" href={s.url} target="_blank" rel="noreferrer">{s.url}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {profile?.bio && (
          <div className="mt-2 text-sm text-neutral-800 whitespace-pre-wrap">{profile.bio}</div>
        )}
        <div className="text-sm text-neutral-600 mt-2">Saldo: {profile?.balance}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {badges.map((b) => (
            <Link key={b.id} href={`/badge/${b.id}`} className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
              {b.platform}
            </Link>
          ))}
        </div>
      </header>

      <section className="space-y-2">
        <h3 className="font-medium">Threads oleh {profile?.username}</h3>
        {threads.length === 0 ? (
          <div className="text-sm text-neutral-600">Belum ada thread.</div>
        ) : (
          threads.map((t) => (
            <article
              key={t.id}
              onClick={() => isAuthed && router.push(`/thread/${t.id}`)}
              onKeyDown={(e) => { if (isAuthed && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); router.push(`/thread/${t.id}`);} }}
              role="button"
              tabIndex={0}
              className={`border rounded p-3 bg-white ${isAuthed ? "hover:bg-neutral-50 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-base">{t.title}</h4>
                <div className="text-xs text-neutral-500">{formatDate(t.created_at)}</div>
              </div>
              <div className="text-sm text-neutral-700 mt-1 line-clamp-2">{t.summary}</div>
              {!isAuthed && (
                <div className="mt-2 text-xs text-neutral-500">Login untuk melihat detail</div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
}

function formatDate(ts) {
  if (!ts) return "";
  try { return new Date(ts * 1000).toLocaleString(); } catch { return ""; }
}
