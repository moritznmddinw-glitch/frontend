"use client";
import Link from "next/link";

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

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside
        className={`bg-white border-r border-neutral-200 fixed inset-y-0 left-0 z-40 w-64 flex flex-col h-full transition-transform duration-200 sm:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <span className="font-bold text-lg">Menu</span>
          <button
            className="p-1"
            onClick={onClose}
            aria-label="Tutup menu"
            type="button"
          >
            <svg width="22" height="22" fill="none">
              <path
                d="M6 6l10 10M16 6L6 16"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 mt-2 px-2 py-2 overflow-y-auto">
          <Link
            href="/"
            className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/threads"
            className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100"
            onClick={onClose}
          >
            Threads
          </Link>
          <Link
            href="/about-content"
            className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100"
            onClick={onClose}
          >
            Tentang Kami
          </Link>
          <Link
            href="/rules-content"
            className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100"
            onClick={onClose}
          >
            Aturan
          </Link>

          <div className="mt-4 border-t pt-2">
            <span className="block px-4 py-2 font-semibold text-sm text-neutral-500">
              Kategori Threads
            </span>
            {threadCategories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${slugify(cat)}`}
                className="block py-2 px-4 rounded-lg font-medium text-neutral-700 hover:bg-blue-50 hover:text-blue-700"
                onClick={onClose}
              >
                {cat}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Overlay untuk mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
