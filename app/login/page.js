import LoginForm from './LoginForm'
import styles from './login.module.css'

export const metadata = {
  title: 'Login Admin - KosKu',
  description: 'Masuk ke dashboard admin KosKu.',
}

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const nextUrl = typeof params?.next === 'string' ? params.next : '/dashboard/manage'

  return (
    <section className={styles.loginSection}>
      <div className={`container ${styles.loginWrap}`}>
        <div className={styles.copy}>
          <div className="section-label">Admin KosKu</div>
          <h1>Masuk untuk mengelola data kos.</h1>
          <p>
            Tambahkan, ubah, atau hapus card kos yang tampil di katalog publik.
          </p>
        </div>

        <div className={styles.panel}>
          <h2>Login Admin</h2>
          <p>Gunakan akun admin untuk melanjutkan.</p>
          <LoginForm nextUrl={nextUrl} />
        </div>
      </div>
    </section>
  )
}
