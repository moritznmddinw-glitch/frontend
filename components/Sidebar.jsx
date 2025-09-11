"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger only on mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white border rounded p-2"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-white border-r w-64 transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform sm:translate-x-0 sm:static sm:w-56`}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button className="sm:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg width="22" height="22" fill="none"><path d="M6 6l10 10M16 6L6 16" stroke="black" strokeWidth="2"/></svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 mt-4 px-4">
          <Link href="/" className="py-2 px-3 rounded hover:bg-neutral-100 font-medium text-neutral-700">Home</Link>
          <Link href="/threads" className="py-2 px-3 rounded hover:bg-neutral-100 font-medium text-neutral-700">Threads</Link>
          <Link href="/about-content" className="py-2 px-3 rounded hover:bg-neutral-100 font-medium text-neutral-700">Tentang Kami</Link>
          <Link href="/rules-content" className="py-2 px-3 rounded hover:bg-neutral-100 font-medium text-neutral-700">Aturan</Link>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
