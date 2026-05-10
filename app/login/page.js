import LoginForm from './LoginForm'
import styles from './login.module.css'

export const metadata = {
  title: 'Login Admin - KosKu',
  description: 'Masuk ke dashboard admin KosKu.',
}

export default function LoginPage({ searchParams }) {
  const nextUrl = typeof searchParams?.next === 'string' ? searchParams.next : '/dashboard'

  return (
    <section className={styles.loginSection}>
      <div className={`container ${styles.loginWrap}`}>
        <div className={styles.copy}>
          <div className="section-label">Admin KosKu</div>
          <h1>Masuk untuk mengelola data kos.</h1>
          <p>
            Kelola daftar properti, ketersediaan kamar, dan harga sewa dari
            satu tempat.
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
