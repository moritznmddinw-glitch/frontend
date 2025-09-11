"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/api/user/${username}`).then(r => r.json()),
      fetch(`${API}/api/user/${username}/badges`).then(r => r.json()),
    ]).then(([user, badgeData]) => {
      setProfile(user);
      setBadges(badgeData.badges || []);
    }).finally(() => setLoading(false));
  }, [API, username]);

  if (loading) return <div>Loading...</div>;
  if (!profile || profile.error) return <div className="text-red-500">User tidak ditemukan</div>;

  return (
    <div className="max-w-2xl mx-auto mt-6 px-3">
      <div className="border rounded-lg bg-white p-6 space-y-2">
        <div className="text-2xl font-bold">{profile.full_name}</div>
        <div className="text-sm text-neutral-600">@{profile.username}</div>
        <div className="text-sm">{profile.bio}</div>
        <div className="text-sm"><b>Pronouns:</b> {profile.pronouns}</div>
        <div className="text-sm"><b>Social:</b> {Array.isArray(profile.social_accounts) ? profile.social_accounts.map((s, i) =>
          <span key={i} className="mr-2">{s.label}: {s.url}</span>
        ) : "-"}</div>
        <div className="text-sm"><b>Company:</b> {profile.company}</div>
        <div className="text-sm"><b>Contact Telegram:</b> {profile.telegram}</div>
      </div>
      {badges.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {badges.map(b => (
            <div key={b.id} className="border rounded bg-emerald-50 p-3 text-emerald-700">
              <div className="font-semibold">{b.platform}</div>
              <div className="text-xs">{b.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
