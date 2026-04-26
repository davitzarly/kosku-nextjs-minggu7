import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'KosKu – Temukan Kos Impianmu',
  description: 'Platform pencarian kos terpercaya di Indonesia. Temukan hunian nyaman sesuai kebutuhanmu dengan mudah dan cepat.',
  keywords: 'kos, kost, sewa kamar, kontrakan, Indonesia',
}

// ROOT LAYOUT = Server Component (default di Next.js App Router)
// Layout ini membungkus SEMUA halaman secara konsisten
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Navbar tampil di semua halaman */}
        <Navbar />

        {/* children = konten halaman yang aktif */}
        <main>{children}</main>

        {/* Footer tampil di semua halaman */}
        <Footer />
      </body>
    </html>
  )
}
