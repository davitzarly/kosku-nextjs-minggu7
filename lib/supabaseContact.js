const CONTACT_TABLE = 'contact_messages'

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

export async function insertContactMessage(payload) {
  const { url, apiKey } = getSupabaseConfig()

  const response = await fetch(`${url}/rest/v1/${CONTACT_TABLE}`, {
    method: 'POST',
    headers: {
      apikey: apiKey,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!response.ok) {
    const text = await response.text()
    let message = `Supabase menolak penyimpanan data (${response.status})`

    if (text) {
      try {
        const detail = JSON.parse(text)
        message = detail.message || detail.details || message
      } catch {
        message = text
      }
    }

    throw createSupabaseError(message, response.status)
  }
}
