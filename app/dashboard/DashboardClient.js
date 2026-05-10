'use client'

import { useEffect, useOptimistic, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { deleteKosAction, updateKosAction } from './actions'
import styles from './dashboard.module.css'

const availabilityOptions = ['Tersedia', 'Terbatas', 'Penuh']

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(price)
}

function applyOptimisticAction(state, action) {
  if (action.type === 'delete') {
    return state.filter((property) => property.id !== action.id)
  }

  if (action.type === 'update') {
    return state.map((property) => {
      if (property.id !== action.property.id) return property

      return {
        ...property,
        ...action.property,
        updatedAt: 'Baru saja',
      }
    })
  }

  return state
}

function getStatusClass(availability) {
  if (availability === 'Penuh') return styles.statusFull
  if (availability === 'Terbatas') return styles.statusLimited
  return styles.statusAvailable
}

export default function DashboardClient({ initialProperties, initialQuery, totalCount }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(initialQuery)
  const [properties, setProperties] = useState(initialProperties)
  const [notice, setNotice] = useState('')
  const [pendingAction, setPendingAction] = useState('')
  const [, startTransition] = useTransition()
  const [optimisticProperties, addOptimisticAction] = useOptimistic(
    properties,
    applyOptimisticAction
  )

  useEffect(() => {
    setSearchValue(initialQuery)
    setProperties(initialProperties)
  }, [initialProperties, initialQuery])

  const updateUrlQuery = (value) => {
    const params = new URLSearchParams(searchParams.toString())
    const cleanValue = value.trim()

    if (cleanValue) {
      params.set('q', cleanValue)
    } else {
      params.delete('q')
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
    updateUrlQuery(value)
  }

  const clearSearch = () => {
    setSearchValue('')
    updateUrlQuery('')
  }

  const handleDelete = async (property) => {
    const action = { type: 'delete', id: property.id }

    setNotice('')
    setPendingAction(`delete-${property.id}`)
    startTransition(() => {
      addOptimisticAction(action)
    })

    const result = await deleteKosAction(property.id)

    if (result.status === 'success') {
      setProperties((current) => applyOptimisticAction(current, action))
      setNotice(`${property.name} dihapus dari daftar.`)
    } else {
      setNotice(result.message)
    }

    setPendingAction('')
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const property = {
      id: String(formData.get('id')),
      availability: String(formData.get('availability')),
      price: Number(formData.get('price')),
    }
    const action = { type: 'update', property }

    setNotice('')
    setPendingAction(`update-${property.id}`)
    startTransition(() => {
      addOptimisticAction(action)
    })

    const result = await updateKosAction(formData)

    if (result.status === 'success') {
      setProperties((current) =>
        applyOptimisticAction(current, {
          type: 'update',
          property: result.data,
        })
      )
      setNotice('Data kos berhasil diperbarui.')
    } else {
      setNotice(result.message)
    }

    setPendingAction('')
  }

  return (
    <div className={styles.manager}>
      <div className={styles.toolbar}>
        <div>
          <h2>Data Kos</h2>
          <p>
            {optimisticProperties.length} dari {totalCount} data ditampilkan
          </p>
        </div>

        <div className={styles.searchBox}>
          <input
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Cari nama, kota, area, atau pemilik"
            aria-label="Cari data kos"
          />
          {searchValue && (
            <button type="button" onClick={clearSearch} aria-label="Bersihkan pencarian">
              X
            </button>
          )}
        </div>
      </div>

      {notice && <p className={styles.notice}>{notice}</p>}

      <div className={styles.tableHeader} aria-hidden="true">
        <span>Properti</span>
        <span>Harga</span>
        <span>Status</span>
        <span>Aksi</span>
      </div>

      <div className={styles.list}>
        {optimisticProperties.map((property) => (
          <article key={property.id} className={styles.row}>
            <div className={styles.propertyInfo}>
              <strong>{property.name}</strong>
              <span>{property.area}, {property.city}</span>
              <small>
                {property.rooms} kamar - Pemilik {property.owner} - Rating {property.rating}
              </small>
            </div>

            <form className={styles.updateForm} onSubmit={handleUpdate}>
              <input type="hidden" name="id" value={property.id} />
              <label>
                <span>Harga</span>
                <input
                  type="number"
                  name="price"
                  min="500000"
                  max="10000000"
                  step="50000"
                  defaultValue={property.price}
                />
              </label>

              <label>
                <span>Status</span>
                <select name="availability" defaultValue={property.availability}>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className={styles.statusWrap}>
                <span className={`${styles.status} ${getStatusClass(property.availability)}`}>
                  {property.availability}
                </span>
                <small>{formatPrice(property.price)}</small>
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={pendingAction === `update-${property.id}`}
                >
                  {pendingAction === `update-${property.id}` ? 'Menyimpan' : 'Update'}
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDelete(property)}
                  disabled={pendingAction === `delete-${property.id}`}
                >
                  {pendingAction === `delete-${property.id}` ? 'Menghapus' : 'Hapus'}
                </button>
              </div>
            </form>
          </article>
        ))}
      </div>

      {optimisticProperties.length === 0 && (
        <div className={styles.emptyState}>
          <strong>Data tidak ditemukan</strong>
          <p>Coba kata kunci lain untuk melihat daftar kos yang tersedia.</p>
        </div>
      )}
    </div>
  )
}
