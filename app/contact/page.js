// SERVER COMPONENT
// Halaman ini adalah Server Component, tapi meng-import Client Component (ContactForm)
// Next.js mendukung komposisi ini dengan sempurna

import ContactForm from '@/components/ContactForm'
import styles from './contact.module.css'

export const metadata = {
  title: 'Kontak – KosKu',
  description: 'Hubungi tim KosKu untuk pertanyaan, saran, atau kerjasama.',
}

export default function ContactPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <div className="section-label">✦ Hubungi Kami</div>
          <h1>Ada yang Bisa<br />Kami Bantu?</h1>
          <p>Tim KosKu siap membantu pertanyaan, masukan, atau kebutuhan kerjasama kamu.</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* INFO KONTAK - Server Component (data statis) */}
            <div className={styles.contactInfo}>
              <div className="section-label">✦ Informasi</div>
              <h2 className="section-title">Cara Menghubungi Kami</h2>
              <p style={{ color: '#4B5563', marginBottom: '2rem', lineHeight: 1.7 }}>
                Kami beroperasi Senin–Jumat pukul 09.00–17.00 WIB. Untuk pertanyaan mendesak,
                silakan hubungi langsung via WhatsApp.
              </p>

              {[
                { icon: '📧', label: 'Email', value: 'hello@kosku.id' },
                { icon: '📱', label: 'WhatsApp', value: '+62 812-3456-7890' },
                { icon: '📍', label: 'Alamat', value: 'Jl. Pemuda No.12, Padang, Sumatera Barat' },
                { icon: '🕐', label: 'Jam Operasional', value: 'Senin–Jumat, 09.00–17.00 WIB' },
              ].map((item) => (
                <div key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}

            </div>

            {/* FORM - menggunakan Client Component */}
            <div className={styles.formCard}>
              <h3>Kirim Pesan</h3>
              <p>Isi form di bawah dan kami akan membalas dalam 1x24 jam.</p>
              {/* ContactForm = CLIENT COMPONENT karena butuh useState */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
