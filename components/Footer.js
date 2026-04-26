// SERVER COMPONENT (default) - tidak perlu 'use client'
// Footer hanya menampilkan konten statis, tidak butuh interaktivitas

import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* BRAND */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoDot}></span>
            KosKu
          </div>
          <p>Platform pencarian kos terpercaya di Indonesia. Temukan hunian nyaman sesuai kebutuhanmu.</p>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
            <a href="https://github.com/davitzarly" target="_blank" rel="noopener noreferrer" aria-label="GitHub">🐙</a>
          </div>
        </div>

        {/* LINKS */}
        <div className={styles.links}>
          <div>
            <strong>Navigasi</strong>
            <Link href="/">Beranda</Link>
            <Link href="/about">Tentang Kami</Link>
            <Link href="/services">Layanan</Link>
            <Link href="/contact">Kontak</Link>
          </div>
          <div>
            <strong>Tim</strong>
            <Link href="/team/1">Davit Zarly</Link>
            <Link href="/team/2">Rina Kusuma</Link>
            <Link href="/team/3">Budi Santoso</Link>
            <Link href="/team/4">Dewi Rahayu</Link>
          </div>
          <div>
          <strong>Legal</strong>
          <Link href="/syarat">Syarat & Ketentuan</Link>
          <Link href="/privasi">Kebijakan Privasi</Link>
          <Link href="/cookie">Cookie Policy</Link>
        </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {currentYear} KosKu. All rights reserved. Built with Next.js 14 🚀</p>
        <p className={styles.credit}>Dibuat oleh <strong>Davit Zarly</strong> — Tugas MSIB Minggu 7</p>
      </div>
    </footer>
  )
}
