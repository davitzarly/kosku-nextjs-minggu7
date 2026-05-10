import { kosProperties } from '@/data/kosProperties'
import { logoutAdmin } from '@/app/login/actions'
import DashboardClient from './DashboardClient'
import styles from './dashboard.module.css'

export const metadata = {
  title: 'Dashboard Admin - KosKu',
  description: 'Kelola data kos KosKu.',
}

function filterProperties(query) {
  const cleanQuery = query.trim().toLowerCase()

  if (!cleanQuery) return kosProperties

  return kosProperties.filter((property) => {
    return [
      property.name,
      property.city,
      property.area,
      property.owner,
      property.availability,
    ].some((value) => value.toLowerCase().includes(cleanQuery))
  })
}

export default function DashboardPage({ searchParams }) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : ''
  const filteredProperties = filterProperties(query)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.shell}`}>
        <header className={styles.header}>
          <div>
            <div className="section-label">Dashboard Admin</div>
            <h1>Pengelolaan KosKu</h1>
            <p>Kelola harga, status kamar, dan daftar properti aktif.</p>
          </div>

          <form action={logoutAdmin}>
            <button type="submit" className={styles.logoutButton}>
              Logout
            </button>
          </form>
        </header>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <span>Total Properti</span>
            <strong>{kosProperties.length}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Tersedia</span>
            <strong>{kosProperties.filter((property) => property.availability === 'Tersedia').length}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Terbatas</span>
            <strong>{kosProperties.filter((property) => property.availability === 'Terbatas').length}</strong>
          </div>
        </div>

        <DashboardClient
          initialProperties={filteredProperties}
          initialQuery={query}
          totalCount={kosProperties.length}
        />
      </div>
    </section>
  )
}
