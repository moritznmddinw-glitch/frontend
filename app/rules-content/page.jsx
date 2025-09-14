
// Next.js: Pastikan halaman ini statis
export const dynamic = "force-static";
export const metadata = { title: "Aturan" };

export default function RulesContentPage() {
  return (
    <section className="prose max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1>Aturan Komunitas</h1>
      <p className="lead">
        Selamat datang di website kami. Kami hadir untuk memecahkan masalah terkait pengetahuan, pengalaman, dan mengurangi kesenjangan sosial. Di sini, ilmu dan pengalaman sangat dijunjung tinggi. Kami menghargai setiap usaha, sekecil apa pun, yang Anda kerjakan. Kami percaya bahwa setiap pengguna dapat mengimplementasikan ide mereka menjadi nyata melalui berbagai upaya dan tindakan.
      </p>

      <h2>I. Pendaftaran & Akun</h2>
      <ol>
        <li>Gunakan nama pengguna yang pantas. Dilarang menggunakan kata-kata yang kasar atau melecehkan.</li>
        <li>Jaga keamanan akun Anda. Jika akun Anda diretas, segera laporkan agar tidak disalahgunakan.</li>
        <li>Kami sengaja hanya menyediakan opsi pendaftaran/masuk melalui akun GitHub untuk mencegah penyalahgunaan.</li>
      </ol>

      <h2>II. Etika & Perilaku</h2>
      <ol>
        <li>Dilarang melakukan serangan pribadi, seperti menghina, merendahkan, atau mengancam pengguna lain.</li>
        <li>Kritik diperbolehkan, namun harus fokus pada argumen atau ide, bukan pada orangnya.</li>
        <li>Dilarang keras melakukan diskriminasi berdasarkan ras, agama, gender, orientasi seksual, atau latar belakang sosial.</li>
        <li>Dilarang menyebarkan konten yang merusak moral kemanusiaan, termasuk:
          <ol type="a">
            <li>Kekerasan brutal, pelecehan seksual, eksploitasi anak, terorisme, perdagangan manusia, atau promosi bunuh diri.</li>
          </ol>
        </li>
        <li>
          <strong>Diskusi tentang topik sensitif diperbolehkan</strong>, seperti hacking, exploit, malware, social engineering, DDoS, SQL Injection, XSS, bypass, dan bruteforce, dengan tujuan untuk **pendidikan, penelitian, atau simulasi**. Namun, ada batasan yang harus dipatuhi:
          <ol type="a">
            <li>Dilarang memublikasikan data pribadi (doxing) atau akses ilegal yang masih aktif.</li>
            <li>Dilarang mencuri email pribadi (native/pribadi) orang lain.</li>
            <li>Pengguna bertanggung jawab penuh secara pribadi atau kelompok atas konsekuensi hukum tanpa melibatkan pihak website.</li>
          </ol>
        </li>
        <li>Humor, meme, atau percakapan ringan diperbolehkan selama tidak melukai martabat orang lain.</li>
      </ol>

      <h2>III. Konten & Diskusi</h2>
      <ol>
        <li>Pastikan Anda memposting di kategori yang sesuai.</li>
        <li>Hindari melakukan "flood" (memposting berulang-ulang) dan "spam".</li>
        <li>Judul thread harus jelas dan deskriptif, bukan hanya "Tolong!!!" atau "Help".</li>
        <li>Berbagi data atau alat uji diizinkan selama tidak digunakan untuk merugikan individu atau pihak lain (misalnya, memublikasikan data sensitif yang masih aktif).</li>
      </ol>

      <h2>IV. Transaksi & Komunitas</h2>
      <ol>
        <li>Jika melakukan transaksi, disarankan menggunakan sistem penahanan dana (escrow) hingga kesepakatan tercapai.</li>
        <li>Dilarang menipu, memeras, atau menyalahgunakan kepercayaan orang lain.</li>
        <li>Di sini, **pengetahuan lebih penting daripada keuntungan semata**.</li>
        <li>
          Pengguna yang memiliki portofolio atau reputasi baik dari platform lain dapat menerima penghargaan (badge) dari kami. Kami tidak membatasi penghargaan dari berbagai platform, namun kami memiliki pedoman khusus untuk menyeleksi dan memverifikasi kelayakan pengguna sebelum memberikan penghargaan.
        </li>
      </ol>

      <h2>V. Penegakan Aturan</h2>
      <ol>
        <li>Moderator dan arbitrator akan bertindak sebagai mediator untuk menyelesaikan masalah, bukan untuk membela salah satu pihak.</li>
        <li>Pelanggaran ringan akan dikenai teguran.</li>
        <li>Pelanggaran serius (seperti merugikan orang lain secara langsung, eksploitasi manusia, atau penipuan) akan berakibat pada **banned** permanen.</li>
        <li>Diskusi mengenai keputusan moderator atau arbitrator diperbolehkan.</li>
      </ol>

      <h2>VI. Nilai Dasar Komunitas</h2>
      <ul>
        <li>Kemanusiaan di atas segalanya.</li>
        <li>Ilmu digunakan untuk berkembang, bukan untuk menindas.</li>
        <li>Kebebasan berbicara harus disertai dengan tanggung jawab.</li>
        <li>Bertindak dengan rasionalitas dan kesadaran penuh.</li>
        <li>Saling menghargai, meskipun memiliki pandangan yang berbeda.</li>
        <li>Miliki simpati, empati, dan kepedulian terhadap orang lain.</li>
      </ul>

      <p className="note">
        Di komunitas ini, kebebasan dan etika berbaur menjadi satu. Ketika Anda melanggar aturan, Anda akan menerima konsekuensinya, dan sebaliknya, ketika Anda patuh, Anda akan mendapatkan manfaatnya. Ingat, tidak perlu merusak seluruh rumah hanya untuk mengeluarkan mobil; ada banyak cara yang lebih baik, seperti merusak garasi. Salam.
      </p>
    </section>
  );
}

