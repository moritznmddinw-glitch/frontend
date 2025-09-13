"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // fallback avatar jika error load
  const [avatarSrc, setAvatarSrc] = useState("/avatar-default.png");

  useEffect(() => {
    try {
      setIsAuthed(!!localStorage.getItem("token"));
    } catch (_) {}
  }, []);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2 h-16">
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden p-2 mr-2 -ml-2 rounded focus:outline-none focus:bg-neutral-100"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open Menu"
        >
          <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none"/>
            <path stroke="#222" strokeWidth="2" strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-w-max">
          <Image
            src="/images/vectorised-1757601408528.svg"
            alt="Logo"
            width={36}
            height={36}
            className="object-contain min-w-[36px] min-h-[36px]"
            priority
          />
          <span className="font-bold text-lg sm:text-xl text-black hidden sm:inline">
            Ballerina
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden sm:flex gap-8 text-base font-medium text-neutral-700 ml-8 flex-1">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/threads" className="hover:text-black">Threads</Link>
          <Link href="/about-content" className="hover:text-black">Tentang Kami</Link>
          <Link href="/rules-content" className="hover:text-black">Aturan</Link>
        </nav>

        {/* Akun kanan */}
        <div className="flex items-center ml-auto">
          {isAuthed ? (
            <div className="relative flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 focus:outline-none"
                aria-label="Buka sidebar akun"
              >
                <Image
                  src={avatarSrc}
                  alt="Akun"
                  width={32}
                  height={32}
                  className="rounded-full border border-neutral-200 bg-gray-50"
                  onError={() => setAvatarSrc("/avatar-default.png")}
                />
                <span className="ml-2 font-medium text-black hidden sm:inline">
                  Akur
                </span>
              </button>
              {sidebarOpen && (
                <ProfileSidebar onClose={() => setSidebarOpen(false)} />
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded bg-black text-white font-medium shadow hover:bg-neutral-800 transition ml-2"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="w-60 bg-white h-full shadow-xl flex flex-col pt-4">
            <div className="flex items-center justify-between px-4 mb-6">
              <span className="font-bold text-lg">Menu</span>
              <button
                className="p-2 -mr-2"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Tutup Menu"
              >
                <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="#222" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-3 px-4 text-base font-medium text-neutral-800">
              <Link href="/" className="py-2" onClick={() => setMobileNavOpen(false)}>Home</Link>
              <Link href="/threads" className="py-2" onClick={() => setMobileNavOpen(false)}>Threads</Link>
              <Link href="/about-content" className="py-2" onClick={() => setMobileNavOpen(false)}>Tentang Kami</Link>
              <Link href="/rules-content" className="py-2" onClick={() => setMobileNavOpen(false)}>Aturan</Link>
            </nav>
          </div>
          {/* Klik area hitam untuk tutup */}
          <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}
    </header>
  );
}
