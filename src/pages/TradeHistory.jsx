const MOCK_TRADES = []

export default function TradeHistory() {
  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Trade History</h1>
      <p style={{ color: 'var(--text-dim)', marginTop: 0, marginBottom: 24, fontSize: 14 }}>
        Every trade the bot has opened and closed on your account.
      </p>

      {MOCK_TRADES.length === 0 ? (
        <div style={{
          background: 'var(--bg-panel)', border: '1px dashed var(--border)', borderRadius: 12,
          padding: 40, textAlign: 'center', color: 'var(--text-dim)', fontSize: 14
        }}>
          No trades yet. Once the bot opens a position, it shows up here.
        </div>
      ) : (
        <table className="mono" style={{ width: '100%', fontSize: 13 }}>
          {/* real rows once backend endpoint exists */}
        </table>
      )}
    </div>
  )
}
