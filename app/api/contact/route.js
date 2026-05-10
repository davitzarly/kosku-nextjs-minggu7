import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactApiSchema = z.object({
  name: z.string().trim().min(1, 'Nama wajib diisi').max(100, 'Nama maksimal 100 karakter'),
  email: z.string().trim().toLowerCase().email('Format email tidak valid'),
  message: z.string().trim().min(1, 'Pesan wajib diisi').max(1200, 'Pesan maksimal 1200 karakter'),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const result = contactApiSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Data kontak tidak valid',
          fields: result.error.flatten().fieldErrors,
        },
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
      data: {
        name: result.data.name,
        email: result.data.email,
      }
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
