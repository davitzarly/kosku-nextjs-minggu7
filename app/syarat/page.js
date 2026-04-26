import styles from './legal.module.css'

export const metadata = {
  title: 'Syarat & Ketentuan – KosKu',
}

export default function SyaratPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">✦ Legal</div>
          <h1>Syarat & Ketentuan</h1>
          <p>Terakhir diperbarui: 1 April 2025</p>
        </div>
      </div>

      <section>
        <div className={`container ${styles.legalContent}`}>

          <div className={styles.legalSection}>
            <h2>1. Penerimaan Syarat</h2>
            <p>Dengan mengakses dan menggunakan platform KosKu, kamu menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku. Jika kamu tidak menyetujui syarat ini, harap tidak menggunakan layanan kami.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>2. Layanan yang Disediakan</h2>
            <p>KosKu menyediakan platform digital untuk mempertemukan pencari kos dengan pemilik properti. Kami bertindak sebagai perantara dan tidak bertanggung jawab secara langsung atas kondisi fisik properti yang terdaftar.</p>
            <ul>
              <li>Pencarian dan filter properti kos</li>
              <li>Komunikasi antara pencari dan pemilik kos</li>
              <li>Fasilitas pembayaran sewa secara digital</li>
              <li>Sistem rating dan ulasan properti</li>
            </ul>
          </div>

          <div className={styles.legalSection}>
            <h2>3. Kewajiban Pengguna</h2>
            <p>Sebagai pengguna KosKu, kamu wajib:</p>
            <ul>
              <li>Memberikan informasi yang benar dan akurat saat mendaftar</li>
              <li>Tidak menyalahgunakan platform untuk tujuan yang melanggar hukum</li>
              <li>Menjaga kerahasiaan akun dan kata sandi</li>
              <li>Menghormati pengguna lain dan pemilik properti</li>
              <li>Tidak memposting konten yang menyesatkan atau palsu</li>
            </ul>
          </div>

          <div className={styles.legalSection}>
            <h2>4. Pembatasan Tanggung Jawab</h2>
            <p>KosKu tidak bertanggung jawab atas kerugian yang timbul akibat:</p>
            <ul>
              <li>Informasi properti yang tidak akurat dari pemilik kos</li>
              <li>Gangguan teknis atau downtime sistem</li>
              <li>Tindakan penipuan oleh pihak ketiga</li>
              <li>Kerusakan atau kehilangan data akibat force majeure</li>
            </ul>
          </div>

          <div className={styles.legalSection}>
            <h2>5. Pembayaran & Refund</h2>
            <p>Semua transaksi pembayaran melalui KosKu bersifat final. Kebijakan refund berlaku dalam kondisi tertentu seperti pembatalan sepihak oleh pemilik kos atau properti tidak sesuai deskripsi. Pengajuan refund dapat dilakukan dalam 3x24 jam setelah check-in.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>6. Perubahan Syarat</h2>
            <p>KosKu berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui email terdaftar atau notifikasi dalam aplikasi. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan atas syarat baru.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>7. Kontak</h2>
            <p>Jika kamu memiliki pertanyaan mengenai syarat dan ketentuan ini, hubungi kami di:</p>
            <p><strong>Email:</strong> legal@kosku.id</p>
            <p><strong>Alamat:</strong> Jl. Pemuda No.12, Padang, Sumatera Barat</p>
          </div>

        </div>
      </section>
    </>
  )
}
