import styles from './legal.module.css'

export const metadata = {
  title: 'Kebijakan Privasi – KosKu',
}

export default function PrivasiPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">✦ Legal</div>
          <h1>Kebijakan Privasi</h1>
          <p>Terakhir diperbarui: 1 April 2025</p>
        </div>
      </div>

      <section>
        <div className={`container ${styles.legalContent}`}>

          <div className={styles.legalSection}>
            <h2>1. Data yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan beberapa jenis informasi saat kamu menggunakan KosKu:</p>
            <ul>
              <li><strong>Data Identitas:</strong> Nama lengkap, alamat email, nomor telepon</li>
              <li><strong>Data Lokasi:</strong> Kota dan area pencarian kos</li>
              <li><strong>Data Transaksi:</strong> Riwayat pembayaran dan pemesanan</li>
              <li><strong>Data Perangkat:</strong> Jenis browser, sistem operasi, alamat IP</li>
              <li><strong>Data Aktivitas:</strong> Halaman yang dikunjungi, kos yang dilihat</li>
            </ul>
          </div>

          <div className={styles.legalSection}>
            <h2>2. Cara Kami Menggunakan Data</h2>
            <p>Data yang dikumpulkan digunakan untuk:</p>
            <ul>
              <li>Menyediakan dan meningkatkan layanan KosKu</li>
              <li>Memproses transaksi dan pembayaran</li>
              <li>Mengirimkan notifikasi dan rekomendasi kos</li>
              <li>Menganalisis penggunaan platform untuk perbaikan fitur</li>
              <li>Memenuhi kewajiban hukum yang berlaku</li>
            </ul>
          </div>

          <div className={styles.legalSection}>
            <h2>3. Keamanan Data</h2>
            <p>Kami menerapkan langkah-langkah keamanan standar industri untuk melindungi datamu, termasuk enkripsi SSL/TLS untuk transmisi data, penyimpanan password dengan hashing, dan pembatasan akses data internal. Namun, tidak ada sistem yang 100% aman — kami menyarankan kamu menjaga kerahasiaan akunmu.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>4. Berbagi Data dengan Pihak Ketiga</h2>
            <p>Kami tidak menjual data pribadimu. Data hanya dibagikan kepada:</p>
            <ul>
              <li>Pemilik kos (hanya informasi yang diperlukan untuk pemesanan)</li>
              <li>Penyedia layanan pembayaran (untuk memproses transaksi)</li>
              <li>Pihak berwenang (jika diwajibkan oleh hukum)</li>
            </ul>
          </div>

          <div className={styles.legalSection}>
            <h2>5. Hak Penggunamu</h2>
            <p>Kamu memiliki hak untuk:</p>
            <ul>
              <li>Mengakses data pribadi yang kami simpan</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan akunmu</li>
              <li>Menolak penggunaan data untuk keperluan pemasaran</li>
            </ul>
            <p>Untuk menggunakan hak-hak ini, hubungi kami di <strong>privacy@kosku.id</strong></p>
          </div>

          <div className={styles.legalSection}>
            <h2>6. Retensi Data</h2>
            <p>Kami menyimpan data selama akun aktif atau selama diperlukan untuk layanan. Setelah penghapusan akun, data akan dihapus dalam 30 hari, kecuali data transaksi yang wajib disimpan sesuai peraturan perpajakan.</p>
          </div>

        </div>
      </section>
    </>
  )
}
