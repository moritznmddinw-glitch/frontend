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
    ])
      .then(([user, badgeData]) => {
        setProfile(user);
        setBadges(badgeData.badges || []);
      })
      .finally(() => setLoading(false));
  }, [API, username]);

  if (loading) return <div className="text-sm">Loading...</div>;
  if (!profile || profile.error) return <div className="text-red-500">User tidak ditemukan</div>;

  return (
    <div className="max-w-2xl mx-auto mt-6 px-3 space-y-4">
      {/* Nama + Username */}
      <div className="border rounded-lg bg-white p-4">
        <div className="text-xl font-semibold">{profile.full_name || "(No Name)"}</div>
        <div className="text-sm text-neutral-600">@{profile.username}</div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="border rounded-lg bg-white p-4">
          <h3 className="text-sm font-medium mb-1">Bio</h3>
          <p className="text-sm text-neutral-800">{profile.bio}</p>
        </div>
      )}

      {/* Pronouns */}
      {profile.pronouns && (
        <div className="border rounded-lg bg-white p-4">
          <h3 className="text-sm font-medium mb-1">Pronouns</h3>
          <p className="text-sm">{profile.pronouns}</p>
        </div>
      )}

      {/* Company */}
      {profile.company && (
        <div className="border rounded-lg bg-white p-4">
          <h3 className="text-sm font-medium mb-1">Company</h3>
          <p className="text-sm">{profile.company}</p>
        </div>
      )}

      {/* Telegram */}
      {profile.telegram && (
        <div className="border rounded-lg bg-white p-4">
          <h3 className="text-sm font-medium mb-1">Contact Telegram</h3>
          <p className="text-sm">{profile.telegram}</p>
        </div>
      )}

      {/* Social Accounts */}
      {Array.isArray(profile.social_accounts) && profile.social_accounts.length > 0 && (
        <div className="border rounded-lg bg-white p-4">
          <h3 className="text-sm font-medium mb-2">Social Accounts</h3>
          <ul className="space-y-1">
            {profile.social_accounts.map((s, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium">{s.label}:</span>{" "}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {s.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className="border rounded-lg bg-white p-4">
          <h3 className="text-sm font-medium mb-2">Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map(b => (
              <div key={b.id} className="border rounded bg-emerald-50 p-3 text-emerald-700">
                <div className="font-semibold">{b.platform}</div>
                <div className="text-xs">{b.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
