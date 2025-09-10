export const dynamic = "force-static";

export const metadata = { title: "Aturan" };

export default function RulesContentPage() {
  return (
    <section className="prose max-w-3xl">
      <p><strong>Aturan.</strong></p>

      <p><strong>Prinsip Utama:</strong><br />
        Website ini dibangun untuk berbagi pengetahuan, pengalaman, dan diskusi.<br />
        Kebebasan berbicara dijunjung tinggi, tetapi hormat terhadap kemanusiaan dan keselamatan orang lain adalah prioritas utama.
      </p>

      <p><strong>I. Pendaftaran & Akun</strong></p>
      <ol>
        <li>Gunakan username yang pantas (hindari kata kasar/pelecehan).</li>
        <li>Tidak dianjurkan membuat banyak akun, tapi jika punya alasan jelas (privasi, eksperimen, dsb.) silakan, asalkan tidak digunakan untuk merugikan orang lain.</li>
        <li>Jaga keamanan akun Anda, tapi jika diretas, segera laporkan agar tidak disalahgunakan.</li>
        <li>Kami sengaja hanya menyediakan opsi daftar/masuk hanya melalui akun github, untuk mencegah penyalahgunaan akun.</li>
      </ol>

      <p><strong>II. Etika & Perilaku</strong></p>
      <ol>
        <li>Dilarang menyerang secara pribadi (menghina, merendahkan, mengancam).</li>
        <li>Kritik boleh, tapi fokus ke argumen, bukan ke orangnya.</li>
        <li>Jangan diskriminasi atas dasar ras, agama, gender, orientasi, atau latar belakang sosial.</li>
        <li>Dilarang menyebarkan konten yang merusak kemanusiaan:
          <ol>
            <li>Kekerasan brutal, pelecehan seksual, eksploitasi anak, terorisme, perdagangan manusia, atau mendorong bunuh diri.</li>
          </ol>
        </li>
        <li><strong>Boleh membahas topik sensitif</strong> seperti hacking, exploit, malware, social engineering, DDoS, SQL Injection, XSS, bypass, bruteforce, untuk tujuan pendidikan, penelitian, atau simulasi.
          <ol>
            <li>Tidak diperbolehkan mempublikasikan data pribadi (doxing), akses ilegal yang masih aktif, atau cara merugikan individu secara langsung.</li>
            <li>Tidak diperbolehkan mencuri email native/pribadi milik orang lain.</li>
            <li>Bertanggung jawab secara pribadi/kelompok saat berurusan dengan hukum tanpa melibatkan pihak website.</li>
          </ol>
        </li>
        <li>Tidak ada larangan ketat terhadap humor, meme, atau flame kecil, selama tidak melukai martabat orang lain.</li>
      </ol>

      <p><strong>III. Konten & Diskusi</strong></p>
      <ol>
        <li>Post di kategori yang sesuai.</li>
        <li>Hindari flood & spam.</li>
        <li>Judul thread harus jelas, bukan cuma "Help" atau "Tolong!!!".</li>
        <li>Artikel, tutorial, atau tools lebih dihargai jika dijelaskan konteks dan risikonya.</li>
        <li>Sharing data/alat uji diperbolehkan selama tidak digunakan untuk merugikan orang nyata (misal: leak data sensitif masih aktif).</li>
      </ol>

      <p><strong>IV. Transaksi & Komunitas</strong></p>
      <ol>
        <li>Jika ada transaksi, gunakan penjamin (guarantor) atau sistem escrow.</li>
        <li>Dilarang menipu, memeras, atau memanfaatkan kepercayaan orang lain.</li>
        <li>Pengetahuan lebih penting daripada keuntungan semata.</li>
        <li>Pengguna yang berkontribusi positif (tulisan, tools, membantu orang lain) bisa mendapat penghargaan komunitas.</li>
      </ol>

      <p><strong>V. Penegakan Aturan</strong></p>
      <ol>
        <li>Moderator akan bertindak lebih sebagai mediator daripada polisi.</li>
        <li>Pelanggaran ringan → teguran.</li>
        <li>Pelanggaran serius (merugikan orang lain secara langsung, eksploitasi manusia, penipuan) → ban.</li>
        <li>Diskusi tentang keputusan moderator diperbolehkan selama tetap sopan.</li>
      </ol>

      <p><strong>VI. Nilai Dasar Forum</strong></p>
      <ul>
        <li>Kemanusiaan di atas segalanya.</li>
        <li>Ilmu untuk berkembang, bukan untuk menindas.</li>
        <li>Kebebasan berbicara dengan tanggung jawab.</li>
        <li>Bertindak dengan rasionalitas dan kesadaran penuh.</li>
        <li>Saling menghargai, meski berbeda pandangan.</li>
        <li>Memiliki simpati, empati, dan peduli kepada orang lain.</li>
      </ul>
    </section>
  );
}
