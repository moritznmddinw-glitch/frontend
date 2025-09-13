"use client";
import Link from "next/link";
import { useState } from "react";
                                                     /**                                                   * Sidebar dengan 2 section:
 * 1. Menu utama (Home, Threads, Tentang Kami, Aturan)
 * 2. Daftar kategori thread (hanya muncul saat klik "Threads")
 */                                                  const threadCategories = [
  "Mencari Pekerjaan",                                 "Cryptocurrency",
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
  "AI Digest",                                         "Masa Depan-Ku",
  "Report Massal",
];

function slugify(name) {                               return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/&/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");                          }
                                                     export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("main"); // "main" | "threads"

  // Untuk mobile: reset ke section main saat tutup sidebar                                                 function closeSidebar() {                              setOpen(false);
    setTimeout(() => setSection("main"), 200);
  }

  return (                                               <>                                                     {/* Hamburger for mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white border border-neutral-200 rounded-lg p-2 shadow-md"
        onClick={() => setOpen(true)}
        aria-label="Buka menu"                               type="button"
      >
        <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-black rounded"></span>
      </button>

      {/* Sidebar */}                                      <aside                                                 className={`bg-white border-r border-neutral-200 fixed sm:static inset-y-0 left-0 z-40 w-64 sm:w-56 flex flex-col h-full transition-transform duration-200 ${                                                         open ? "translate-x-0" : "-translate-x-full"                                                            } sm:translate-x-0`}
        aria-label="Sidebar"                               >
        {/* Section: Menu utama */}
        {section === "main" && (
          <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 sm:justify-center">
              <span className="font-bold text-lg tracking-tight">Menu</span>
              <button
                className="sm:hidden p-1 ml-2"
                onClick={closeSidebar}                               aria-label="Tutup menu"                              type="button"
              >
                <svg width="22" height="22" fill="none"><path d="M6 6l10 10M16 6L6 16" stroke="black" strokeWidth="2"/></svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 mt-2 px-2 py-2">
              <Link
                href="/"
                className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                onClick={closeSidebar}
              >
                Home
              </Link>
              <button
                className="block text-left py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                onClick={() => setSection("threads")}
              >
                Threads                                            </button>
              <Link                                                  href="/about-content"
                className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                onClick={closeSidebar}
              >
                Tentang Kami
              </Link>
              <Link
                href="/rules-content"
                className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                onClick={closeSidebar}
              >
                Aturan
              </Link>
            </nav>
          </>
        )}

        {/* Section: Daftar kategori threads */}
        {section === "threads" && (
          <>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-neutral-100">
              <button
                className="p-1 mr-1 -ml-2"
                onClick={() => setSection("main")}
                aria-label="Kembali ke menu"
                type="button"
              >
                <svg width="22" height="22" fill="none"><path d="M15 5l-7 6 7 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <span className="font-bold text-lg tracking-tight">Kategori Threads</span>
              <button
                className="sm:hidden p-1 ml-auto"                    onClick={closeSidebar}
                aria-label="Tutup menu"
                type="button"                                      >
                <svg width="22" height="22" fill="none"><path d="M6 6l10 10M16 6L6 16" stroke="black" strokeWidth="2"/></svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 mt-2 px-2 py-2 overflow-y-auto">
              {threadCategories.map(cat => (
                <Link
                  key={cat}                                            href={`/category/${slugify(cat)}`}                   className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={closeSidebar}
                >
                  {cat}                                              </Link>
              ))}                                                </nav>
          </>                                                )}
        <div className="hidden sm:block flex-shrink-0 h-4" />
      </aside>

      {/* Overlay for mobile */}                           {open && (                                             <div                                                   className="fixed inset-0 z-30 bg-black/30 sm:hidden"                                                      aria-label="Sidebar overlay"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
