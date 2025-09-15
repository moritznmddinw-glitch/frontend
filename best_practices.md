### 📘 Project Best Practices

#### 1. Project Purpose  
Ballerina adalah platform komunitas dan utilitas yang menyediakan fitur threads (posting), profil pengguna (akun, badges, saldo), dan navigasi kategori. Frontend menggunakan Next.js (App Router) dengan Tailwind CSS. Backend utama adalah Gin (Golang) sebagai penyedia API, dengan layanan Ruby yang dipertahankan untuk kebutuhan pendukung tertentu. Database yang digunakan adalah PostgreSQL.

#### 2. Project Structure  
- Root (frontend): Next.js 15 App Router, React 19, Tailwind CSS 4
  - app/
    - layout.js: Root layout, import font, Header, Sidebar, dan main container
    - globals.css: Setup Tailwind 4 dan CSS variable untuk tema
    - page.js: Halaman utama (landing/home)
    - account/page.jsx: Halaman pengaturan akun (profile fields, social accounts, change username)
    - thread/[id]/page.jsx: Halaman detail thread (membaca /api/threads/:id)
    - user/[username]/page.jsx: Halaman profil user publik + badges
    - category/[slug]/(…): Halaman kategori threads
    - login, about-content, rules-content, refill-balance, set-username, sync-token: Halaman utilitas terkait akun & konten
  - components/
    - Header.jsx: Navigasi utama, avatar trigger ProfileSidebar
    - Sidebar.jsx: Menu utama (mobile), daftar kategori threads
    - ProfileSidebar.jsx: Menu profil (Account, Manage, Threads, Mark off, saldo, logout)
  - public/: Asset statis (svg dan gambar)
  - Config: eslint.config.mjs, jsconfig.json, next.config.mjs, postcss.config.mjs, package.json
- Backend utama (di luar direktori ini): c:/Users/PC-04/backend-gin (Gin)
- Layanan Ruby (dipertahankan): struktur terpisah sesuai kebutuhan layanan
- Database: PostgreSQL (ballerina-db di c:/Users/PC-04/ballerina-db)

Konvensi entry/config:  
- Base URL API: process.env.NEXT_PUBLIC_API_BASE_URL (default http://localhost:8080)  
- Autentikasi: Token disimpan di localStorage; dikirim sebagai Authorization: Bearer <token>

#### 3. Test Strategy  
Frontend:
- Unit/Component tests: React Testing Library + Jest (rekomendasi). Uji komponen client seperti Header, Sidebar, ProfileSidebar, dan halaman account.
- Integration tests: Uji page-level (App Router) termasuk efek fetch, state loading/error, dan rendering responsif.
- E2E: Playwright untuk skenario kritikal (login, lihat thread, edit profil, daftar thread milik user).
- Mocking: Gunakan MSW (Mock Service Worker) untuk mock endpoint REST saat pengujian. Mock localStorage untuk autentikasi.
- Naming & Lokasi: __tests__ berdekatan dengan file yang diuji atau tests/ di root frontend. Gunakan *.test.jsx untuk komponen React.
- Coverage: Target minimal 70% statements/branches untuk UI kritikal (auth flow, account, thread detail) agar regresi mudah terdeteksi.

Backend (Gin + Ruby):
- Unit tests pada handler/service (Gin) menggunakan httptest.  
- Integration tests terhadap PostgreSQL (gunakan DB test schema atau transaksi rollback).  
- Kontrak API: Uji kompatibilitas response shape yang digunakan frontend (lihat pola di bagian "Framework & Library Choices").

#### 4. Code Style  
- Bahasa/Framework: React 19 + Next 15 App Router.
- Komponen client: Tambahkan "use client" ketika menggunakan localStorage, useEffect, atau interaksi DOM.
- Data fetching: 
  - Client-side fetch di useEffect untuk endpoint yang memerlukan token dari localStorage (contoh: /api/account/me, /api/threads/:id).
  - Sertakan pembatalan sederhana (flag cancelled) untuk mencegah setState setelah unmount (pola sudah dipakai di account & thread detail).
- Error handling: Tampilkan state error yang ringkas dan informatif; fallback UX: Loading..., error text merah, dan hindari crash.
- Penamaan: 
  - File/route: gunakan folder dinamis [id], [username], [slug] (sudah konsisten).
  - Variabel state: jelas dan deskriptif (loading, error, data, me, socials, dsb.).
- Styling: Tailwind CSS v4. Gunakan utility class responsif (sm:, md:) dan konsisten border/rounded/padding seperti komponen yang ada. Hindari style inline kecuali diperlukan.
- Aksesibilitas: Tombol memiliki aria-label pada ikon/hamburger; link gunakan <Link> Next; gambar beri alt.
- Internationalization: UI saat ini berbahasa Indonesia—pertahankan konsistensi bahasa pada copy baru.

#### 5. Common Patterns  
- Auth token: Simpan di localStorage key "token"; attach ke header Authorization: Bearer ${token}.  
- API base: Bangun URL dari NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080" dan prefiks "/api" bila endpoint backend menggunakannya.
- Fetch pattern:
  - r.ok ? r.json() : Promise.reject(new Error(...))
  - try/catch minimalis di event handler; tampilkan pesan error user-friendly.
- Routing: App Router dengan dynamic segments: /thread/[id], /user/[username], /category/[slug].
- UI Pattern: Komponen layout konsisten (border, rounded, bg-white, px-3/4, py-2/4), responsive container max-w-5xl dan max-w-2xl per halaman.
- Utility lokal: slugify di Sidebar untuk membentuk URL kategori.

#### 6. Do's and Don'ts  
- ✅ Do
  - Gunakan "use client" untuk komponen yang membaca localStorage atau menggunakan efek.
  - Pastikan semua halaman dan komponen mobile-first, gunakan breakpoint Tailwind (sm:, md:).
  - Validasi response API sebelum setState; tampilkan state loading/error.
  - Jaga konsistensi spacing/typography (lihat pola di thread detail & account page).
  - Gunakan env var NEXT_PUBLIC_API_BASE_URL, jangan hardcode URL produksi.
  - Simpan perubahan state secara imutabel dan hindari side-effect di render.
  - Ikuti skema Authorization: Bearer di semua permintaan yang butuh autentikasi.

- ❌ Don't
  - Jangan melakukan fetching di server untuk data yang membutuhkan token dari localStorage.
  - Jangan menambahkan dependency besar baru tanpa kebutuhan jelas (axios, state libs) bila fetch/hook cukup.
  - Jangan mengubah response shape yang sudah digunakan oleh frontend tanpa koordinasi (breaking changes).
  - Jangan menggunakan style yang memotong konten atau menghilangkan responsivitas.

#### 7. Tools & Dependencies  
- Frontend
  - next 15, react 19, react-dom 19
  - tailwindcss v4 (@import "tailwindcss" di globals.css)
  - eslint 9 + eslint-config-next
- Scripts
  - npm run dev — Next dev (turbopack)
  - npm run build — Build (turbopack)
  - npm start — Start produksi
- Env
  - NEXT_PUBLIC_API_BASE_URL — Base URL backend Gin (default http://localhost:8080)
- Backend
  - Gin (utama, port 8080 direkomendasikan untuk dev)
  - Ruby service (dipertahankan untuk kebutuhan khusus)
  - PostgreSQL (skema dan migrasi selaras dengan kebutuhan threads, users, badges, balances)

#### 8. Other Notes  
- Integrasi fitur Threads (lanjutan):
  - List threads milik pengguna di sidebar profile (menu "Threads"):  
    - Endpoint rekomendasi: GET /api/threads/me?limit=&cursor= (authed).  
    - Response minimal: [{ id, title, created_at, category: { slug, name } }].  
  - Edit thread:  
    - Endpoint: PUT /api/threads/:id (authed; only owner).  
    - Validasi ownership di backend Gin; gunakan 403 bila bukan pemilik.  
    - Frontend: halaman/form edit ringan dengan pengendalian state + pesan sukses/error.  
  - Detail thread (sudah ada): GET /api/threads/:id — pastikan field: title, created_at (epoch seconds), category { slug,name }, user { username }, summary, content_type, content, meta { image, telegram }.

- Pengaturan Account (Avatar/Foto Profil):
  - Endpoint upload avatar (rekomendasi):  
    - PUT /api/account/avatar (multipart/form-data dengan field file=...) atau POST untuk upload.  
    - GET /api/user/:username untuk mengembalikan avatar_url.  
  - Validasi jenis/ukuran file di backend; simpan ke storage (local/S3) dan simpan URL di DB.  
  - Frontend: tampilkan avatar di Header (fallback /avatar-default.png) dan halaman Account untuk mengganti.

- Kontrak API dan Konsistensi:  
  - Gunakan JSON key snake_case di payload (mengikuti pola account page: full_name, social_accounts).  
  - Tanggal epoch seconds (seperti created_at di thread detail).  
  - Error body konsisten { error: string } atau plain text; frontend saat ini menangani keduanya.

- Responsiveness & UI:  
  - Gunakan container max-w-5xl (layout) dan max-w-2xl (content/detail).  
  - Pastikan overflow konten tabel/gambar dibungkus (overflow-x-auto, object-cover, rounded, border).  
  - Gunakan spacing seragam (px-3/4, py-2/4) dan warna netral sesuai komponen yang ada.

- Keamanan & Auth:  
  - Token di localStorage; logout harus menghapus token dan redirect ke /login.  
  - Semua endpoint yang memerlukan autentikasi wajib menolak jika Authorization tidak valid (401/403) dan tidak mengembalikan data sensitif.

- Pengembangan Lintas Stack:  
  - Gin adalah backend utama; Ruby service tetap ada untuk proses khusus (etl, batch, dsb.) dan berkomunikasi via message queue atau HTTP internal bila perlu.  
  - Hindari duplikasi logika antar layanan; definisikan source of truth pada Gin untuk resource yang diakses frontend.  
  - Skema PostgreSQL disusun agar mendukung relasi threads-users-categories-badges secara eksplisit (foreign key) dan index pada kolom pencarian/urut.

- Pedoman untuk LLM yang menghasilkan kode:  
  - Gunakan fetch bawaan; jangan menambah klien HTTP baru.  
  - Patuh pada base URL env; gunakan Authorization: Bearer.  
  - Pertahankan bahasa UI Indonesia dan pola styling Tailwind yang konsisten.  
  - Untuk fitur yang memerlukan token, implementasi harus client component ("use client").  
  - Jangan menghapus atau mengubah API shape yang telah digunakan komponen eksisting.
