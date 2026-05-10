'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { loginAdmin } from './actions'
import styles from './login.module.css'

const initialState = {
  status: 'idle',
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Memeriksa...' : 'Masuk Dashboard'}
    </button>
  )
}

export default function LoginForm({ nextUrl }) {
  const [state, formAction] = useFormState(loginAdmin, initialState)

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="next" value={nextUrl} />

      {state.status === 'error' && (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      )}

      <label>
        <span>Username</span>
        <input
          type="text"
          name="username"
          autoComplete="username"
          placeholder="admin"
          required
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="kosku-admin"
          required
        />
      </label>

      <SubmitButton />
    </form>
  )
}
