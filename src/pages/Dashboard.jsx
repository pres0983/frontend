import { useEffect, useState } from 'react'
import { getStatus } from '../api'

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
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getStatus().then(setStatus).catch(() => setError(true))
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-dim)', marginTop: 0, marginBottom: 24, fontSize: 14 }}>
        Live status of your connected bot, pulled from the backend engine.
      </p>

      {error && (
        <div style={{
          background: 'var(--bg-panel)', border: '1px solid var(--down)', borderRadius: 10,
          padding: 16, marginBottom: 20, color: 'var(--down)', fontSize: 14
        }}>
          Can't reach the backend yet. Set VITE_API_URL to your Render URL, or run the backend locally on port 8000.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <Card label="Bot Mode" value={status?.mode || '—'} accent="var(--accent)" />
        <Card label="Active Pairs" value={status?.active_pairs?.length ?? '—'} />
        <Card label="Last Ping" value={status?.last_ping ? new Date(status.last_ping).toLocaleTimeString() : '—'} />
        <Card label="Last Scan" value={status?.last_scan_date || '—'} />
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
          <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>No scan has run yet — the nightly scan populates this at midnight UTC.</p>
        )}
      </div>
    </div>
  )
}
