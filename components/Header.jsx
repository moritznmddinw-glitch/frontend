"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    try {
      setIsAuthed(!!localStorage.getItem("token"));
    } catch (_) {}
  }, []);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/vectorised-1757601408528.svg" alt="Logo" width={36} height={36} priority />
          <span className="font-bold text-xl text-black hidden sm:inline">Ballerina</span>
        </Link>
        <nav className="hidden sm:flex gap-8 text-base font-medium text-neutral-700">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/threads" className="hover:text-black">Threads</Link>
          <Link href="/about-content" className="hover:text-black">Tentang Kami</Link>
          <Link href="/rules-content" className="hover:text-black">Aturan</Link>
        </nav>
        <div>
          {isAuthed ? (
            <Link href="/account">
              <Image src="/avatar-default.png" alt="Akun" width={32} height={32} className="rounded-full" />
            </Link>
          ) : (
            <Link href="/login" className="px-4 py-1.5 rounded bg-black text-white">Masuk</Link>
          )}
        </div>
      </div>
    </header>
  );
}
