import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero + Heading */}
      <div className="mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-black mb-2">Selamat Datang di Ballerina</h1>
          <p className="text-lg text-neutral-700 mb-4">
            Platform komunitas, diskusi, dan utilitas digital. Temukan thread, kategori, dan relasi baru.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="/threads" className="px-5 py-3 rounded bg-black text-white font-semibold hover:bg-neutral-900 transition">Lihat Threads</Link>
            <Link href="/category/umum" className="px-5 py-3 rounded bg-neutral-100 text-black font-semibold hover:bg-neutral-200 transition">Kategori</Link>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          {/* Ilustrasi/logo */}
          <image src="/images/vectorised-1758374067909.svg" alt="Ballerina" className="w-48 mx-auto" />
        </div>
      </div>

      {/* Kategori utama (grid style ala MDN) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-black">Kategori Populer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Mencari Pekerjaan",
            "Software",
            "Cryptocurrency",
            "Investor",
            "AI Digest",
            "Kerja Lepas",
            "Dropshiper",
            "Drama Korea"
          ].map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="block border rounded-lg px-4 py-6 bg-white shadow hover:shadow-lg transition hover:border-blue-500"
            >
              <span className="font-semibold text-lg text-black">{cat}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/category/umum" className="text-blue-700 underline hover:text-blue-900">Lihat semua kategori →</Link>
        </div>
      </div>

      {/* Aturan singkat / Info */}
      <div className="mb-12 bg-neutral-50 border border-neutral-200 rounded-lg p-5">
        <h3 className="text-lg font-bold mb-2 text-black">Aturan & Etika</h3>
        <ul className="list-disc ml-6 text-neutral-700 space-y-1 text-sm">
          <li>Tidak boleh posting SARA, spam, penipuan, atau konten ilegal.</li>
          <li>Gunakan bahasa yang sopan dan saling menghormati.</li>
          <li>Laporkan thread/akun bermasalah ke admin.</li>
        </ul>
        <div className="mt-2">
          <Link href="/rules-content" className="text-blue-700 underline hover:text-blue-900 text-sm">Baca aturan lengkap →</Link>
        </div>
      </div>

      {/* Highlight threads terbaru */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Threads Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dummy, ganti dengan fetch terbaru jika sudah ada API */}
          {[
            { title: "Lowongan Software Engineer", summary: "Cari tim kerja remote, gaji negotiable.", id: "123" },
            { title: "Diskusi Crypto 2025", summary: "Update market dan strategi investasi.", id: "456" }
          ].map(th => (
            <Link key={th.id} href={`/thread/${th.id}`} className="block border rounded-lg p-5 bg-white shadow hover:shadow-md transition">
              <div className="font-semibold text-lg text-black">{th.title}</div>
              <div className="text-neutral-700 text-sm mt-2">{th.summary}</div>
              <div className="mt-2 text-blue-700 text-xs font-medium">Lihat detail →</div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/threads" className="text-blue-700 underline hover:text-blue-900">Lihat semua threads →</Link>
        </div>
      </div>
    </section>
  );
}
