import Link from "next/link";
import Image from "next/image";

// Dummy: Thread terbaru, ganti dengan fetch API jika backend tersedia
const threads = [
  {
    id: "1",
    title: "Integrasi Wallet Web3 di Platform",
    summary: "Diskusi tentang cara terbaik mengintegrasikan wallet seperti MetaMask atau Trust Wallet ke website komunitas.",
    author: "0xA1B2C3",
    created_at: "2025-09-24",
  },
  {
    id: "2",
    title: "Review Project DeFi Lokal",
    summary: "Thread tentang project DeFi Indonesia yang sedang berkembang, analisis dan potensi.",
    author: "blockuser99",
    created_at: "2025-09-22",
  },
  {
    id: "3",
    title: "Smart Contract Audit untuk Pemula",
    summary: "Langkah-langkah dasar audit smart contract sebelum launching di mainnet.",
    author: "auditgenius",
    created_at: "2025-09-21",
  },
  // Tambah thread asli dari API dengan fetch jika sudah tersedia
];

const categories = [
  "Web3 & Blockchain",
  "DeFi & Finance",
  "NFT & Digital Asset",
  "Smart Contract",
  "Crypto News",
  "Mining",
  "Security",
  "Community Project",
];

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="mb-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">Platform Komunitas Blockchain</h1>
          <p className="text-lg text-neutral-700 mb-4">
            Diskusi, kolaborasi, dan update terbaru seputar teknologi blockchain, crypto, dan Web3. Temukan thread, kategori, dan insight dari komunitas.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="/threads" className="btn">Lihat Semua Thread</Link>
            <Link href="/category/web3-blockchain" className="btn bg-neutral-100 text-blue-800 hover:bg-blue-50">Kategori Utama</Link>
          </div>
        </div>
        <div className="flex-1 hidden md:flex justify-center items-center">
          <Image src="/images/blockchain-hero.svg" alt="Blockchain Community" width={220} height={220} priority />
        </div>
      </div>

      {/* Kategori Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Kategori Blockchain</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="card hover:shadow-lg transition border-blue-100"
            >
              <span className="font-semibold text-lg text-blue-800">{cat}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/category/web3-blockchain" className="text-blue-700 underline hover:text-blue-900">Lihat semua kategori →</Link>
        </div>
      </div>

      {/* Thread Terbaru */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Thread Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {threads.length > 0 ? (
            threads.map(th => (
              <Link key={th.id} href={`/thread/${th.id}`} className="card hover:shadow-xl transition border-blue-100 p-5">
                <div className="font-semibold text-lg text-blue-900 mb-1">{th.title}</div>
                <div className="text-neutral-700 text-sm mb-2">{th.summary}</div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>By <span className="font-semibold">{th.author}</span></span>
                  <span>•</span>
                  <span>{th.created_at}</span>
                </div>
                <div className="mt-2 text-blue-700 text-xs font-medium">Lihat detail →</div>
              </Link>
            ))
          ) : (
            <div className="text-neutral-500">Belum ada thread terbaru.</div>
          )}
        </div>
        <div className="mt-4 text-right">
          <Link href="/threads" className="text-blue-700 underline hover:text-blue-900">Lihat semua threads →</Link>
        </div>
      </div>

      {/* Info & Aturan */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-lg p-5">
        <h3 className="text-lg font-bold mb-2 text-blue-800">Etika Komunitas Blockchain</h3>
        <ul className="list-disc ml-6 text-neutral-700 space-y-1 text-sm">
          <li>Diskusi dan sharing seputar blockchain, crypto, dan teknologi terkait.</li>
          <li>Dilarang promosi project scam, SARA, atau spam.</li>
          <li>Gunakan bahasa sopan dan saling menghormati.</li>
          <li>Laporkan thread/akun bermasalah ke admin.</li>
        </ul>
        <div className="mt-2">
          <Link href="/rules-content" className="text-blue-700 underline hover:text-blue-900 text-sm">Baca aturan lengkap →</Link>
        </div>
      </div>
    </section>
  );
}
