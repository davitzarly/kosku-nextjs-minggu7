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

function getSubmitErrorMessage(error) {
  if (error?.status === 'CONFIG_MISSING') {
    return 'Konfigurasi Supabase di Vercel belum lengkap. Isi SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY, lalu redeploy.'
  }

  if (error?.status === 401 || error?.status === 403) {
    return 'Supabase menolak akses. Periksa API key, RLS policy, dan grant insert tabel contact_messages.'
  }

  if (error?.status === 404) {
    return 'Supabase tidak menemukan endpoint tabel. Pastikan SUPABASE_URL hanya sampai .supabase.co dan tabel contact_messages sudah dibuat.'
  }

  return `Pesan belum berhasil disimpan. Detail: ${error?.message || 'Periksa konfigurasi Supabase.'}`
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
      message: getSubmitErrorMessage(error),
      errors: {},
    }
  }
}
