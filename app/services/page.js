// SERVER COMPONENT
// Data fetching dari file JSON lokal (simulasi fetch API)
import styles from './services.module.css'

async function getServices() {
  const data = await import('@/data/services.json')
  return data.default
}

export const metadata = {
  title: 'Layanan – KosKu',
  description: 'Semua fitur dan layanan unggulan yang KosKu tawarkan untuk memudahkan pencarian kos.',
}

export default async function ServicesPage() {
  // Data fetching di Server Component
  const services = await getServices()

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <div className="section-label">✦ Layanan Kami</div>
          <h1>Fitur Lengkap untuk<br />Pengalaman Terbaik</h1>
          <p>Dari pencarian hingga pembayaran, semua dirancang sesederhana dan seaman mungkin untukmu.</p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <section>
        <div className="container">
          <div className="section-label">✦ Semua Fitur</div>
          <h2 className="section-title">6 Layanan Unggulan KosKu</h2>
          <p className="section-sub">Kami terus berinovasi untuk menghadirkan pengalaman mencari kos yang paling seamless di Indonesia.</p>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <article key={service.id} className={`${styles.serviceCard} ${index === 0 ? styles.featured : ''}`}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((f) => (
                    <li key={f}>
                      <span className={styles.checkmark}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div className="section-label">✦ Server vs Client</div>
          <h2 className="section-title">Teknologi di Balik KosKu</h2>
          <p className="section-sub">Dibangun dengan Next.js 14 App Router menggunakan Server dan Client Components secara optimal.</p>

          <div className={`grid-2 ${styles.compGrid}`}>
            <div className={styles.compCard} style={{ borderTop: '4px solid #1A9547' }}>
              <h3>🖥️ Server Components</h3>
              <p>Digunakan untuk konten statis yang tidak butuh interaksi browser.</p>
              <ul className={styles.compList}>
                <li>✓ Halaman beranda (data kos)</li>
                <li>✓ Daftar layanan & tim</li>
                <li>✓ Profil anggota tim</li>
                <li>✓ Layout global (Navbar, Footer)</li>
                <li>✓ Data fetching langsung di server</li>
              </ul>
              <div className={styles.compTag}>Default di App Router</div>
            </div>
            <div className={styles.compCard} style={{ borderTop: '4px solid #6366f1' }}>
              <h3>💻 Client Components</h3>
              <p>Digunakan untuk komponen yang butuh interaktivitas pengguna.</p>
              <ul className={styles.compList}>
                <li>✓ Navbar (toggle mobile menu)</li>
                <li>✓ Form kontak (validasi & submit)</li>
                <li>✓ Tombol favorit (useState)</li>
                <li>✓ Filter pencarian (interaktif)</li>
                <li>✓ Notifikasi & alert</li>
              </ul>
              <div className={styles.compTag} style={{ background: '#EEF2FF', color: '#6366f1' }}>Ditandai &apos;use client&apos;</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
