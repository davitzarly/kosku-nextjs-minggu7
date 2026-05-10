'use server'

import { z } from 'zod'

const availabilityOptions = ['Tersedia', 'Terbatas', 'Penuh']

const updateKosSchema = z.object({
  id: z.string().min(1, 'ID kos tidak valid'),
  price: z.coerce
    .number({ invalid_type_error: 'Harga harus berupa angka' })
    .int('Harga harus berupa angka bulat')
    .min(500000, 'Harga minimal Rp 500.000')
    .max(10000000, 'Harga maksimal Rp 10.000.000'),
  availability: z.enum(availabilityOptions, {
    errorMap: () => ({ message: 'Status ketersediaan tidak valid' }),
  }),
})

const deleteKosSchema = z.string().min(1, 'ID kos tidak valid')

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function updateKosAction(formData) {
  const result = updateKosSchema.safeParse({
    id: formData.get('id'),
    price: formData.get('price'),
    availability: formData.get('availability'),
  })

  if (!result.success) {
    return {
      status: 'error',
      message: result.error.issues[0]?.message || 'Data kos tidak valid.',
    }
  }

  await wait(700)

  return {
    status: 'success',
    message: 'Data kos berhasil diperbarui.',
    data: result.data,
  }
}

export async function deleteKosAction(id) {
  const result = deleteKosSchema.safeParse(id)

  if (!result.success) {
    return {
      status: 'error',
      message: result.error.issues[0]?.message || 'Data kos tidak valid.',
    }
  }

  await wait(700)

  return {
    status: 'success',
    message: 'Data kos berhasil dihapus.',
    id: result.data,
  }
}
