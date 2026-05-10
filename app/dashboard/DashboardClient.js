'use client'

import { useEffect, useOptimistic, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createKosAction, deleteKosAction, updateKosAction } from './actions'
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
  if (action.type === 'create') {
    return [action.property, ...state]
  }

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

function getPhotoClass(index) {
  const photoClasses = [styles.photoOne, styles.photoTwo, styles.photoThree, styles.photoFour]
  return photoClasses[index % photoClasses.length]
}

function getDescription(property) {
  if (property.description) return property.description

  return `${property.name} berada di ${property.area}, ${property.city}. Kos ini memiliki ${property.rooms} kamar dengan status ${property.availability.toLowerCase()} dan cocok untuk penghuni yang mencari hunian praktis dekat aktivitas harian.`
}

export default function DashboardClient({
  initialProperties,
  initialQuery,
  totalCount,
  canManage = false,
  showCheckout = true,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(initialQuery)
  const [properties, setProperties] = useState(initialProperties)
  const [notice, setNotice] = useState('')
  const [pendingAction, setPendingAction] = useState('')
  const [checkoutProperty, setCheckoutProperty] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState('idle')
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
      router.refresh()
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

    if (result.status === 'success' && result.data) {
      setProperties((current) =>
        applyOptimisticAction(current, {
          type: 'update',
          property: result.data,
        })
      )
      setNotice('Data kos berhasil diperbarui.')
      router.refresh()
    } else {
      setNotice(result.message || 'Data kos belum berhasil diperbarui.')
    }

    setPendingAction('')
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const property = {
      id: `draft-${Date.now()}`,
      name: String(formData.get('name')),
      city: String(formData.get('city')),
      area: String(formData.get('area')),
      owner: String(formData.get('owner')),
      rooms: Number(formData.get('rooms')),
      price: Number(formData.get('price')),
      availability: String(formData.get('availability')),
      rating: Number(formData.get('rating')),
      updatedAt: 'Baru saja',
    }
    const action = { type: 'create', property }

    setNotice('')
    setPendingAction('create')
    startTransition(() => {
      addOptimisticAction(action)
    })

    const result = await createKosAction(formData)

    if (result.status === 'success' && result.data) {
      setProperties((current) =>
        applyOptimisticAction(current, {
          type: 'create',
          property: result.data,
        })
      )
      setNotice('Card kos berhasil ditambahkan.')
      form.reset()
      router.refresh()
    } else {
      setNotice(result.message || 'Card kos belum berhasil ditambahkan.')
    }

    setPendingAction('')
  }

  const openCheckout = (property) => {
    setCheckoutProperty(property)
    setPaymentStatus('idle')
  }

  const closeCheckout = () => {
    setCheckoutProperty(null)
    setPaymentStatus('idle')
  }

  const confirmPayment = () => {
    setPaymentStatus('paid')
    setNotice(`Checkout ${checkoutProperty.name} berhasil dibuat dengan pembayaran QRIS.`)
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

      {canManage && (
        <form className={styles.createPanel} onSubmit={handleCreate}>
          <div className={styles.createHeader}>
            <h3>Tambah Card Kos</h3>
            <p>Card baru akan muncul di katalog publik setelah tersimpan.</p>
          </div>

          <div className={styles.createGrid}>
            <label>
              <span>Nama Kos</span>
              <input type="text" name="name" placeholder="Kos Mawar Residence" required />
            </label>
            <label>
              <span>Kota</span>
              <input type="text" name="city" placeholder="Padang" required />
            </label>
            <label>
              <span>Area</span>
              <input type="text" name="area" placeholder="Jl. Pemuda" required />
            </label>
            <label>
              <span>Pemilik</span>
              <input type="text" name="owner" placeholder="Nama pemilik" required />
            </label>
            <label>
              <span>Kamar</span>
              <input type="number" name="rooms" min="1" max="200" defaultValue="8" required />
            </label>
            <label>
              <span>Harga</span>
              <input type="number" name="price" min="500000" max="10000000" step="50000" defaultValue="1500000" required />
            </label>
            <label>
              <span>Status</span>
              <select name="availability" defaultValue="Tersedia">
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Rating</span>
              <input type="number" name="rating" min="0" max="5" step="0.1" defaultValue="4.5" required />
            </label>
          </div>

          <button type="submit" className={styles.addButton} disabled={pendingAction === 'create'}>
            {pendingAction === 'create' ? 'Menambahkan...' : 'Tambah Card'}
          </button>
        </form>
      )}

      <div className={styles.list}>
        {optimisticProperties.map((property, index) => (
          <article key={property.id} className={styles.kosCard}>
            <div className={`${styles.propertyPhoto} ${getPhotoClass(index)}`}>
              <span className={`${styles.status} ${getStatusClass(property.availability)}`}>
                {property.availability}
              </span>
            </div>

            <div className={styles.propertyBody}>
              <div className={styles.propertyInfo}>
                <div>
                  <strong>{property.name}</strong>
                  <span>{property.area}, {property.city}</span>
                </div>
                <div className={styles.priceBlock}>
                  <strong>{formatPrice(property.price)}</strong>
                  <span>/ bulan</span>
                </div>
              </div>

              <div className={styles.propertyMeta}>
                <span>{property.rooms} kamar</span>
                <span>Rating {property.rating}</span>
                <span>Pemilik {property.owner}</span>
              </div>

              <p className={styles.description}>{getDescription(property)}</p>

              {!canManage && showCheckout && (
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.checkoutButton}
                    onClick={() => openCheckout(property)}
                  >
                    Checkout
                  </button>
                </div>
              )}

              {canManage && (
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
              )}
            </div>
          </article>
        ))}
      </div>

      {optimisticProperties.length === 0 && (
        <div className={styles.emptyState}>
          <strong>Data tidak ditemukan</strong>
          <p>Coba kata kunci lain untuk melihat daftar kos yang tersedia.</p>
        </div>
      )}

      {checkoutProperty && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className={styles.checkoutModal}>
            <div className={styles.modalHeader}>
              <div>
                <span>Checkout Kos</span>
                <h3 id="checkout-title">{checkoutProperty.name}</h3>
              </div>
              <button type="button" onClick={closeCheckout} aria-label="Tutup checkout">
                X
              </button>
            </div>

            <div className={styles.checkoutContent}>
              <div className={styles.checkoutSummary}>
                <div>
                  <span>Lokasi</span>
                  <strong>{checkoutProperty.area}, {checkoutProperty.city}</strong>
                </div>
                <div>
                  <span>Harga sewa</span>
                  <strong>{formatPrice(checkoutProperty.price)} / bulan</strong>
                </div>
                <div>
                  <span>Status kamar</span>
                  <strong>{checkoutProperty.availability}</strong>
                </div>
              </div>

              <div className={styles.paymentBox}>
                <div className={styles.paymentTitle}>
                  <span>Metode Pembayaran</span>
                  <strong>QRIS</strong>
                </div>
                <div className={styles.qrisCode} aria-label="QRIS pembayaran simulasi">
                  {Array.from({ length: 49 }).map((_, index) => (
                    <span key={index} className={index % 3 === 0 || index % 7 === 0 ? styles.qrDark : ''} />
                  ))}
                </div>
                <p>Scan QRIS untuk membayar biaya booking kos.</p>
              </div>
            </div>

            {paymentStatus === 'paid' && (
              <p className={styles.paymentSuccess} role="status">
                Pembayaran QRIS berhasil disimulasikan. Booking kos siap diproses.
              </p>
            )}

            <button
              type="button"
              className={styles.payButton}
              onClick={confirmPayment}
              disabled={paymentStatus === 'paid'}
            >
              {paymentStatus === 'paid' ? 'Pembayaran Berhasil' : 'Saya Sudah Bayar QRIS'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
