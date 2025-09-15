"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileSidebar({ onClose }) {
  const [user, setUser] = useState({ name: "", balance: 0 });

  useEffect(() => {
    try {
      const t = localStorage.getItem("token");
      if (!t) return;
      fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://instrument-fwd-remedy-ecommerce.trycloudflare.com"
        }/api/user/me`,
        { headers: { Authorization: `Bearer ${t}` } }
      )
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) =>
          setUser({ name: data.name || "", balance: data.balance || 0 })
        )
        .catch(() => {});
    } catch (_) {}
  }, []);

  if (!user.name) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      id="profileSidebar"
      className="absolute right-0 top-12 z-40 w-64 bg-white border rounded shadow p-3 space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="font-medium">{user.name}</div>
        <button
          onClick={onClose}
          className="text-sm px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200"
        >
          ✕
        </button>
      </div>

      <div className="text-sm text-neutral-600">
        Your Money IDR <span className="font-semibold">{user.balance}</span>
      </div>

      <nav className="flex flex-col gap-2 pt-2">
        <Link
          href="/account"
          className="px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
        >
          Account
        </Link>
        <Link
          href="/manage"
          className="px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
        >
          Manage
        </Link>
        <Link
          href="/threads"
          className="px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
        >
          Threads
        </Link>
        <Link
          href="/marks"
          className="px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
        >
          Mark off
        </Link>
      </nav>

      <div className="pt-2">
        <div className="text-xs text-neutral-500">Credit Account</div>
        <button
          onClick={() => (window.location.href = "/refill-balance")}
          className="mt-1 w-full text-left px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
        >
          <div className="text-xs">Jaringan Polygon</div>
          <div className="text-sm">PolygonEcosystemToken</div>
        </button>
      </div>

      <div className="pt-2">
        <div className="text-xs text-neutral-500">Anti Money Laundering</div>
        <button
          onClick={() => (window.location.href = "/withdraw-balance")}
          className="mt-1 w-full text-left px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
        >
          <div className="text-xs">Jaringan Polygon</div>
          <div className="text-sm">PolygonEcosystemToken</div>
        </button>
      </div>

      <Link
        href="/transfer-balance"
        className="block px-3 py-2 rounded bg-neutral-50 hover:bg-neutral-100"
      >
        Transfer Balance
      </Link>

      <button
        onClick={handleLogout}
        className="mt-3 w-full text-left px-3 py-2 rounded bg-red-50 hover:bg-red-100 text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
