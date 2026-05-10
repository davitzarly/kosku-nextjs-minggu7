'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_COOKIE = 'kosku_session'
const DEFAULT_ADMIN_PASSWORD = 'kosku-admin'

function getSafeRedirect(value) {
  if (value === '/dashboard') {
    return '/dashboard/manage'
  }

  if (typeof value === 'string' && value.startsWith('/dashboard')) {
    return value
  }

  return '/dashboard/manage'
}

export async function loginAdmin(prevState, formData) {
  const username = String(formData.get('username') || '').trim()
  const password = String(formData.get('password') || '')
  const nextUrl = getSafeRedirect(formData.get('next'))
  const expectedPassword = process.env.KOSKU_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD

  if (username !== 'admin' || password !== expectedPassword) {
    return {
      status: 'error',
      message: 'Username atau password tidak sesuai.',
    }
  }

  cookies().set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    maxAge: 60 * 60 * 2,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  redirect(nextUrl)
}

export async function logoutAdmin() {
  cookies().delete(SESSION_COOKIE)
  redirect('/login')
}
