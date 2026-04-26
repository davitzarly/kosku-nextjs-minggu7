import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validasi
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan wajib diisi' },
        { status: 400 }
      )
    }

    // Di sini bisa tambahkan:
    // - Kirim email pakai nodemailer
    // - Simpan ke database
    // - Integrasi WhatsApp API
    // Untuk sekarang kita simulasi berhasil

    return NextResponse.json({
      success: true,
      message: 'Pesan berhasil dikirim!',
      data: { name, email }
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}