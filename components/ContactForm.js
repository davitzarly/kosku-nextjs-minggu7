'use client'
// CLIENT COMPONENT: Butuh useState untuk mengelola input form dan status pengiriman

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  // useState = hook React, hanya bisa di Client Component
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({})

  // Validasi form sederhana
  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi'
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid'
    if (!formData.message.trim()) newErrors.message = 'Pesan wajib diisi'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error saat user mulai mengetik
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    // Simulasi pengiriman (dalam production: fetch ke API route)
    // const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus('success')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  if (status === 'success') {
    return (
      <div className={styles.successBox}>
        <span className={styles.successIcon}>🎉</span>
        <h3>Pesan Terkirim!</h3>
        <p>Terima kasih telah menghubungi kami. Tim KosKu akan membalas dalam 1x24 jam.</p>
        <button className="btn-primary" onClick={() => setStatus(null)}>
          Kirim Pesan Lain
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="name">Nama Lengkap *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="contoh: Davit Zarly"
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="kamu@email.com"
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="phone">Nomor HP</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subjek</label>
          <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
            <option value="">Pilih topik...</option>
            <option value="pencarian-kos">Pencarian Kos</option>
            <option value="daftar-properti">Daftarkan Properti</option>
            <option value="pembayaran">Masalah Pembayaran</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Pesan *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tulis pesanmu di sini..."
          className={errors.message ? styles.inputError : ''}
        />
        {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={status === 'loading'}
        style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: '12px' }}
      >
        {status === 'loading' ? '⏳ Mengirim...' : 'Kirim Pesan →'}
      </button>
    </form>
  )
}
