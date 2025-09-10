"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/img/default-avatar.png");

  useEffect(() => {
    try {
      const t = localStorage.getItem("token");
      setIsAuthed(!!t);
      // In a real app, fetch user profile to get avatar
    } catch (_) {}
  }, []);

  return (
    <header className="flex items-center justify-between px-3 py-2 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <button
        className="group inline-flex items-center justify-center rounded p-2 focus:outline-none"
        id="hamburgerBtn"
        aria-label="Toggle sidebar"
        type="button"
        onClick={() => document.getElementById("sidebar")?.classList.toggle("active")}
      >
        <span className="sr-only">Toggle sidebar</span>
        <span className="block h-[2px] w-5 bg-black group-aria-expanded:rotate-45" />
        <span className="block h-[2px] w-5 bg-black mt-1" />
        <span className="block h-[2px] w-5 bg-black mt-1" />
      </button>

      <Link href="/" className="inline-flex items-center gap-2">
        <Image src="/images/vectorised-1757522879372.pdf" alt="Logo Brand" width={28} height={28} />
      </Link>

      <div className="flex items-center gap-2">
        {isAuthed ? (
          <button
            className="inline-flex items-center"
            onClick={() => {
              const panel = document.getElementById("profileSidebar");
              if (panel) panel.style.display = panel.style.display === "block" ? "none" : "block";
            }}
          >
            <Image
              src={avatarUrl}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>
        ) : (
          <Link href="/login" className="px-3 py-1.5 rounded bg-black text-white text-sm">Masuk</Link>
        )}
      </div>
    </header>
  );
}
