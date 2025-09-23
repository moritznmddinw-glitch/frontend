"use client";
import Link from "next/link";
import { useState } from "react";

// Kategori threads (bisa fetch dinamis, di sini statis)
const threadCategories = [
  "Mencari Pekerjaan","Cryptocurrency","Software","Dokter buka praktek","Kerja Lepas","Iklan","Akuntansi","Dropshiper","Jasa Tugas Kantor","Akun Digital","HP & Komputer","Drama Korea","Jasa Tugas Belajar","Kolaborator Ph.D","Marketing Offline","Investor","Anti Penipuan","Bantuan Darurat","Cari Relasi","AI Digest","Masa Depan-Ku","Report Massal","Email Transaksional","Script","Programming"
];

// Topik diskusi populer (saran pengganti "Threads" sidebar)
const popularTopics = [
  { label: "AI & Machine Learning", href: "/category/ai-digest" },
  { label: "Karir & Riset", href: "/category/mencari-pekerjaan" },
  { label: "Startup & Inovasi", href: "/category/investor" },
  { label: "Kesehatan & Praktek Dokter", href: "/category/dokter-buka-praktek" },
  { label: "Anti Penipuan", href: "/category/anti-penipuan" },
];

function slugify(name) {
  return name.toLowerCase().replace(/\./g,"").replace(/&/g,"-").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-|-$/g,"");
}

export default function Sidebar({ open, onClose }) {
  const [search, setSearch] = useState("");

  // Filter kategori jika search aktif
  const filteredCategories = search.trim()
    ? threadCategories.filter(cat => cat.toLowerCase().includes(search.toLowerCase()))
    : threadCategories;

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-neutral-200 shadow-xl transition-transform duration-200 md:hidden flex flex-col overscroll-contain`}
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          maxHeight: "100vh",
        }}
        aria-label="Sidebar"
      >
        {/* Sticky header menu utama */}
        <div className="sticky top-0 bg-white z-10 border-b border-neutral-100 flex flex-col gap-2 px-6 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Menu</span>
            <button
              className="p-1"
              onClick={onClose}
              aria-label="Tutup menu"
              type="button"
            >
              <svg width="22" height="22" fill="none">
                <path d="M6 6l10 10M16 6L6 16" stroke="black" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          {/* Navigasi utama */}
          <nav className="flex gap-2 font-medium text-base flex-wrap">
            <Link href="/" className="py-1.5 px-3 rounded hover:bg-neutral-100" onClick={onClose}>Home</Link>
            <Link href="/about-content" className="py-1.5 px-3 rounded hover:bg-neutral-100" onClick={onClose}>Tentang Kami</Link>
            <Link href="/rules-content" className="py-1.5 px-3 rounded hover:bg-neutral-100" onClick={onClose}>Aturan</Link>
            <Link href="/contact-support" className="py-1.5 px-3 rounded hover:bg-neutral-100" onClick={onClose}>Contact Support</Link>
            <Link href="/pengajuan-badge" className="py-1.5 px-3 rounded hover:bg-neutral-100" onClick={onClose}>Pengajuan Badge</Link>
          </nav>
          {/* Search kategori */}
          <input
            type="text"
            className="mt-2 w-full rounded px-3 py-2 border bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cari kategori..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Cari kategori thread"
          />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
          {/* Topik diskusi populer */}
          <div className="mb-7">
            <div className="font-semibold text-sm text-neutral-500 mb-2">Topik Diskusi Populer</div>
            <nav className="flex flex-col gap-2">
              {popularTopics.map(topic => (
                <Link
                  key={topic.label}
                  href={topic.href}
                  className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={onClose}
                >
                  {topic.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kategori threads */}
          <div>
            <div className="font-semibold text-sm text-neutral-500 mb-2">Kategori Threads</div>
            <nav className="flex flex-col gap-1">
              {filteredCategories.length === 0 ? (
                <div className="py-2 px-4 text-neutral-400 text-sm">Tidak ditemukan...</div>
              ) : (
                filteredCategories.map(cat => (
                  <Link
                    key={cat}
                    href={`/category/${slugify(cat)}`}
                    className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-blue-50 hover:text-blue-700 transition"
                    onClick={onClose}
                  >
                    {cat}
                  </Link>
                ))
              )}
            </nav>
          </div>
        </div>
      </aside>

      {/* Overlay untuk mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
