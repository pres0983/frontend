const MOCK_USERS = [
  { id: 1, email: 'you@example.com', mode: 'demo', active: true, trades: 12 },
]

export default function AdminPanel() {
  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Admin</h1>
      <p style={{ color: 'var(--text-dim)', marginTop: 0, marginBottom: 24, fontSize: 14 }}>
        Visible only to the admin role once auth is wired in. Manages the platform, not user funds.
      </p>

      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: 'var(--bg-panel-raised)', textAlign: 'left' }}>
              <th style={{ padding: '10px 16px', color: 'var(--text-dim)', fontWeight: 500 }}>User</th>
              <th style={{ padding: '10px 16px', color: 'var(--text-dim)', fontWeight: 500 }}>Mode</th>
              <th style={{ padding: '10px 16px', color: 'var(--text-dim)', fontWeight: 500 }}>Bot</th>
              <th style={{ padding: '10px 16px', color: 'var(--text-dim)', fontWeight: 500 }}>Trades</th>
              <th style={{ padding: '10px 16px' }}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 16px' }}>{u.email}</td>
                <td className="mono" style={{ padding: '10px 16px', textTransform: 'uppercase', fontSize: 12 }}>{u.mode}</td>
                <td style={{ padding: '10px 16px', color: u.active ? 'var(--up)' : 'var(--text-dim)' }}>
                  {u.active ? 'Running' : 'Stopped'}
                </td>
                <td className="mono" style={{ padding: '10px 16px' }}>{u.trades}</td>
                <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                  <button style={{
                    border: '1px solid var(--down)', color: 'var(--down)', background: 'transparent',
                    borderRadius: 6, padding: '5px 12px', fontSize: 12
                  }}>
                    Force stop
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 16 }}>
        This table is mock data — wire it to a real <span className="mono">/admin/users</span> endpoint once auth + DB are built.
      </p>
    </div>
  )
}
