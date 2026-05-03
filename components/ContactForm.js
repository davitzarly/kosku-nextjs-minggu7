'use client'

import { useState } from 'react'
import { saveContactMessage } from '@/app/contact/actions'
import styles from './ContactForm.module.css'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [notice, setNotice] = useState('')
  const [errors, setErrors] = useState({})

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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))

    if (status !== 'loading') {
      setStatus('idle')
      setNotice('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('error')
      setNotice('Periksa kembali data yang wajib diisi.')
      return
    }

    setStatus('loading')
    setNotice('')
    setErrors({})

    try {
      const result = await saveContactMessage(formData)

      setStatus(result.status)
      setNotice(result.message)
      setErrors(result.errors || {})

      if (result.status === 'success') {
        setFormData(emptyForm)
      }
    } catch (error) {
      setStatus('error')
      setNotice('Terjadi kesalahan saat mengirim pesan. Coba lagi beberapa saat.')
    }
  }

  const isLoading = status === 'loading'
  const noticeClass = status === 'success' ? styles.noticeSuccess : styles.noticeError

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate aria-busy={isLoading}>
      {notice && (
        <div className={`${styles.notice} ${noticeClass}`} role={status === 'error' ? 'alert' : 'status'}>
          {notice}
        </div>
      )}

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
            aria-invalid={Boolean(errors.name)}
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
            aria-invalid={Boolean(errors.email)}
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
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
      </div>

      <button type="submit" className={`btn-primary ${styles.submitButton}`} disabled={isLoading}>
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  )
}
