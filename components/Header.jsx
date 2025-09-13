"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      setIsAuthed(!!localStorage.getItem("token"));
    } catch (_) {}
  }, []);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto grid grid-cols-3 items-center h-14 px-2 sm:px-4">
        {/* Hamburger kiri, hanya mobile */}
        <div className="flex items-center h-full">
          <button
            className="sm:hidden flex items-center justify-start p-2 rounded hover:bg-neutral-100 focus:outline-none"
            aria-label="Buka menu navigasi"
            type="button"
            onClick={() => {
              // Trigger Sidebar hamburger (pastikan aria-label="Buka menu" di Sidebar)
              const sidebarButton = document.querySelector(
                "button[aria-label='Buka menu']"
              );
              if (sidebarButton) sidebarButton.click();
            }}
          >
            <svg width={26} height={26} fill="none" viewBox="0 0 24 24">
              <path
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>

        {/* Logo tengah, selalu center */}
        <div className="flex justify-center items-center h-full">
          <Link href="/" className="flex items-center justify-center h-full">
            <Image
              src="/images/vectorised-1757601408528.svg"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain"
              style={{
                maxHeight: "2.25rem",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
              priority
            />
          </Link>
        </div>

        {/* Avatar/login kanan */}
        <div className="flex items-center justify-end h-full">
          {isAuthed ? (
            <div className="relative flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="focus:outline-none"
                aria-label="Buka sidebar akun"
                type="button"
              >
                <Image
                  src="/avatar-default.png"
                  alt="Akun"
                  width={32}
                  height={32}
                  className="rounded-full border border-neutral-200 bg-gray-50"
                />
              </button>
              {sidebarOpen && (
                <ProfileSidebar onClose={() => setSidebarOpen(false)} />
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded bg-black text-white font-medium shadow hover:bg-neutral-800 transition"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
