import { useEffect, useState } from 'react'
import { getMyStatus } from '../api'
import { useAuth } from '../AuthContext'

function Card({ label, value, accent }) {
  return (
    <div style={{
      background: 'var(--bg-panel)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '18px 20px', boxShadow: 'var(--shadow)'
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div className="mono" style={{ fontSize: 26, fontWeight: 600, marginTop: 6, color: accent || 'var(--text)' }}>
        {value}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { token } = useAuth()
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getMyStatus(token).then(setStatus).catch(() => setError(true))
  }, [token])

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-dim)', marginTop: 0, marginBottom: 24, fontSize: 14 }}>
        Live status of your connected bot.
      </p>

      {error && (
        <div style={{
          background: 'var(--bg-panel)', border: '1px solid var(--down)', borderRadius: 10,
          padding: 16, marginBottom: 20, color: 'var(--down)', fontSize: 14
        }}>
          Can't reach the backend, or you haven't connected an exchange yet — check Settings.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <Card label="Connected" value={status?.connected ? 'Yes' : 'No'} />
        <Card label="Mode" value={status?.mode || '—'} accent="var(--accent)" />
        <Card label="Bot" value={status?.active ? 'Running' : 'Stopped'} accent={status?.active ? 'var(--up)' : 'var(--text-dim)'} />
        <Card label="Active Pairs" value={status?.active_pairs?.length ?? 0} />
      </div>

      <div style={{
        background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12, padding: 20
      }}>
        <h2 style={{ fontSize: 15, marginTop: 0, marginBottom: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Today's Watchlist
        </h2>
        {status?.active_pairs?.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {status.active_pairs.map(p => (
              <span key={p} className="mono" style={{
                border: '1px solid var(--border)', borderRadius: 999, padding: '4px 12px', fontSize: 13
              }}>{p}</span>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>No scan has run yet, or the bot isn't active.</p>
        )}
      </div>
    </div>
  )
}
