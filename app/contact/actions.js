'use server'

import { insertContactMessage } from '@/lib/supabaseContact'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalize(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validateContactMessage(data) {
  const errors = {}

  if (!data.name) errors.name = 'Nama wajib diisi'
  if (!data.email) errors.email = 'Email wajib diisi'
  else if (!emailPattern.test(data.email)) errors.email = 'Format email tidak valid'
  if (!data.message) errors.message = 'Pesan wajib diisi'

  return errors
}

export async function saveContactMessage(formData) {
  const payload = {
    name: normalize(formData.name),
    email: normalize(formData.email).toLowerCase(),
    phone: normalize(formData.phone) || null,
    subject: normalize(formData.subject) || null,
    message: normalize(formData.message),
  }

  const errors = validateContactMessage(payload)

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Periksa kembali data yang wajib diisi.',
      errors,
    }
  }

  try {
    await insertContactMessage(payload)

    return {
      status: 'success',
      message: 'Pesan berhasil tersimpan. Tim KosKu akan membalas dalam 1x24 jam.',
      errors: {},
    }
  } catch (error) {
    console.error('Gagal menyimpan pesan kontak:', error)

    return {
      status: 'error',
      message:
        'Pesan belum berhasil disimpan. Periksa konfigurasi Supabase, API key, tabel, dan insert policy.',
      errors: {},
    }
  }
}
