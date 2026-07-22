import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import Shell from './components/Shell'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'
import TradeHistory from './pages/TradeHistory'
import './tokens.css'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<TradeHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProvider>
  )
}
