'use client'
// ↑ CLIENT COMPONENT: digunakan karena butuh useState untuk toggle mobile menu
// Client Component bisa menggunakan hooks (useState, useEffect, dll.)

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang' },
  { href: '/services', label: 'Layanan' },
  { href: '/contact', label: 'Kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot}></span>
          KosKu
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
     <Link href="/contact" className={`btn-primary ${styles.ctaBtn}`} style={{ fontSize: '0.85rem', padding: '9px 20px' }}>
  Cari Kos
</Link>
        {/* HAMBURGER (mobile) */}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${isOpen ? styles.bar1Open : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.bar2Open : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.bar3Open : ''}`}></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
