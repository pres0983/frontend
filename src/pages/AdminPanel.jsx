import { useEffect, useState } from 'react'
import { getAdminUsers, adminForceStop } from '../api'
import { useAuth } from '../AuthContext'

export default function AdminPanel() {
  const { token, role } = useAuth()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const load = () => {
    getAdminUsers(token).then(setUsers).catch(err => setError(err.message))
  }

  useEffect(() => { if (role === 'admin') load() }, [token, role])

  if (role !== 'admin') {
    return <p style={{ color: 'var(--text-dim)' }}>Admin access only.</p>
  }

  const handleForceStop = async (userId) => {
    await adminForceStop(token, userId)
    load()
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Admin</h1>
      <p style={{ color: 'var(--text-dim)', marginTop: 0, marginBottom: 24, fontSize: 14 }}>
        Manages the platform and can stop any user's bot. Never touches user funds directly.
      </p>
      {error && <p style={{ color: 'var(--down)' }}>{error}</p>}

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
            {users.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 16px' }}>{u.email}</td>
                <td className="mono" style={{ padding: '10px 16px', textTransform: 'uppercase', fontSize: 12 }}>{u.mode || '—'}</td>
                <td style={{ padding: '10px 16px', color: u.active ? 'var(--up)' : 'var(--text-dim)' }}>
                  {u.active ? 'Running' : 'Stopped'}
                </td>
                <td className="mono" style={{ padding: '10px 16px' }}>{u.trades}</td>
                <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                  <button onClick={() => handleForceStop(u.id)} style={{
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
    </div>
  )
}
