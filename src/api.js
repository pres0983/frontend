const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

export async function ping() {
  const res = await fetch(`${API_URL}/ping`)
  return res.json()
}

export async function getMyStatus(token) {
  const res = await fetch(`${API_URL}/settings/status`, { headers: authHeaders(token) })
  if (!res.ok) throw new Error('Failed to fetch status')
  return res.json()
}

export async function saveExchangeSettings(token, { apiKey, apiSecret, mode }) {
  const res = await fetch(`${API_URL}/settings/exchange`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ api_key: apiKey, api_secret: apiSecret, mode }),
  })
  if (!res.ok) throw new Error((await res.json()).detail || 'Failed to save settings')
  return res.json()
}

export async function toggleBot(token, active) {
  const res = await fetch(`${API_URL}/settings/bot-toggle?active=${active}`, {
    method: 'POST',
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error((await res.json()).detail || 'Failed to toggle bot')
  return res.json()
}

export async function getMyTrades(token) {
  const res = await fetch(`${API_URL}/trades`, { headers: authHeaders(token) })
  if (!res.ok) throw new Error('Failed to fetch trades')
  return res.json()
}

export async function getAdminUsers(token) {
  const res = await fetch(`${API_URL}/admin/users`, { headers: authHeaders(token) })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function adminForceStop(token, userId) {
  const res = await fetch(`${API_URL}/admin/users/${userId}/force-stop`, {
    method: 'POST', headers: authHeaders(token),
  })
  return res.json()
}
