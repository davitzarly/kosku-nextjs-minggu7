# KosKu – Mini Company Profile 🏠

> Tugas Minggu 7 MSIB Batch 4 – PT Vinix Seven Aurum  
> **Davit Zarly** | Universitas Negeri Padang | Divisi Web Dev UIUX

---

## 📸 Screenshot

<!-- Tambahkan screenshot setelah deploy -->
![KosKu Home](./public/screenshot-home.png)

---

## 🔗 Live Demo

🌐 [https://kosku.vercel.app](https://kosku.vercel.app)  
📦 [Repository GitHub](https://github.com/davitzarly/kosku-nextjs)

---

## 📋 Deskripsi Project

**KosKu** adalah aplikasi Mini Company Profile yang dibangun menggunakan **Next.js 14 App Router** sebagai tugas minggu ke-7. Aplikasi ini merupakan company profile untuk startup platform pencarian kos fiktif, yang dikembangkan dari Landing Page minggu ke-6.

---

## 🗂️ Struktur Folder (App Router)

```
kosku-nextjs/
├── app/
│   ├── layout.js          ← Layout global (Navbar + Footer)
│   ├── page.js            ← Route / (Beranda)
│   ├── globals.css        ← CSS global
│   ├── about/
│   │   └── page.js        ← Route /about
│   ├── services/
│   │   └── page.js        ← Route /services
│   ├── contact/
│   │   └── page.js        ← Route /contact
│   ├── team/
│   │   └── [id]/
│   │       └── page.js    ← Dynamic Route /team/1, /team/2, ...
│   └── api/
│       └── team/
│           └── route.js   ← API Route Handler GET /api/team
├── components/
│   ├── Navbar.js          ← Client Component (useState untuk mobile menu)
│   ├── Footer.js          ← Server Component
│   └── ContactForm.js     ← Client Component (useState untuk form)
├── data/
│   ├── team.json          ← Data tim (simulasi fetch API)
│   └── services.json      ← Data layanan
└── README.md
```

---

## ✅ Kriteria Tugas yang Dipenuhi

| Kriteria | Status |
|----------|--------|
| App Router dengan folder `app/` | ✅ |
| Halaman `/`, `/about`, `/services`, `/contact` | ✅ |
| Dynamic Route `/team/[id]` | ✅ |
| Layout global (Navbar + Footer) | ✅ |
| Server Component (data fetching) | ✅ |
| Client Component (useState) | ✅ |
| Data fetching dari file JSON lokal | ✅ |
| API Route Handler `/api/team` | ✅ |

---

## 🖥️ Server vs Client Components

### Server Components (default)
- `app/layout.js` — Layout global
- `app/page.js` — Halaman beranda, fetch data tim
- `app/about/page.js` — Halaman tentang, fetch data tim
- `app/services/page.js` — Fetch data layanan dari JSON
- `app/contact/page.js` — Wrapper halaman kontak
- `app/team/[id]/page.js` — Detail anggota tim dinamis
- `components/Footer.js` — Footer statis

### Client Components (`'use client'`)
- `components/Navbar.js` — Toggle mobile menu (useState)
- `components/ContactForm.js` — Validasi & submit form (useState)

---

## 🔌 API Route

**Endpoint:** `GET /api/team`

```bash
# Semua anggota tim
curl https://kosku.vercel.app/api/team

# Filter by ID
curl https://kosku.vercel.app/api/team?id=1
```

**Response:**
```json
{
  "data": [...],
  "total": 4,
  "message": "KosKu Team API - Berhasil"
}
```

---

## 🛠️ Teknologi

- **Next.js 14** – App Router
- **React 18** – UI Library
- **CSS Modules** – Styling per komponen
- **Google Fonts** – Playfair Display + DM Sans

---

## 🚀 Cara Menjalankan

```bash
# Clone repository
git clone https://github.com/davitzarly/kosku-nextjs.git
cd kosku-nextjs

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka di browser
open http://localhost:3000
```

---

## 👤 Author

**Davit Zarly**  
Mahasiswa Informatika – Universitas Negeri Padang  
MSIB Batch 4 – PT Vinix Seven Aurum – Divisi Web Dev UIUX  

📧 davitzarly@gmail.com  
🐙 [github.com/davitzarly](https://github.com/davitzarly)
