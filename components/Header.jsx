"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ProfileSidebar from "./ProfileSidebar";

const threadCategories = [
  "Mencari Pekerjaan",
  "Cryptocurrency",
  "Software",
  "Dokter buka praktek",
  "Kerja Lepas",
  "Iklan",
  "Akuntansi",
  "Dropshiper",
  "Jasa Tugas Kantor",
  "Akun Digital",
  "HP & Komputer",
  "Drama Korea",
  "Jasa Tugas Belajar",
  "Kolaborator Ph.D",
  "Marketing Offline",
  "Investor",
  "Anti Penipuan",
  "Bantuan Darurat",
  "Cari Relasi",
  "AI Digest",
  "Masa Depan-Ku",
  "Report Massal",
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/&/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // untuk menu utama
  const [profileOpen, setProfileOpen] = useState(false); // untuk profile sidebar
  const [categoriesOpen, setCategoriesOpen] = useState(false); // untuk dropdown kategori

  useEffect(() => {
    try {
      setIsAuthed(!!localStorage.getItem("token"));
    } catch (_) {}
  }, []);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* Tombol hamburger (mobile only) */}
        <button
          className="sm:hidden p-2 absolute left-4"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu"
        >
          <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-black rounded"></span>
        </button>

        {/* Logo di tengah */}
        <Link href="/" className="flex items-center gap-2 mx-auto">
          <Image
            src="/images/vectorised-1757601408528.svg"
            alt="Logo"
            width={36}
            height={36}
            priority
          />
          <span className="font-bold text-xl text-black hidden sm:inline">
            Ballerina
          </span>
        </Link>

        {/* Navigasi desktop */}
        <nav className="hidden sm:flex gap-8 text-base font-medium text-neutral-700 ml-auto">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/threads" className="hover:text-black">Threads</Link>
          <div
            className="relative group"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button className="hover:text-black flex items-center gap-1">
              Kategori
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {categoriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-200 rounded shadow-lg z-50">
                {threadCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${slugify(cat)}`}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about-content" className="hover:text-black">Tentang Kami</Link>
          <Link href="/rules-content" className="hover:text-black">Aturan</Link>
        </nav>

        {/* Profile / Login */}
        <div className="absolute right-4">
          {isAuthed ? (
            <>
              <button
                className="focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <Image
                  src="/avatar-default.png"
                  alt="Akun"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </button>

              {/* Sidebar profil */}
              {profileOpen && (
                <ProfileSidebar onClose={() => setProfileOpen(false)} />
              )}
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded bg-black text-white"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar utama (mobile menu) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
