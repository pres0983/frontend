const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function getStatus() {
  const res = await fetch(`${API_URL}/status`)
  return res.json()
}

export async function ping() {
  const res = await fetch(`${API_URL}/ping`)
  return res.json()
}

// Stubs — wire these to real backend endpoints once auth + DB are added
export async function saveExchangeSettings({ apiKey, apiSecret, mode }) {
  console.log('TODO: POST to backend', { apiKey: '***', mode })
  return { ok: true }
}

export async function toggleBot(active) {
  console.log('TODO: POST bot toggle to backend', active)
  return { ok: true, active }
}
