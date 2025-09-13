"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fallback avatar jika gambar gagal load
  const [avatarSrc, setAvatarSrc] = useState("/avatar-default.png");

  useEffect(() => {
    try {
      setIsAuthed(!!localStorage.getItem("token"));
    } catch (_) {}
  }, []);

  // Gaya responsive header
  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2 sm:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-w-max">
          <Image
            src="/images/vectorised-1757601408528.svg"
            alt="Logo"
            width={36}
            height={36}
            priority
            className="min-w-[36px] min-h-[36px] object-contain"
          />
          <span className="font-bold text-lg sm:text-xl text-black hidden sm:inline">
            Ballerina
          </span>
        </Link>

        {/* Navigation: Desktop */}
        <nav className="hidden sm:flex gap-6 text-base font-medium text-neutral-700 ml-8 flex-1">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/threads" className="hover:text-black">Threads</Link>
          <Link href="/about-content" className="hover:text-black">Tentang Kami</Link>
          <Link href="/rules-content" className="hover:text-black">Aturan</Link>
        </nav>

        {/* Akun / Auth Button: Right */}
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
                  className="rounded-full border border-neutral-200"
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
              className="px-4 py-1.5 rounded bg-black text-white font-medium shadow hover:bg-neutral-800 transition"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <nav className="flex sm:hidden px-4 pb-2 pt-1 gap-4 text-base font-medium text-neutral-700 border-t bg-white">
        <Link href="/" className="hover:text-black flex-1 text-center">Home</Link>
        <Link href="/threads" className="hover:text-black flex-1 text-center">Threads</Link>
        <Link href="/about-content" className="hover:text-black flex-1 text-center">Tentang</Link>
        <Link href="/rules-content" className="hover:text-black flex-1 text-center">Aturan</Link>
      </nav>
    </header>
  );
}
