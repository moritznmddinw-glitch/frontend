"use client";

export default function Sidebar() {
  return (
    <aside id="sidebar" className="transition-all duration-200 max-w-80 w-72 border-r bg-white">
      <div className="sidebar-main">
        <div className="sticky top-0 px-4 py-2 border-b bg-white font-medium">Menu</div>
        <nav className="p-2 space-y-1">
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-100" onClick={() => (window.location.href = "/")}>Home</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-100" onClick={() => switchSection("threads")}>Threads</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-100" onClick={() => showSidebarSection("about")}>Tentang Kami</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-100" onClick={() => showSidebarSection("rules")}>Aturan</button>
        </nav>
      </div>

      <div className="sidebar-threads hidden">
        <div className="sticky top-0 px-4 py-2 border-b bg-white flex items-center gap-2">
          <button className="text-sm" onClick={() => switchSection("main")}>← Back</button>
          <span className="font-medium">Threads</span>
        </div>
        <nav className="p-2 space-y-1">
          {["Mencari Pekerjaan","Cryptocurrency","Software","Kerja Lepas","Iklan","Akuntansi","Dropshiper","Jasa Tugas Kantor","Akun Digital","HP & Komputer","Drama Korea","Jasa Tugas Belajar","Kolaborator Ph.D","Marketing Offline","Investor","Anti Penipuan","Dokter Buka Praktek","Bantuan Darurat","Cari Relasi","AI Digest","Masa Depan-Ku","Report Massal"].map((t) => (
            <button
              key={t}
              className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-100"
              onClick={() => (window.location.href = `/threads/${slugify(t)}`)}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function switchSection(section) {
  const main = document.querySelector("#sidebar .sidebar-main");
  const threads = document.querySelector("#sidebar .sidebar-threads");
  if (!main || !threads) return;
  if (section === "threads") {
    main.classList.add("hidden");
    threads.classList.remove("hidden");
  } else {
    threads.classList.add("hidden");
    main.classList.remove("hidden");
  }
}

function showSidebarSection(section) {
  let url = "";
  if (section === "about") url = "/about-content";
  if (section === "rules") url = "/rules-content";
  if (!url) return;
  fetch(url)
    .then((r) => r.text())
    .then((html) => {
      const mainContent = document.querySelector("main.content");
      if (mainContent) mainContent.innerHTML = html;
    });
  document.getElementById("sidebar")?.classList.remove("active");
  document.getElementById("hamburgerBtn")?.classList.remove("active");
}

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
