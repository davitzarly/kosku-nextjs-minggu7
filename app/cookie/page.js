import styles from './legal.module.css'

export const metadata = {
  title: 'Cookie Policy – KosKu',
}

export default function CookiePage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">✦ Legal</div>
          <h1>Cookie Policy</h1>
          <p>Terakhir diperbarui: 1 April 2025</p>
        </div>
      </div>

      <section>
        <div className={`container ${styles.legalContent}`}>

          <div className={styles.legalSection}>
            <h2>1. Apa itu Cookie?</h2>
            <p>Cookie adalah file teks kecil yang disimpan di perangkatmu saat mengunjungi sebuah website. Cookie membantu website mengingat preferensimu dan meningkatkan pengalaman penggunaan secara keseluruhan.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>2. Cookie yang Kami Gunakan</h2>

            <div className={styles.cookieTable}>
              <div className={styles.cookieRow + ' ' + styles.cookieHeader}>
                <span>Jenis Cookie</span>
                <span>Tujuan</span>
                <span>Durasi</span>
              </div>
              <div className={styles.cookieRow}>
                <span><strong>Esensial</strong></span>
                <span>Login, sesi pengguna, keamanan</span>
                <span>Sesi / 30 hari</span>
              </div>
              <div className={styles.cookieRow}>
                <span><strong>Preferensi</strong></span>
                <span>Bahasa, lokasi, pengaturan tampilan</span>
                <span>1 tahun</span>
              </div>
              <div className={styles.cookieRow}>
                <span><strong>Analitik</strong></span>
                <span>Statistik penggunaan (Google Analytics)</span>
                <span>2 tahun</span>
              </div>
              <div className={styles.cookieRow}>
                <span><strong>Pemasaran</strong></span>
                <span>Iklan yang relevan dengan minatmu</span>
                <span>90 hari</span>
              </div>
            </div>
          </div>

          <div className={styles.legalSection}>
            <h2>3. Cookie Esensial</h2>
            <p>Cookie ini wajib ada agar website berfungsi dengan benar. Tanpa cookie ini, fitur seperti login, keranjang favorit, dan keamanan akun tidak akan bekerja. Cookie esensial tidak dapat dinonaktifkan.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>4. Cookie Analitik</h2>
            <p>Kami menggunakan Google Analytics untuk memahami bagaimana pengguna berinteraksi dengan platform kami. Data ini bersifat anonim dan digunakan semata-mata untuk meningkatkan kualitas layanan. Kamu dapat menolak cookie analitik melalui pengaturan browser.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>5. Cara Mengelola Cookie</h2>
            <p>Kamu dapat mengatur preferensi cookie melalui browser:</p>
            <ul>
              <li><strong>Chrome:</strong> Pengaturan → Privasi & Keamanan → Cookie</li>
              <li><strong>Firefox:</strong> Pengaturan → Privasi & Keamanan → Cookie</li>
              <li><strong>Safari:</strong> Preferensi → Privasi → Kelola Data Website</li>
              <li><strong>Edge:</strong> Pengaturan → Cookie & Izin Situs</li>
            </ul>
            <p style={{marginTop: '1rem'}}>Perlu diingat bahwa menonaktifkan cookie tertentu dapat mempengaruhi fungsi platform KosKu.</p>
          </div>

          <div className={styles.legalSection}>
            <h2>6. Pertanyaan Lebih Lanjut</h2>
            <p>Jika kamu memiliki pertanyaan seputar penggunaan cookie di platform kami, jangan ragu untuk menghubungi:</p>
            <p><strong>Email:</strong> privacy@kosku.id</p>
          </div>

        </div>
      </section>
    </>
  )
}
