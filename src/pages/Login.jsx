import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') await login(email, password)
      else await signup(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-panel-raised)',
    color: 'var(--text)', fontSize: 14, marginTop: 6
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
      <form onSubmit={handleSubmit} style={{
        width: 360, background: 'var(--bg-panel)', border: '1px solid var(--border)',
        borderRadius: 12, padding: 28
      }}>
        <h1 style={{ fontSize: 20, marginTop: 0 }}>
          Signal<span style={{ color: 'var(--accent)' }}>Deck</span>
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: -8, marginBottom: 20 }}>
          {mode === 'login' ? 'Log in to your account' : 'Create an account'}
        </p>

        <label style={{ fontSize: 13, color: 'var(--text-dim)' }}>Email</label>
        <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label style={{ fontSize: 13, color: 'var(--text-dim)', display: 'block', marginTop: 14 }}>Password</label>
        <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />

        {error && <p style={{ color: 'var(--down)', fontSize: 13, marginTop: 12 }}>{error}</p>}

        <button type="submit" style={{
          width: '100%', marginTop: 20, padding: '12px 0', borderRadius: 8, border: 'none',
          background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, fontSize: 14
        }}>
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 13 }}
        >
          {mode === 'login' ? "No account? Sign up" : 'Already have an account? Log in'}
        </button>
      </form>
    </div>
  )
}
