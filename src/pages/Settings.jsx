import { useState } from 'react'
import { saveExchangeSettings, toggleBot } from '../api'

export default function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [mode, setMode] = useState('demo')
  const [botActive, setBotActive] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    await saveExchangeSettings({ apiKey, apiSecret, mode })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleToggleBot = async () => {
    const next = !botActive
    await toggleBot(next)
    setBotActive(next)
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-panel-raised)',
    color: 'var(--text)', fontSize: 14, marginTop: 6
  }
  const labelStyle = { fontSize: 13, color: 'var(--text-dim)', fontWeight: 500 }

  return (
    <div style={{ maxWidth: 520 }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Settings</h1>
      <p style={{ color: 'var(--text-dim)', marginTop: 0, marginBottom: 24, fontSize: 14 }}>
        Connect your own Bybit API key. Your funds stay on your Bybit account — this platform never holds your money.
      </p>

      <form onSubmit={handleSave} style={{
        background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12, padding: 22
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle} htmlFor="mode">Mode</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            {['demo', 'live'].map(m => (
              <button
                type="button"
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid var(--border)',
                  background: mode === m ? (m === 'live' ? 'var(--down)' : 'var(--accent)') : 'var(--bg-panel-raised)',
                  color: mode === m ? 'var(--bg)' : 'var(--text)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase'
                }}
              >
                {m}
              </button>
            ))}
          </div>
          {mode === 'live' && (
            <p style={{ color: 'var(--down)', fontSize: 12, marginTop: 8 }}>
              Live mode trades with real funds on your account. Test in demo mode first.
            </p>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle} htmlFor="apiKey">Bybit API Key</label>
          <input id="apiKey" style={inputStyle} value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Paste your API key" />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle} htmlFor="apiSecret">Bybit API Secret</label>
          <input id="apiSecret" type="password" style={inputStyle} value={apiSecret} onChange={e => setApiSecret(e.target.value)} placeholder="Paste your API secret" />
        </div>

        <button type="submit" style={{
          width: '100%', padding: '12px 0', borderRadius: 8, border: 'none',
          background: 'var(--accent)', color: 'var(--bg)', fontWeight: 600, fontSize: 14
        }}>
          Save connection
        </button>
        {saved && <p style={{ color: 'var(--up)', fontSize: 13, marginTop: 10 }}>Saved.</p>}
      </form>

      <div style={{
        marginTop: 16, background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12,
        padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Bot status</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>{botActive ? 'Running' : 'Stopped'}</div>
        </div>
        <button onClick={handleToggleBot} style={{
          padding: '10px 20px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13,
          background: botActive ? 'var(--down)' : 'var(--up)', color: '#0d1117'
        }}>
          {botActive ? 'Stop bot' : 'Start bot'}
        </button>
      </div>
    </div>
  )
}
