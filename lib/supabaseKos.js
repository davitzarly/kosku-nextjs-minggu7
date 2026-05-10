const KOS_TABLE = 'kos_properties'

function createSupabaseError(message, status) {
  const error = new Error(message)
  error.status = status
  return error
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim()
  const apiKey = (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY)?.trim()

  if (!url || !apiKey) {
    throw createSupabaseError(
      'SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diisi',
      'CONFIG_MISSING'
    )
  }

  return {
    url: url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, ''),
    apiKey,
  }
}

async function readSupabaseError(response, fallback) {
  const text = await response.text()

  if (!text) return fallback

  try {
    const detail = JSON.parse(text)
    return detail.message || detail.details || fallback
  } catch {
    return text
  }
}

function toKosProperty(row) {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    area: row.area,
    owner: row.owner,
    rooms: row.rooms,
    price: row.price,
    availability: row.availability,
    rating: Number(row.rating),
    updatedAt: new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(row.updated_at)),
  }
}

function appendSearchFilter(searchParams, query) {
  const cleanQuery = query.trim()

  if (!cleanQuery) return

  const safeQuery = cleanQuery.replaceAll(',', ' ').replaceAll('*', ' ')
  const fields = ['name', 'city', 'area', 'owner', 'availability']
  const filter = fields.map((field) => `${field}.ilike.*${safeQuery}*`).join(',')

  searchParams.set('or', `(${filter})`)
}

export async function getKosProperties(query = '') {
  const { url, apiKey } = getSupabaseConfig()
  const searchParams = new URLSearchParams({
    select: 'id,name,city,area,owner,rooms,price,availability,rating,updated_at',
    order: 'created_at.asc',
  })

  appendSearchFilter(searchParams, query)

  const response = await fetch(`${url}/rest/v1/${KOS_TABLE}?${searchParams.toString()}`, {
    headers: {
      apikey: apiKey,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await readSupabaseError(
      response,
      `Supabase gagal mengambil data kos (${response.status})`
    )
    throw createSupabaseError(message, response.status)
  }

  const rows = await response.json()
  return rows.map(toKosProperty)
}

export async function updateKosProperty(id, payload) {
  const { url, apiKey } = getSupabaseConfig()

  const response = await fetch(`${url}/rest/v1/${KOS_TABLE}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      apikey: apiKey,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      price: payload.price,
      availability: payload.availability,
      updated_at: new Date().toISOString(),
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await readSupabaseError(
      response,
      `Supabase gagal memperbarui data kos (${response.status})`
    )
    throw createSupabaseError(message, response.status)
  }

  const rows = await response.json()
  return rows[0] ? toKosProperty(rows[0]) : null
}

export async function createKosProperty(payload) {
  const { url, apiKey } = getSupabaseConfig()

  const response = await fetch(`${url}/rest/v1/${KOS_TABLE}`, {
    method: 'POST',
    headers: {
      apikey: apiKey,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      id: payload.id,
      name: payload.name,
      city: payload.city,
      area: payload.area,
      owner: payload.owner,
      rooms: payload.rooms,
      price: payload.price,
      availability: payload.availability,
      rating: payload.rating,
      updated_at: new Date().toISOString(),
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await readSupabaseError(
      response,
      `Supabase gagal menambahkan data kos (${response.status})`
    )
    throw createSupabaseError(message, response.status)
  }

  const rows = await response.json()
  return rows[0] ? toKosProperty(rows[0]) : null
}

export async function deleteKosProperty(id) {
  const { url, apiKey } = getSupabaseConfig()

  const response = await fetch(`${url}/rest/v1/${KOS_TABLE}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      apikey: apiKey,
      Prefer: 'return=minimal',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await readSupabaseError(
      response,
      `Supabase gagal menghapus data kos (${response.status})`
    )
    throw createSupabaseError(message, response.status)
  }
}
