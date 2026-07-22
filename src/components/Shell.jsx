import { NavLink } from 'react-router-dom'
import { useTheme } from '../ThemeContext'

export default function Shell({ children }) {
  const { theme, toggle } = useTheme()

  const linkStyle = ({ isActive }) => ({
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: isActive ? 'var(--bg)' : 'var(--text-dim)',
    background: isActive ? 'var(--accent)' : 'transparent',
    textDecoration: 'none',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
            Signal<span style={{ color: 'var(--accent)' }}>Deck</span>
          </span>
          <nav style={{ display: 'flex', gap: 4 }}>
            <NavLink to="/" end style={linkStyle}>Dashboard</NavLink>
            <NavLink to="/history" style={linkStyle}>Trade History</NavLink>
            <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
            <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
          </nav>
        </div>
        <button
          onClick={toggle}
          aria-label="Toggle light and dark mode"
          style={{
            border: '1px solid var(--border)', background: 'var(--bg-panel-raised)',
            color: 'var(--text)', borderRadius: 8, padding: '6px 12px', fontSize: 13
          }}
        >
          {theme === 'dark' ? '☾ Dark' : '☀ Light'}
        </button>
      </header>
      <main style={{ flex: 1, padding: 24, maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
