import styles from './dashboard.module.css'

export default function DashboardLoading() {
  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.shell}`}>
        <div className={styles.loadingHeader}>
          <span />
          <strong />
          <p />
        </div>

        <div className={styles.summaryGrid}>
          {[0, 1, 2].map((item) => (
            <div key={item} className={styles.summarySkeleton} />
          ))}
        </div>

        <div className={styles.manager}>
          <div className={styles.toolbarSkeleton} />
          <div className={styles.list}>
            {[0, 1, 2].map((item) => (
              <div key={item} className={styles.rowSkeleton} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
