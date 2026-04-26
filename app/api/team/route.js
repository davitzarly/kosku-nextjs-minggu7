// API ROUTE HANDLER: app/api/team/route.js
// Endpoint: GET /api/team
// Ini adalah Route Handler di App Router (pengganti pages/api/)
// Bisa diakses via fetch('/api/team') dari Client Component

import { NextResponse } from 'next/server'

// Handler untuk method GET
export async function GET(request) {
  try {
    const { default: teamData } = await import('@/data/team.json')

    // Bisa tambahkan query params untuk filter
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const member = teamData.find((m) => m.id === id)
      if (!member) {
        return NextResponse.json(
          { error: 'Member not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ data: member })
    }

    return NextResponse.json({
      data: teamData,
      total: teamData.length,
      message: 'KosKu Team API - Berhasil',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Handler untuk method POST (contoh menerima data)
export async function POST(request) {
  try {
    const body = await request.json()
    // Dalam production: simpan ke database
    return NextResponse.json({
      message: 'Data diterima',
      received: body,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}
