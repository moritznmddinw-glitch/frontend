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
    <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Left spacer - untuk menjaga logo tetap di tengah */}
        <div className="flex-1 sm:flex-none w-32"></div>
        
        {/* Centered Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="images/vectorised-1757601408528.svg"
              alt="Logo"
              width={32}
              height={32}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation - positioned absolute untuk tidak mengganggu center logo */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-6 text-sm font-medium">
          <Link 
            href="/" 
            className="text-neutral-600 hover:text-black transition-colors duration-200 py-2 px-1"
          >
            Home
          </Link>
          <Link 
            href="/threads" 
            className="text-neutral-600 hover:text-black transition-colors duration-200 py-2 px-1"
          >
            Threads
          </Link>
          <Link 
            href="/about-content" 
            className="text-neutral-600 hover:text-black transition-colors duration-200 py-2 px-1"
          >
            Tentang Kami
          </Link>
          <Link 
            href="/rules-content" 
            className="text-neutral-600 hover:text-black transition-colors duration-200 py-2 px-1"
          >
            Aturan
          </Link>
        </nav>

        {/* Right section - Auth */}
        <div className="flex-1 flex justify-end w-32">
          <div className="relative">
            {isAuthed ? (
              <>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:opacity-80"
                  aria-label="Buka menu profil"
                  type="button"
                >
                  <Image
                    src="/avatar-default.png"
                    alt="Profil"
                    width={32}
                    height={32}
                    className="rounded-full border border-neutral-200 object-cover"
                  />
                </button>
                {sidebarOpen && (
                  <ProfileSidebar onClose={() => setSidebarOpen(false)} />
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors duration-200 font-medium shadow-sm"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

